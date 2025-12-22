import { createAdminClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';
import type { AnalyticsStats } from '@/types/database';

/**
 * GET /api/users/[uuid]/analytics
 * Fetches analytics statistics for a user
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ uuid: string }> }
) {
  try {
    const { uuid } = await params;
    const supabase = createAdminClient();

    // Get total visitors count
    const { count: totalVisitors, error: visitorsError } = await supabase
      .from('visitors')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', uuid);

    if (visitorsError) {
      return NextResponse.json(
        {
          error: visitorsError.message,
          code: visitorsError.code,
        },
        { status: 500 }
      );
    }

    // Get all visitors for this user
    const { data: visitors, error: visitorsDataError } = await supabase
      .from('visitors')
      .select('id')
      .eq('user_id', uuid);

    if (visitorsDataError) {
      return NextResponse.json(
        {
          error: visitorsDataError.message,
          code: visitorsDataError.code,
        },
        { status: 500 }
      );
    }

    const visitorIds = visitors?.map(v => v.id) || [];

    // Get section view counts
    const { data: sectionViews, error: viewsError } = await supabase
      .from('section_views')
      .select('section_name')
      .in('visitor_id', visitorIds);

    if (viewsError) {
      return NextResponse.json(
        {
          error: viewsError.message,
          code: viewsError.code,
        },
        { status: 500 }
      );
    }

    // Count views per section
    const sectionCounts = {
      hero: 0,
      cv: 0,
      skills: 0,
      mountain: 0,
    };

    sectionViews?.forEach((view) => {
      const section = view.section_name as keyof typeof sectionCounts;
      if (section in sectionCounts) {
        sectionCounts[section]++;
      }
    });

    // Calculate percentages
    const total = totalVisitors || 1; // Avoid division by zero
    const percentages = {
      hero: total > 0 ? Math.round((sectionCounts.hero / total) * 100) : 0,
      cv: total > 0 ? Math.round((sectionCounts.cv / total) * 100) : 0,
      skills: total > 0 ? Math.round((sectionCounts.skills / total) * 100) : 0,
      mountain: total > 0 ? Math.round((sectionCounts.mountain / total) * 100) : 0,
    };

    const stats: AnalyticsStats = {
      total_visitors: totalVisitors || 0,
      sections: sectionCounts,
      percentages,
    };

    return NextResponse.json(stats);
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}


import { createAdminClient } from '@/lib/supabase-server';
import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/analytics/track-section
 * Tracks when a visitor views a section
 * Body: { visitor_id: string, section_name: 'hero' | 'cv' | 'skills' | 'mountain' }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { visitor_id, section_name } = body;

    if (!visitor_id || !section_name) {
      return NextResponse.json(
        { error: 'visitor_id and section_name are required' },
        { status: 400 }
      );
    }

    if (!['hero', 'cv', 'skills', 'mountain'].includes(section_name)) {
      return NextResponse.json(
        { error: 'Invalid section_name. Must be one of: hero, cv, skills, mountain' },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    // Insert section view (unique constraint prevents duplicates)
    const { data, error } = await supabase
      .from('section_views')
      .insert({
        visitor_id,
        section_name,
      })
      .select()
      .single();

    if (error) {
      // If error is due to unique constraint violation, that's okay - section already tracked
      if (error.code === '23505') {
        return NextResponse.json({ 
          success: true, 
          message: 'Section already tracked for this visitor' 
        });
      }

      return NextResponse.json(
        {
          error: error.message,
          code: error.code,
          details: error.details,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      section_view: data 
    });
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


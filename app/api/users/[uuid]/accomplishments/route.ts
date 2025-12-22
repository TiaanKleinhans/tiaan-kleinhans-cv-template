import { createAdminClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';
import type { Accomplishment } from '@/types/database';

/**
 * GET /api/users/[uuid]/accomplishments
 * Fetches all accomplishments for a user, ordered by date
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ uuid: string }> }
) {
  try {
    const { uuid } = await params;
    const supabase = createAdminClient();

    const { data: accomplishments, error } = await supabase
      .from('accomplishments')
      .select('*')
      .eq('user_id', uuid)
      .order('accomplishment_date', { ascending: true });

    if (error) {
      return NextResponse.json(
        {
          error: error.message,
          code: error.code,
          details: error.details,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ accomplishments: accomplishments || [] });
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


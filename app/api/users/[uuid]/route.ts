import { createAdminClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: Promise<{ uuid: string }> }) {
  try {
    const { uuid } = await params;

    // Use admin client to bypass RLS for public API routes
    const supabase = createAdminClient();

    // Query the user table by UUID
    const { data: user, error } = await supabase.from('users').select('*').eq('id', uuid).single();

    if (error) {
      console.error('API Route - Supabase error:', {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
      });
      return NextResponse.json(
        {
          error: error.message,
          code: error.code,
          details: error.details,
        },
        { status: error.code === 'PGRST116' ? 404 : 500 }
      );
    }

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user });
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

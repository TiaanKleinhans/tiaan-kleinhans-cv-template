import { createAdminClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = createAdminClient();

    const { data: translations, error } = await supabase
      .from('available_translations')
      .select('id, code, display_name, sort_order, total_downloads')
      .order('sort_order', { ascending: true });

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
        { status: 500 }
      );
    }

    const formattedTranslations =
      translations?.map((translation) => ({
        id: translation.id,
        code: translation.code,
        name: translation.display_name,
        sortOrder: translation.sort_order,
        totalDownloads: translation.total_downloads || 0,
      })) || [];

    return NextResponse.json({ translations: formattedTranslations });
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

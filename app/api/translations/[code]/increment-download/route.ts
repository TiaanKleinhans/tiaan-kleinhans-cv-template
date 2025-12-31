import { createAdminClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await params;

    if (!code) {
      return NextResponse.json({ error: 'Language code is required' }, { status: 400 });
    }

    const supabase = createAdminClient();

    // Get current value first
    const { data: currentData, error: fetchError } = await supabase
      .from('available_translations')
      .select('total_downloads')
      .eq('code', code)
      .single();

    if (fetchError) {
      console.error('Error fetching current downloads:', fetchError);
      return NextResponse.json(
        { error: fetchError.message },
        { status: 500 }
      );
    }

    const currentDownloads = currentData?.total_downloads || 0;

    // Increment the value
    const { error: updateError } = await supabase
      .from('available_translations')
      .update({ total_downloads: currentDownloads + 1 })
      .eq('code', code);

    if (updateError) {
      console.error('Error updating downloads:', updateError);
      return NextResponse.json(
        { error: updateError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, downloads: currentDownloads + 1 });
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


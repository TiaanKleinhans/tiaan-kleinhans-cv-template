import { createAdminClient } from '@/lib/supabase-server';
import { NextRequest, NextResponse } from 'next/server';
import { CurrentUser } from '@/constants/current-user';

/**
 * POST /api/analytics/track-visitor
 * Creates a new visitor record for tracking
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = createAdminClient();
    
    // Generate unique session ID
    const sessionId = crypto.randomUUID();
    
    // Get IP address and user agent from request headers
    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     null;
    const userAgent = request.headers.get('user-agent') || null;

    // Create visitor record
    const { data: visitor, error } = await supabase
      .from('visitors')
      .insert({
        user_id: CurrentUser,
        session_id: sessionId,
        ip_address: ipAddress,
        user_agent: userAgent,
      })
      .select()
      .single();

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

    return NextResponse.json({ 
      visitor_id: visitor.id,
      session_id: sessionId 
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


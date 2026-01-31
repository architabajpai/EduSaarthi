import { NextRequest, NextResponse } from 'next/server';
import { loginUser } from '../../../../lib/auth';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    
    console.log('📧 Login attempt:', email);
    
    const result = await loginUser(email, password);
    
    if (!result) {
      return NextResponse.json({ 
        success: false, 
        error: 'Invalid email or password' 
      }, { status: 401 });
    }

    // ✅ FIX: Await cookies() + use NextResponse.cookies
    const response = NextResponse.json({ 
      success: true, 
      user: result 
    });

    // ✅ CORRECT Next.js 15 syntax:
    const cookieStore = await cookies();
    cookieStore.set('token', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });

    return response;
  } catch (error) {
    console.error('API Login error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Login failed' 
    }, { status: 500 });
  }
}


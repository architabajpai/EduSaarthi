import { NextRequest, NextResponse } from 'next/server';
import { getUserFromToken } from '../../../../lib/auth';
import { getCollection } from '../../../../lib/mongodb';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    const user = token ? await getUserFromToken(token) : null;
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }


    // ✅ Count user's chats
    const collections = await getCollection();
    const chatCount = await collections.data.countDocuments({ userId: user.id });
    const userData= await collections.login.findOne({id: user.id});
    
    let joinedFormatted = 'January 2026';
    
    if (userData.createdAt) {
      const createdDate = new Date(userData.createdAt);
      
      // ✅ Use UTC to avoid local timezone shift
      const year = createdDate.getUTCFullYear();
      const month = createdDate.getUTCMonth();
      const day = createdDate.getUTCDate();
      
      const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      
      joinedFormatted = `${day} ${months[month]} ${year}`;
    }

    console.log(joinedFormatted);

    const subjectsString = Array.isArray(userData.subjects) 
      ? userData.subjects.filter(Boolean).join(', ') 
      : userData.subjects || 'Primary Education';

    return NextResponse.json({
      success: true,
      user: {
        name: userData.name || userData.email.split('@')[0],
        email: userData.email,
        role: userData.role || 'teacher',
        school: userData.organization || 'Government Primary School',
        grade: userData.grade || '1-5',
        subjects: subjectsString,
        createdAt: userData.createdAt,
        joined: joinedFormatted,
        totalChats: chatCount,
      }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}


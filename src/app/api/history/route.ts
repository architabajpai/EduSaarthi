import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getUserFromToken } from '../../../lib/auth';
import { getCollection } from '../../../lib/mongodb';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    const user = token ? await getUserFromToken(token) : null;
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const collections = await getCollection();
    const conversations = await collections.data
      .find({ userId: user.id })
      .sort({ timestamp: -1 })
      .limit(50)
      .toArray();

    return NextResponse.json(conversations);
  } catch (error) {
    console.error('History API error:', error);
    return NextResponse.json([]);
  }
}


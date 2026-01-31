// src/app/api/chat/route.ts - CORRECT OpenAI format
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { getCollection } from '../../../lib/mongodb';
import { getUserFromToken } from '../../../lib/auth';
import { cookies } from 'next/headers';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  const { question, language = 'en' } = await request.json();
  console.log(question);
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    const user = token ? await getUserFromToken(token) : null;
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    
    console.log(`📝 ${user.email} (${language}):`, question);

    const collections = await getCollection();
    const statsCollection = collections.data;

    // ✅ FIXED: Get chat history as STRINGS only
    const history = await statsCollection
      .find({ userId: user.id })
      .sort({ timestamp: -1 })
      .limit(3)
      .toArray();

    // ✅ CORRECT OpenAI messages format - ALL content as STRING
    const messages = [
      {
        role: "system",
        content: language === 'hi' 
          ? "आप एक सहायक शिक्षक हैं। सरल हिंदी में उत्तर दें। छोटे वाक्य इस्तेमाल करें।"
          : "You are a helpful teacher assistant. Answer in simple English. Use short sentences."
      },
      {
        role: "user",
        content: question // ✅ STRING - current question
      }
    ];

    // ✅ Add history as previous conversations (optional)
    if (history.length > 0) {
      messages.unshift({
        role: "system",
        content: `Previous questions by this teacher: ${history.map(h => h.question).join('; ')}`
      });
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages, // ✅ Proper array of {role, content: string}
      max_tokens: 500,
      temperature: 0.7
    });

    const answer = completion.choices[0]?.message?.content || 'Sorry, no response received.';

    // Save chat
    await statsCollection.insertOne({
      userId: user.id,
      question,
      answer,
      language,
      timestamp: new Date()
    });

    return NextResponse.json({ 
      answer, 
      language 
    });

  } catch (error: any) {
    console.error('Chat API error:', error.message);
    
    const fallback = language === 'hi'
      ? '• ग्रुप लीडर बनाएं\n• 5 मिनट टाइमर लगाएं\n• हर बच्चे को role दें'
      : '• Appoint group leaders\n• Use 5-min timer\n• Give every child a role';

    return NextResponse.json({ 
      error: 'Chat failed', 
      fallback 
    }, { status: 500 });
  }
}


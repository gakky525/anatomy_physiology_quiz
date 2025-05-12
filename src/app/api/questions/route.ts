import { NextResponse } from 'next/server';
import { getRandomQuestion } from '@/lib/quiz/getRandomQuestion';

export async function POST(req: Request) {
  try {
    const { category, field, excludeIds } = await req.json();

    if (!category || typeof category !== 'string') {
      return NextResponse.json({ error: 'Invalid category' }, { status: 400 });
    }

    if (field && typeof field !== 'string') {
      return NextResponse.json({ error: 'Invalid field' }, { status: 400 });
    }

    const exclude: number[] = Array.isArray(excludeIds)
      ? excludeIds.filter((id) => typeof id === 'number')
      : [];

    const question = await getRandomQuestion(category, field || 'all', exclude);

    if (!question) {
      return NextResponse.json(null, { status: 200 });
    }

    return NextResponse.json(question);
  } catch (err) {
    console.error('Error in POST /api/questions:', err);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

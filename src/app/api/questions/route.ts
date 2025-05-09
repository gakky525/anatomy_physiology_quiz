import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Category } from '@prisma/client';
import { z } from 'zod';

const QuestionRequestSchema = z.object({
  category: z.nativeEnum(Category),
  field: z.string(),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();

    let decodedField = '';
    try {
      decodedField = decodeURIComponent(json.field || '');
    } catch {
      return NextResponse.json(
        { error: 'Invalid field encoding' },
        { status: 400 }
      );
    }

    const result = QuestionRequestSchema.safeParse({
      category: json.category,
      field: decodedField,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    const { category, field } = result.data;

    const whereCondition = {
      category,
      ...(field !== 'all' && field !== '' ? { field } : {}),
    };

    const total = await prisma.question.count({ where: whereCondition });

    if (total === 0) {
      return NextResponse.json(null);
    }

    const randomSkip = Math.floor(Math.random() * total);

    const [randomQuestion] = await prisma.question.findMany({
      where: whereCondition,
      include: { choices: true },
      orderBy: { id: 'asc' },
      take: 1,
      skip: randomSkip,
    });

    return NextResponse.json(randomQuestion ?? null);
  } catch (err) {
    console.error('Server error in /api/questions:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

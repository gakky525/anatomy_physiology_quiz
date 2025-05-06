import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Category } from '@prisma/client';
import { z } from 'zod';

const QuestionRequestSchema = z.object({
  category: z.nativeEnum(Category),
  field: z.string(),
});

export async function POST(req: Request) {
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

  const ids = await prisma.question.findMany({
    where: whereCondition,
    select: { id: true },
  });

  if (ids.length === 0) {
    console.warn('❗️ No matching questions found');
    return NextResponse.json(null);
  }

  const randomId = ids[Math.floor(Math.random() * ids.length)]?.id;

  if (!randomId) {
    return NextResponse.json(
      { error: 'Failed to select a random question' },
      { status: 500 }
    );
  }

  const randomQuestion = await prisma.question.findUnique({
    where: { id: randomId },
    include: { choices: true },
  });

  return NextResponse.json(randomQuestion ?? null);
}

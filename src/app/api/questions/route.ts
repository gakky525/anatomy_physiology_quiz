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

  const [randomQuestion] = await prisma.question.findMany({
    where: whereCondition,
    include: { choices: true },
    orderBy: { id: 'asc' },
    take: 1,
    skip: Math.floor(
      Math.random() * (await prisma.question.count({ where: whereCondition }))
    ),
  });

  return NextResponse.json(randomQuestion ?? null);
}

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Category } from '@prisma/client';

export async function POST(req: Request) {
  const { category, field } = await req.json();

  const decodedField = decodeURIComponent(field);

  if (
    !category ||
    typeof category !== 'string' ||
    !field ||
    typeof field !== 'string'
  ) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }

  const upperCategory = category.toUpperCase();

  if (!Object.values(Category).includes(upperCategory as Category)) {
    return NextResponse.json({ error: 'Invalid category' }, { status: 400 });
  }

  const categoryEnum = upperCategory as Category;

  const whereCondition = {
    category: categoryEnum,
    ...(decodedField !== 'all' && decodedField !== ''
      ? { field: decodedField }
      : {}),
  };

  const total = await prisma.question.count({ where: whereCondition });

  if (total === 0) {
    console.log('❗️ No matching questions found');
    return NextResponse.json(null);
  }

  const randomQuestion = await prisma.question.findMany({
    where: whereCondition,
    include: { choices: true },
    skip: Math.floor(Math.random() * total),
    take: 1,
  });

  return NextResponse.json(randomQuestion[0]);
}

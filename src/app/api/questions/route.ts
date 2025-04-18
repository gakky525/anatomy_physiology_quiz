// src/app/api/questions/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Category } from '@prisma/client';

export async function POST(req: Request) {
  const { category, field } = await req.json();

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
    ...(field !== 'all' ? { field } : {}),
  };

  // 該当するIDだけ取得
  const ids = await prisma.question.findMany({
    where: whereCondition,
    select: { id: true },
  });

  if (ids.length === 0) {
    return NextResponse.json(null);
  }

  const randomId = ids[Math.floor(Math.random() * ids.length)]?.id;

  const randomQuestion = await prisma.question.findUnique({
    where: { id: randomId },
    include: { choices: true },
  });

  return NextResponse.json(randomQuestion);
}

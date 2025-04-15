import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Category } from '@prisma/client';

export async function POST(req: Request) {
  const { category, field } = await req.json();
  // バリデーション
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

  // 件数確認
  const count = await prisma.question.count({
    where: {
      category: categoryEnum,
      ...(field !== 'all' ? { field } : {}),
    },
  });

  if (count === 0) {
    return NextResponse.json(null);
  }

  const skip = Math.floor(Math.random() * count);

  const [randomQuestion] = await prisma.question.findMany({
    where: {
      category: categoryEnum,
      ...(field !== 'all' ? { field } : {}),
    },
    skip,
    take: 1,
    include: {
      choices: true,
    },
  });

  return NextResponse.json(randomQuestion);
}

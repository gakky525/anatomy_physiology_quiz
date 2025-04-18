// src/lib/quiz/getRandomQuestion.ts
import { prisma } from '@/lib/prisma';
import { Category } from '@prisma/client';

export async function getRandomQuestion(category: string, field: string) {
  const upperCategory = category.toUpperCase();

  if (!Object.values(Category).includes(upperCategory as Category)) {
    throw new Error(`Invalid category: ${category}`);
  }

  const validCategory = upperCategory as Category;

  const whereCondition = {
    category: validCategory,
    ...(field !== 'all' ? { field: decodeURIComponent(field) } : {}),
  };

  const ids = await prisma.question.findMany({
    where: whereCondition,
    select: { id: true },
  });

  if (ids.length === 0) return null;

  const randomId = ids[Math.floor(Math.random() * ids.length)]?.id;

  const question = await prisma.question.findUnique({
    where: { id: randomId },
    include: { choices: true },
  });

  return question;
}

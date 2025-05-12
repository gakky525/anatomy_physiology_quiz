import { prisma } from '@/lib/prisma';
import { Category } from '@prisma/client';

export async function getRandomQuestion(
  category: string,
  field: string,
  excludeIds: number[] = []
) {
  const upperCategory = category.toUpperCase();

  if (!Object.values(Category).includes(upperCategory as Category)) {
    throw new Error(`Invalid category: ${category}`);
  }

  const whereCondition = {
    category: upperCategory as Category,
    ...(field !== 'all' ? { field: decodeURIComponent(field) } : {}),
    ...(excludeIds.length > 0 ? { id: { notIn: excludeIds } } : {}),
  };

  const ids = await prisma.question.findMany({
    where: whereCondition,
    select: { id: true },
  });

  if (ids.length === 0) return null;

  const randomId = ids[Math.floor(Math.random() * ids.length)].id;

  const question = await prisma.question.findUnique({
    where: { id: randomId },
    include: { choices: true },
  });

  return question;
}

import { prisma } from '@/lib/prisma';
import { Category } from '@prisma/client';

export async function getRandomQuestion(category: string, field: string) {
  const upperCategory = category.toUpperCase();

  if (!Object.values(Category).includes(upperCategory as Category)) {
    throw new Error(`Invalid category: ${category}`);
  }

  const whereCondition = {
    category: upperCategory as Category,
    ...(field !== 'all' ? { field: decodeURIComponent(field) } : {}),
  };

  const total = await prisma.question.count({ where: whereCondition });

  if (total === 0) return null;

  const randomSkip = Math.floor(Math.random() * total);

  const [question] = await prisma.question.findMany({
    where: whereCondition,
    include: { choices: true },
    skip: randomSkip,
    take: 1,
  });

  return question ?? null;
}

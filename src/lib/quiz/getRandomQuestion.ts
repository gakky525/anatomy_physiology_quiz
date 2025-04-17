import { prisma } from '@/lib/prisma';
import { Category, Prisma } from '@prisma/client';

export async function getRandomQuestion(category: string, field: string) {
  const upperCategory = category.toUpperCase();

  if (!Object.values(Category).includes(upperCategory as Category)) {
    throw new Error(`Invalid category: ${category}`);
  }

  const validCategory = upperCategory as Category;

  const whereCondition: Prisma.QuestionWhereInput = {
    category: validCategory,
    ...(field !== 'all' ? { field: decodeURIComponent(field) } : {}),
  };

  const count = await prisma.question.count({ where: whereCondition });
  if (count === 0) return null;

  const skip = Math.floor(Math.random() * count);

  const question = await prisma.question.findFirst({
    where: whereCondition,
    skip,
    include: { choices: true },
  });
  return question;
}

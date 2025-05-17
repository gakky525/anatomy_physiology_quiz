import { prisma } from '@/lib/prisma';
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const questions = await prisma.question.findMany({
    select: {
      category: true,
      field: true,
    },
    distinct: ['category', 'field'],
  });

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: 'https://anatomyphysiologyquiz.vercel.app/',
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://anatomyphysiologyquiz.vercel.app/subjects/anatomy',
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: 'https://anatomyphysiologyquiz.vercel.app/subjects/physiology',
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: 'https://anatomyphysiologyquiz.vercel.app/questions/anatomy/all',
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://anatomyphysiologyquiz.vercel.app/questions/physiology/all',
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://anatomyphysiologyquiz.vercel.app/review',
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];

  const questionPages: MetadataRoute.Sitemap = questions.map((q) => ({
    url: `https://anatomyphysiologyquiz.vercel.app/questions/${encodeURIComponent(
      q.category.toLowerCase()
    )}/${encodeURIComponent(q.field)}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticPages, ...questionPages];
}

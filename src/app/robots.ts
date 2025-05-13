import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api',
    },
    sitemap: 'https://anatomyphysiologyquiz.vercel.app/sitemap.xml',
    host: 'https://anatomyphysiologyquiz.vercel.app',
  };
}

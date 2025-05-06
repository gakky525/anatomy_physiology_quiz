import type { Metadata } from 'next';
import ReviewPage from './ReviewClient';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '復習 | 解剖学・生理学 国試対策',
  description: '不正解だった問題を復習して、弱点を重点的に克服しましょう。',
  openGraph: {
    title: '復習 | 解剖学・生理学 国試対策',
    description: '不正解だった問題を復習して、弱点を重点的に克服しましょう。',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/review`,
    siteName: '解剖学・生理学 スキマ時間にできる国試対策',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/opengraph-image.png`,
        width: 1200,
        height: 630,
      },
    ],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '復習 | 解剖学・生理学 国試対策',
    description:
      '不正解だった問題をまとめて復習できるページです。国家試験対策に活用しましょう。',
    images: [`${process.env.NEXT_PUBLIC_SITE_URL}/opengraph-image.png`],
  },
};

export default function Page() {
  return <ReviewPage />;
}

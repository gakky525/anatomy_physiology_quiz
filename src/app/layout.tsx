import type { Metadata } from 'next';
import '../assets/globals.css';
import LayoutWrapper from './LayoutWrapper';

export const metadata: Metadata = {
  title: '解剖学・生理学 スキマ時間にできる国試対策',
  description:
    '通学や講義の間などのスキマ時間にできる、無料の解剖学・生理学 国家試験対策アプリです。スキマ時間を活用して苦手な分野を克服しましょう。',
  keywords: ['解剖学', '生理学', '国家試験対策', '隙間時間', '医療'],
  openGraph: {
    title: '解剖学・生理学 スキマ時間にできる国試対策',
    description:
      '国家試験対策のための解剖学・生理学の演習ができる無料Webアプリです。',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
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
    title: '解剖/生理学 隙間時間にできる国試対策',
    description:
      '国家試験対策のための解剖学・生理学の演習ができる無料Webアプリです。',
    images: [`${process.env.NEXT_PUBLIC_SITE_URL}/opengraph-image.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ja'>
      <body>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}

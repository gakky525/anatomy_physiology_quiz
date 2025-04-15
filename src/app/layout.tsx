import type { Metadata } from 'next';
import '../assets/globals.css';
import LayoutWrapper from './LayoutWrapper';

export const metadata: Metadata = {
  title: '解剖学・生理学 スキマ時間にできる国試対策アプリ',
  description: 'スキマ時間を活用して苦手な解剖学・生理学を克服しよう',
  openGraph: {
    title: '解剖学・生理学 スキマ時間にできる国試対策アプリ',
    description:
      'スキマ時間にできる国家試験対策。全分野ランダム出題や苦手克服に最適。',
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

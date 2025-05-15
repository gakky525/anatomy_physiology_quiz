import type { Metadata } from 'next';
import '../assets/globals.css';
import LayoutWrapper from './LayoutWrapper';

export const metadata: Metadata = {
  title: '【医療学生向け無料アプリ】解剖学・生理学 - スキマ時間で国試対策',
  description:
    'スマホで今すぐ始められる国家試験対策！通学中や休憩時間にサクッと解ける、医学生・看護学生のための解剖学・生理学の完全無料アプリです。スキマ時間を有効活用して苦手な解剖学・生理学を克服しましょう！',
  keywords: [
    '解剖学',
    '生理学',
    '無料アプリ',
    '学習アプリ',
    '隙間時間',
    '勉強',
    '国家試験対策',
    '国試',
    '医療系',
    '医学生',
    '看護師',
    'NS',
    '理学療法士',
    'PT',
    '作業療法士',
    'OT',
  ],
  openGraph: {
    title: '【医療学生向け無料アプリ】解剖学・生理学 - スキマ時間で国試対策',
    description:
      'スマホ1つで効率学習！無料で使える国家試験対策アプリです。スキマ時間を有効活用して、苦手な分野を克服しましょう。',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
    siteName: '解剖学・生理学 - スキマ時間にできる国試対策',
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
    title: '【医療学生向け無料アプリ】解剖学・生理学 - スキマ時間で国試対策',
    description:
      '通学中やちょっとした空き時間に最適! 全問解説付きの無料Webアプリで、苦手な解剖学・生理学を克服しましょう。',
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

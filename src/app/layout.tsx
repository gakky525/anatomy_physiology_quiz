import type { Metadata } from 'next';
import '../assets/globals.css';
import LayoutWrapper from './LayoutWrapper';

export const metadata: Metadata = {
  title: '【医療学生向け無料アプリ】解剖学・生理学 - スキマ時間で国試対策',
  description:
    '通学中や休憩時間にサクッと解ける、医療学生のための解剖学・生理学の完全無料アプリです。様々な分野の問題に挑戦でき、国試対策に最適です。スキマ時間を有効活用して苦手な解剖学・生理学を克服しましょう！',
  keywords: [
    '解剖学',
    '生理学',
    '問題',
    '過去問',
    '国試',
    '国家試験対策',
    '隙間時間',
    '無料アプリ',
    '学習アプリ',
    '勉強',
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
      '通学中や休憩時間にサクッと解ける、医療学生のための解剖学・生理学の完全無料アプリです。様々な分野の問題に挑戦でき、国試対策に最適です。スキマ時間を有効活用して苦手な解剖学・生理学を克服しましょう！',
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
      '通学中や休憩時間にサクッと解ける、医療学生のための解剖学・生理学の完全無料アプリです。様々な分野の問題に挑戦でき、国試対策に最適です。スキマ時間を有効活用して苦手な解剖学・生理学を克服しましょう！',
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

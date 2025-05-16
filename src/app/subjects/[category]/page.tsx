import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: Promise<{ category: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { category } = await params;
  const categoryLabel = category === 'anatomy' ? '解剖学' : '生理学';
  const pageUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/subjects/${category}`;
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `【${categoryLabel}】 - スキマ時間で国試対策`,
    description: `無料で使える${categoryLabel}の国家試験対策アプリです。分野別に演習できて全問に解説付き！通学中やちょっとした空き時間に最適です。スキマ時間を活用して苦手な分野を克服しましょう！`,
    openGraph: {
      title: `【${categoryLabel}】 - スキマ時間で国試対策`,
      description: `医療学生向け！国家試験対策に役立つ無料Webアプリです。${categoryLabel}の重要分野をピンポイントで演習できます。`,
      url: pageUrl,
      siteName: '解剖学・生理学 - スキマ時間にできる国試対策',
      images: [
        `${process.env.NEXT_PUBLIC_SITE_URL}/opengraph-image.png`,
        ...previousImages,
      ],
      locale: 'ja_JP',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `【${categoryLabel}】 - スキマ時間で国試対策`,
      description: `医療学生向け！国家試験対策に役立つ無料Webアプリです。${categoryLabel}の重要分野をピンポイントで演習できます。`,
      images: [`${process.env.NEXT_PUBLIC_SITE_URL}/opengraph-image.png`],
    },
  };
}

export function generateStaticParams() {
  return [{ category: 'anatomy' }, { category: 'physiology' }];
}

export const dynamic = 'error';

const subjects = {
  anatomy: [
    '骨',
    '筋',
    '神経',
    '循環器',
    '呼吸器',
    '消化器',
    '泌尿器',
    // 'new',
  ],
  physiology: [
    '感覚',
    '内分泌',
    '血液・免疫',
    '消化と吸収',
    '排泄',
    '生殖',
    '代謝',
    '呼吸',
    // '神経',
    // '筋',
    // 'new',
  ],
};

export default async function SubjectPage({ params }: Props) {
  const { category } = await params;
  const fields = subjects[category as keyof typeof subjects];

  if (!fields) return notFound();

  return (
    <main className='p-6 flex flex-col items-center min-h-screen'>
      <h1
        className={`text-4xl font-bold ${
          category === 'anatomy' ? 'text-red-600' : 'text-green-600'
        }`}
      >
        {category === 'anatomy' ? '解剖学' : '生理学'}
      </h1>
      <p className='m-4 text-xl text-gray-700'>
        学習する分野を選択してください
      </p>

      <div className='w-full max-w-md'>
        <Link
          href={`/questions/${category}/all`}
          className='block bg-purple-500 hover:bg-purple-600 border border-purple-500 text-white text-xl font-semibold rounded-xl px-6 py-4 mb-8 text-center shadow transition-transform hover:scale-105'
        >
          全分野から出題
        </Link>

        <div className='grid grid-cols-2 sm:grid-cols-3  gap-6'>
          {fields.map((field) => (
            <Link
              key={field}
              href={`/questions/${category}/${field}`}
              className='bg-gray-50 hover:bg-gray-300 border border-gray-500 text-xl rounded-xl px-4 py-4 m-1 text-center shadow transition-transform hover:scale-105'
            >
              {field}
            </Link>
          ))}
        </div>
      </div>

      <Link
        href='/'
        className='m-8 bg-gray-300 hover:bg-gray-400 border border-gray-500 px-5 py-3 rounded-xl shadow transition-transform hover:scale-105'
      >
        トップに戻る
      </Link>
    </main>
  );
}

import { notFound } from 'next/navigation';
import Link from 'next/link';

const subjects = {
  anatomy: [
    '骨',
    '筋',
    '神経',
    '循環器',
    '呼吸器',
    '消化器',
    '泌尿器',
    '生殖器',
    // 'new',
  ],
  physiology: [
    '血液・免疫',
    '消化と吸収',
    '内分泌',
    '神経',
    '筋',
    '呼吸',
    '排泄',
    '代謝',
    '生殖',
    '感覚',
    // 'new',
  ],
};

type Params = {
  params: Promise<{ category: string }>;
};

export async function generateMetadata({ params }: Params) {
  const { category } = await params;
  const categoryLabel = category === 'anatomy' ? '解剖学' : '生理学';
  return {
    title: `${categoryLabel} | 国試対策アプリ`,
    description: `${categoryLabel}のページです。スキマ時間を活用して苦手な分野を克服しましょう。`,
  };
}

export default async function SubjectPage({ params }: Params) {
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
      <p className='m-4 text-xl'>分野を選択してください</p>

      <div className='w-full max-w-md'>
        <Link
          href={`/questions/${category}/all`}
          className='block bg-purple-500 hover:bg-purple-600 text-white text-xl font-semibold rounded-lg px-4 py-4 mb-6 text-center shadow'
        >
          全分野から出題
        </Link>

        {/* 各分野のリンク */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6'>
          {fields.map((field) => (
            <Link
              key={field}
              href={`/questions/${category}/${field}`}
              className='bg-gray-50 hover:bg-gray-300 text-xl rounded-lg px-4 py-4 m-1 text-center shadow  w-full'
            >
              {field}
            </Link>
          ))}
        </div>
      </div>

      <Link
        href='/'
        className='m-6 bg-gray-300 hover:bg-gray-400 px-4 py-3 rounded-lg shadow transition'
      >
        トップに戻る
      </Link>
    </main>
  );
}

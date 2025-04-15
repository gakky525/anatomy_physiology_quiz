import Link from 'next/link';

export default function Home() {
  return (
    <main className='flex flex-col items-center justify-center min-h-screen gap-6 p-8'>
      <h1 className='text-4xl font-bold flex gap-12'>
        <span className='text-red-500'>解剖学</span>
        <span className='text-green-600'>生理学</span>
      </h1>
      <h2 className='mt-2 text-3xl font-bold'>スキマ時間にできる国試対策</h2>
      <div className='flex flex-col items-center gap-4'>
        <p className='m-4 text-xl'>学習したい項目を選択してください</p>
        <div className='flex flex-col sm:flex-row gap-6 sm:gap-12'>
          <Link
            href='/subjects/anatomy'
            className='bg-red-200 hover:bg-red-300 text-2xl px-14 py-12 rounded-2xl shadow-md font-semibold'
          >
            解剖学
          </Link>
          <Link
            href='/subjects/physiology'
            className='bg-green-200 hover:bg-green-300 text-2xl px-14 py-12 rounded-2xl shadow-md font-semibold'
          >
            生理学
          </Link>
        </div>
        <Link
          href='/review'
          className='bg-amber-200 hover:bg-amber-300 text-lg mt-10 px-6 py-4 rounded-xl shadow-md'
        >
          復習する
        </Link>
      </div>
    </main>
  );
}

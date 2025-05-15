import Link from 'next/link';

export default function Home() {
  return (
    <main className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-white px-4 py-12 sm:py-16'>
      <div className='max-w-3xl w-full text-center space-y-10'>
        <div>
          <h1 className='text-5xl sm:text-6xl font-extrabold tracking-tight leading-tight'>
            <span className='text-red-500 drop-shadow-md'>解剖学</span>・
            <span className='text-green-600 drop-shadow-md'>生理学</span>
          </h1>
          <h2 className='mt-3 text-xl sm:text-2xl text-gray-600 font-semibold tracking-wide'>
            スキマ時間でできる国家試験対策
          </h2>
        </div>

        <div className='space-y-2 text-gray-700 text-base sm:text-lg leading-relaxed'>
          <p>
            医療学生のための解剖学・生理学の無料アプリです。
            <br className='hidden sm:inline' />
            通学中・休憩中のスキマ時間を活用して、
            <br className='hidden sm:inline' />
            苦手な分野を克服しましょう。
          </p>
        </div>

        <p className='text-xl sm:text-2xl font-semibold text-gray-700'>
          学習したいカテゴリを選んでください
        </p>

        <div className='flex flex-col sm:flex-row items-center justify-center gap-6'>
          {[
            {
              href: '/subjects/anatomy',
              label: '解剖学',
              color: 'bg-red-100 hover:bg-red-200 text-red-800',
            },
            {
              href: '/subjects/physiology',
              label: '生理学',
              color: 'bg-green-100 hover:bg-green-200 text-green-800',
            },
          ].map(({ href, label, color }) => (
            <Link
              key={label}
              href={href}
              className={`w-full max-w-xs sm:w-64 ${color} text-xl font-semibold px-8 py-7 rounded-3xl shadow-lg transition-transform hover:scale-105`}
            >
              {label}
            </Link>
          ))}
        </div>

        <Link
          href='/review'
          className='inline-block mt-4 sm:mt-6 bg-yellow-200 hover:bg-yellow-300 text-yellow-900 text-base font-semibold px-6 py-5 rounded-2xl shadow-md transition-transform hover:scale-105'
        >
          復習する
        </Link>
      </div>
    </main>
  );
}

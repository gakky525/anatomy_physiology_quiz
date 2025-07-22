import Link from 'next/link';

const subjectLinks = [
  {
    href: '/subjects/anatomy',
    label: '解剖学',
    color: 'bg-red-100 hover:bg-red-200 text-red-800 border border-red-500',
  },
  {
    href: '/subjects/physiology',
    label: '生理学',
    color:
      'bg-green-100 hover:bg-green-200 text-green-800 border border-green-500',
  },
];

export default function Home() {
  return (
    <main className='m-2 flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-white px-4 py-12 sm:py-16'>
      <div className='max-w-3xl w-full text-center space-y-7'>
        <div>
          <h1 className='text-5xl sm:text-6xl font-bold tracking-tight leading-tight'>
            <span className='text-red-500 drop-shadow-md'>解剖学</span>・
            <span className='text-green-600 drop-shadow-md'>生理学</span>
          </h1>
          <h2 className='mt-3 text-2xl sm:text-3xl text-gray-700 font-semibold tracking-wide'>
            スキマ時間にできる国試対策
          </h2>
        </div>

        <div className='space-y-2 text-gray-700 text-base sm:text-lg leading-relaxed'>
          <p>
            解剖学・生理学の問題が無料で解ける、医療学生のための国家試験対策アプリです。
            <br className='hidden sm:inline' />
            通学中や休憩時間のスキマ時間を活用して、苦手な分野を克服しましょう！
          </p>
        </div>

        <p className='text-xl sm:text-2xl font-semibold text-gray-700'>
          学習したい項目を選んでください
        </p>

        <div className='flex flex-col sm:flex-row items-center justify-center gap-6'>
          {subjectLinks.map(({ href, label, color }) => (
            <Link
              key={label}
              href={href}
              className={`w-full max-w-xs sm:w-64 ${color} text-2xl font-semibold px-8 py-7 rounded-3xl shadow-lg transition-transform hover:scale-105`}
            >
              {label}
            </Link>
          ))}
        </div>

        <p className='text-base sm:text-lg text-gray-700'>
          間違えた問題は随時復習ページに追加されます。
          <br className='hidden sm:inline' />
          就寝前などの時間に復習して知識をしっかり定着させましょう！
        </p>

        <Link
          href='/review'
          className='inline-block bg-yellow-200 hover:bg-yellow-300 text-yellow-900 border border-yellow-500 text-xl font-semibold px-10 py-5 rounded-2xl shadow-md transition-transform hover:scale-105'
        >
          復習する
        </Link>
      </div>
    </main>
  );
}

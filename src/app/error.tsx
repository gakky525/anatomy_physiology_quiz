'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error('エラー内容:', error);
  }, [error]);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen space-y-4 px-4 text-center'>
      <h1 className='text-3xl font-bold text-red-500'>エラーが発生しました</h1>
      <p className='text-lg'>
        申し訳ありません。読み込み中に予期しないエラーが発生しました。
      </p>
      <div className='flex gap-8 mt-4'>
        <button
          onClick={() => reset()}
          className='bg-blue-500 hover:bg-blue-600 border border-blue-500 text-white px-6 py-4 rounded-xl shadow transition-transform hover:scale-105 cursor-pointer'
        >
          もう一度試す
        </button>
        <Link
          href='/'
          className='bg-gray-300 hover:bg-gray-400 border border-gray-500 px-6 py-4 rounded-xl shadow transition-transform hover:scale-105 cursor-pointer'
        >
          トップへ戻る
        </Link>
      </div>
    </div>
  );
}

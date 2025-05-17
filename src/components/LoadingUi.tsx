import React from 'react';

export default function LoadingUi() {
  return (
    <div className='absolute inset-0 z-10 flex flex-col items-center justify-center'>
      <div className='animate-spin rounded-full h-10 w-10 border-4 border-blue-400 border-t-transparent mb-4' />
      <span className='text-xl text-gray-700'>
        次の問題を読み込んでいます...
      </span>
    </div>
  );
}

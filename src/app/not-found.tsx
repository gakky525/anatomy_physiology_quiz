import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen space-y-4 px-4 text-center'>
      <h1 className='text-3xl font-bold text-red-500'>
        ページが見つかりません
      </h1>
      <p className='text-lg'>
        お探しのページは存在しないか、URLが間違っている可能性があります。
      </p>
      <Link
        href='/'
        className='mt-4 bg-gray-300 hover:bg-gray-400 px-6 py-3 rounded-full shadow transition'
      >
        トップへ戻る
      </Link>
    </div>
  );
}

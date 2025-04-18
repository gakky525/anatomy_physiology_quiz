export default function Loading() {
  return (
    <div className='flex flex-col items-center justify-center h-96 text-xl text-gray-600'>
      <div className='animate-spin rounded-full h-10 w-10 border-4 border-blue-400 border-t-transparent mb-4' />
      <span>読み込み中...</span>
    </div>
  );
}

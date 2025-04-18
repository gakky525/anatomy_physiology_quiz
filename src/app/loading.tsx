import { ClipLoader } from 'react-spinners';

export default function Loading() {
  return (
    <div className='flex flex-col items-center justify-center h-96 text-xl text-gray-600'>
      <ClipLoader color='#36d7b7' size={40} className='mb-4' />
      <span>読み込み中...</span>
    </div>
  );
}

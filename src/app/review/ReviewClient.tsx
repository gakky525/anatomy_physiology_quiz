'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type Choice = {
  id: number;
  text: string;
  isCorrect: boolean;
};

type Question = {
  id: number;
  question: string;
  explanation: string;
  choices: Choice[];
};

export default function ReviewPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [open, setOpen] = useState(false);
  const [openAllDelete, setOpenAllDelete] = useState(false); // 全て削除のモーダル
  const [targetId, setTargetId] = useState<number | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('incorrectQuestions');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setQuestions([...parsed].reverse());
        }
      }
    } catch (error) {
      console.error('Failed to parse incorrect questions:', error);
    }
  }, []);

  const confirmDelete = (id: number) => {
    setTargetId(id);
    setOpen(true);
  };

  const handleDelete = () => {
    if (targetId === null) return;
    const updated = questions.filter((q) => q.id !== targetId);
    setQuestions(updated);
    localStorage.setItem('incorrectQuestions', JSON.stringify(updated));
    setOpen(false);
    setTargetId(null);
  };

  const handleDeleteAll = () => {
    setQuestions([]); // 状態をリセット
    localStorage.removeItem('incorrectQuestions');
    setOpenAllDelete(false); // モーダルを閉じる
  };

  return (
    <main className='p-6 relative max-w-screen-md mx-auto'>
      {/* トップページに戻るボタン (左上) */}
      <Link
        href='/'
        className='absolute top-6 left-6 inline-block bg-gray-300 hover:bg-gray-400 py-2 px-4 rounded-2xl'
      >
        トップへ
      </Link>

      {/* 全て削除するボタン (右上) */}
      {questions.length > 0 && (
        <Button
          className='absolute top-6 right-6 bg-red-500 hover:bg-red-600 text-white rounded-2xl cursor-pointer'
          onClick={() => setOpenAllDelete(true)} // 全て削除モーダルを開く
        >
          全削除
        </Button>
      )}

      <h1 className='text-3xl mb-4 mt-12 font-semibold text-center'>復習</h1>

      {questions.length === 0 ? (
        <p className='text-center text-xl p-8'>
          最近間違えた問題はありません。
        </p>
      ) : (
        <ul className='space-y-6'>
          {questions.map((q) => (
            <li
              key={q.id}
              className='relative border p-4 rounded-lg shadow-sm bg-gray-50'
            >
              {/* 削除アイコン */}
              <Button
                variant='ghost'
                title='この問題を削除'
                aria-label='削除'
                className='absolute top-1/2 right-2 -translate-y-1/2 text-red-500 hover:text-red-600 p-1 cursor-pointer'
                size='icon'
                onClick={() => confirmDelete(q.id)}
              >
                <Trash2 className='w-5 h-5' />
              </Button>

              <p className='font-semibold'>{q.question}</p>
              <ul className='mt-2 space-y-2'>
                {q.choices.map((c, i) => (
                  <li
                    key={c.id}
                    className={cn(c.isCorrect && 'text-green-600 font-bold')}
                  >
                    {i + 1}. {c.text}
                  </li>
                ))}
              </ul>
              <p className='bg-yellow-50 border-l-4 border-yellow-400 p-1.5 mt-2'>
                {q.explanation}
              </p>
            </li>
          ))}
        </ul>
      )}

      {/* モーダル: 単一削除確認 */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='rounded-xl shadow-lg bg-gray-50 max-w-sm mx-auto'>
          <DialogHeader>
            <DialogTitle className='text-center text-lg font-bold'>
              本当に削除しますか？
            </DialogTitle>
            <DialogDescription className='text-sm text-center text-black'>
              この問題を復習リストから削除します。
            </DialogDescription>
          </DialogHeader>

          {/* 中央寄せにカスタム */}
          <div className='flex justify-center gap-4 mt-4'>
            <Button
              variant='outline'
              className='rounded-full px-4 border-black hover:bg-gray-200 cursor-pointer'
              onClick={() => setOpen(false)}
            >
              キャンセル
            </Button>
            <Button
              className='rounded-full px-4 bg-red-500 hover:bg-red-600 text-white cursor-pointer'
              onClick={handleDelete}
            >
              削除する
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* モーダル: 全て削除確認 */}
      <Dialog open={openAllDelete} onOpenChange={setOpenAllDelete}>
        <DialogContent className='rounded-xl shadow-lg bg-gray-50 max-w-sm mx-auto'>
          <DialogHeader>
            <DialogTitle className='text-center text-lg font-bold'>
              本当にすべて削除しますか？
            </DialogTitle>
            <DialogDescription className='text-sm text-center text-black'>
              復習リストのすべての問題を削除します。この操作は元に戻せません。
            </DialogDescription>
          </DialogHeader>

          {/* 中央寄せにカスタム */}
          <div className='flex justify-center gap-4 mt-4'>
            <Button
              variant='outline'
              className='rounded-full px-4 border-black hover:bg-gray-200 cursor-pointer'
              onClick={() => setOpenAllDelete(false)}
            >
              キャンセル
            </Button>
            <Button
              className='rounded-full px-4 bg-red-500 text-white hover:bg-red-600 cursor-pointer'
              onClick={handleDeleteAll}
            >
              すべて削除
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}

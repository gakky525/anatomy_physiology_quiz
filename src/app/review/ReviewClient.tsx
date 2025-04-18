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
          setQuestions(parsed);
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
    setQuestions([]);
    localStorage.removeItem('incorrectQuestions');
    setOpenAllDelete(false);
  };

  return (
    <main className='p-6 relative max-w-screen-md mx-auto'>
      <Link
        href='/'
        className='absolute top-6 left-6 inline-block bg-gray-300 hover:bg-gray-400 py-2 px-4 rounded-2xl'
      >
        トップへ
      </Link>

      {questions.length > 0 && (
        <Button
          className='absolute top-6 right-6 bg-red-500 hover:bg-red-600 text-white rounded-2xl cursor-pointer'
          onClick={() => setOpenAllDelete(true)}
        >
          全削除
        </Button>
      )}

      <h1 className='text-3xl mb-3 mt-12 font-semibold text-center'>復習</h1>
      <h2
        className={`mb-1 text-lg text-center font-medium ${
          questions.length >= 100 ? 'text-red-500' : 'text-gray-600'
        }`}
      >
        現在の復習リストの問題数：{questions.length}/100問
      </h2>

      <div className='mb-3 mx-auto w-full max-w-sm h-2 bg-gray-200 rounded-full overflow-hidden'>
        <div
          className={`h-full transition-all duration-300 ${
            questions.length >= 100 ? 'bg-red-500' : 'bg-green-500'
          }`}
          style={{ width: `${(questions.length / 100) * 100}%` }}
        />
      </div>

      {questions.length >= 100 && (
        <p className='text-sm text-red-500 text-center m-2'>
          ⚠ 保存上限に達しています（古いものから順に削除されます）
        </p>
      )}

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

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='rounded-xl shadow-lg bg-gray-50 w-[80%] sm:max-w-sm mx-auto'>
          <DialogHeader>
            <DialogTitle className='text-center text-lg font-bold'>
              本当に削除しますか？
            </DialogTitle>
            <DialogDescription className='text-sm text-center text-black'>
              この問題を復習リストから削除します。
            </DialogDescription>
          </DialogHeader>

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

      <Dialog open={openAllDelete} onOpenChange={setOpenAllDelete}>
        <DialogContent className='rounded-xl shadow-lg bg-gray-50 w-[80%] sm:max-w-sm mx-auto'>
          <DialogHeader>
            <DialogTitle className='text-center text-lg font-bold'>
              本当にすべて削除しますか？
            </DialogTitle>
            <DialogDescription className='text-sm text-center text-black'>
              復習リストのすべての問題を削除します。この操作は元に戻せません。
            </DialogDescription>
          </DialogHeader>

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

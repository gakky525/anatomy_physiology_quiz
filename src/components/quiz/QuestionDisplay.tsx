'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

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

export default function QuestionDisplay({
  question,
  // field,
  category,
}: {
  question: Question;
  // field: string;
  category: string;
}) {
  const router = useRouter();
  const [selected, setSelected] = useState<number | null>(null);

  const saveIncorrectQuestion = (question: Question) => {
    if (typeof window === 'undefined') return;
    const existing = JSON.parse(
      localStorage.getItem('incorrectQuestions') || '[]'
    );
    const exists = existing.some((q: Question) => q.id === question.id);
    if (!exists) {
      localStorage.setItem(
        'incorrectQuestions',
        JSON.stringify([...existing, question])
      );
    }
  };

  const selectedChoice = question.choices.find((c) => c.id === selected);
  const isCorrect = selectedChoice?.isCorrect;
  const correctChoice = question.choices.find((c) => c.isCorrect);

  useEffect(() => {
    if (selected !== null && selectedChoice && !selectedChoice.isCorrect) {
      saveIncorrectQuestion(question);
    }
  }, [selected, selectedChoice, question]);

  const handleSelect = (id: number) => {
    if (selected === null) {
      setSelected(id);
    }
  };

  const handleNext = () => {
    router.refresh();
    setSelected(null); // 念のため初期化（安全）
  };

  const handleBack = () => {
    router.push(`/subjects/${category}`);
  };

  return (
    <div className='space-y-4 m-4 '>
      <h2 className='text-xl font-semibold'>{question.question}</h2>
      <ul className='space-y-2'>
        {question.choices.map((choice, index) => {
          const isSelected = selected === choice.id;
          return (
            <li
              key={choice.id}
              className={`border border-black text-xl rounded p-2 mt-3 flex items-center gap-2
                ${
                  selected === null
                    ? 'bg-gray-50 hover:bg-gray-200 cursor-pointer'
                    : selected === choice.id
                    ? choice.isCorrect
                      ? 'bg-green-300'
                      : 'bg-red-300'
                    : choice.isCorrect
                    ? 'bg-green-300'
                    : 'bg-gray-50'
                }
                ${selected !== null ? 'cursor-default' : 'cursor-pointer'}
              `}
              onClick={() => handleSelect(choice.id)}
            >
              <span className='font-bold'>{index + 1}.</span>
              <span>{choice.text}</span>
              {selected !== null && isSelected && (
                <span>{choice.isCorrect ? '⭕️' : '❌'}</span>
              )}
            </li>
          );
        })}
      </ul>

      {selected !== null && (
        <div>
          {!isCorrect && correctChoice && (
            <p className='text-lg text-green-600'>正解：{correctChoice.text}</p>
          )}
          <div className='bg-yellow-50 border-l-4 border-yellow-400 p-2 mt-2'>
            <p className='text-lg'>{question.explanation}</p>
          </div>
        </div>
      )}
      <div className='flex gap-4'>
        {selected !== null && (
          <div className='w-full flex justify-between mt-4'>
            <button
              onClick={handleBack}
              className='bg-gray-300 hover:bg-gray-400 px-4 py-3 rounded-lg shadow transition cursor-pointer'
            >
              分野選択へ
            </button>
            <button
              onClick={handleNext}
              className='bg-blue-400 hover:bg-blue-500 text-white px-4 py-3 rounded-lg shadow transition cursor-pointer'
            >
              次の問題へ
            </button>
          </div>
        )}

        {selected === null && (
          <div className='mt-4'>
            <button
              onClick={handleBack}
              className='bg-gray-300 hover:bg-gray-400 px-4 py-3 rounded-lg shadow transition cursor-pointer'
            >
              分野選択へ
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

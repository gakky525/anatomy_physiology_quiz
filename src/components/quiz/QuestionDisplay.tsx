'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';

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
  question: initialQuestion,
  category,
  field,
}: {
  question: Question;
  category: string;
  field: string;
}) {
  const router = useRouter();
  const [question, setQuestion] = useState<Question | null>(initialQuestion);
  const [selected, setSelected] = useState<number | null>(null);
  const [showLimitNotice, setShowLimitNotice] = useState(false);
  const [animationState, setAnimationState] = useState<
    'idle' | 'exit' | 'enter'
  >('idle');
  const hasShownNoticeRef = useRef(false);

  const saveIncorrectQuestion = (q: Question) => {
    const existing: Question[] = JSON.parse(
      localStorage.getItem('incorrectQuestions') || '[]'
    );
    const filtered = existing.filter((item) => item.id !== q.id);
    const updated = [q, ...filtered];

    if (updated.length > 100) {
      updated.pop();
      if (!hasShownNoticeRef.current) {
        setShowLimitNotice(true);
        hasShownNoticeRef.current = true;
        setTimeout(() => setShowLimitNotice(false), 5000);
      }
    }

    localStorage.setItem('incorrectQuestions', JSON.stringify(updated));
  };

  const selectedChoice =
    question && Array.isArray(question.choices)
      ? question.choices.find((c) => c.id === selected)
      : undefined;

  const isCorrect = selectedChoice?.isCorrect;
  const correctChoice =
    question && Array.isArray(question.choices)
      ? question.choices.find((c) => c.isCorrect)
      : undefined;

  useEffect(() => {
    if (
      selected !== null &&
      selectedChoice &&
      !selectedChoice.isCorrect &&
      question
    ) {
      saveIncorrectQuestion(question);
    }
  }, [selected, selectedChoice, question]);

  const handleSelect = (id: number) => {
    if (selected === null) setSelected(id);
  };

  const handleBack = () => {
    router.push(`/subjects/${category}`);
  };

  const handleNext = async () => {
    setAnimationState('exit');

    setTimeout(async () => {
      try {
        const res = await fetch('/api/questions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            category: category.toUpperCase(),
            field,
          }),
          cache: 'no-store',
        });

        if (!res.ok) {
          console.error('API error', await res.text());
          setQuestion(null);
          setAnimationState('idle');
          return;
        }

        const data = await res.json();

        if (!data || typeof data !== 'object' || !Array.isArray(data.choices)) {
          console.warn('Invalid question data:', data);
          setQuestion(null);
          setAnimationState('idle');
          return;
        }

        setQuestion(data);
        setSelected(null);
        setAnimationState('enter');

        setTimeout(() => setAnimationState('idle'), 300);
      } catch (error) {
        console.error('Fetch failed', error);
        setQuestion(null);
        setAnimationState('idle');
      }
    }, 300);
  };

  return (
    <div className='relative m-4'>
      {showLimitNotice && (
        <div className='fixed top-4 left-1/2 transform -translate-x-1/2 bg-yellow-100 text-yellow-800 border border-yellow-400 px-4 py-2 rounded shadow z-50'>
          復習リストの保存上限に達したため、古い問題を削除して保存しました。
        </div>
      )}

      {!question ? (
        <div className='text-center text-lg text-red-600 mt-10'>
          問題が見つかりませんでした。
        </div>
      ) : (
        <div
          className={clsx(
            'transition-transform duration-300',
            animationState === 'exit' && '-translate-x-full opacity-0',
            animationState === 'enter' && 'translate-x-full opacity-0',
            animationState === 'idle' && 'translate-x-0 opacity-100'
          )}
        >
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
                <p className='text-lg text-green-600'>
                  正解：{correctChoice.text}
                </p>
              )}
              <div className='bg-yellow-50 border-l-4 border-yellow-400 p-2 mt-2'>
                <p className='text-lg'>{question.explanation}</p>
              </div>
            </div>
          )}

          <div className='flex gap-4 mt-4 justify-between'>
            <button
              onClick={handleBack}
              className='bg-gray-300 hover:bg-gray-400 px-4 py-3 rounded-lg shadow'
            >
              分野選択へ
            </button>
            {selected !== null && (
              <button
                onClick={handleNext}
                className='bg-blue-400 hover:bg-blue-500 text-white px-4 py-3 rounded-lg shadow'
              >
                次の問題へ
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

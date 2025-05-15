'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

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

function LoadingOverlay() {
  return (
    <div className='absolute inset-0 z-10 flex flex-col items-center justify-center bg-opacity-10 pointer-events-none'>
      <div className='animate-spin rounded-full h-12 w-12 border-4 border-blue-400 border-t-transparent mb-4' />
      <div className='text-gray-700 text-lg'>次の問題を読み込んでいます...</div>
    </div>
  );
}

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
  const [fadeClass, setFadeClass] = useState<'fade-in' | 'fade-out'>('fade-in');
  const [isLoadingNext, setIsLoadingNext] = useState(false);
  const [excludeHistory, setExcludeHistory] = useState<number[]>([
    initialQuestion.id,
  ]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const hasShownNoticeRef = useRef(false);
  const isFirstRenderRef = useRef(true);

  const selectedChoice = question?.choices.find((c) => c.id === selected);
  const isCorrect = selectedChoice?.isCorrect;
  const correctChoice = question?.choices.find((c) => c.isCorrect);

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

  useEffect(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      return;
    }

    if (
      selected !== null &&
      selectedChoice &&
      !selectedChoice.isCorrect &&
      question
    ) {
      saveIncorrectQuestion(question);
    }
  }, [selected, selectedChoice, question]);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => setErrorMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const handleSelect = (id: number) => {
    if (selected === null) {
      setSelected(id);
    }
  };

  const handleBack = () => {
    router.push(`/subjects/${category}`);
  };

  const handleNext = async () => {
    setFadeClass('fade-out');
    setIsLoadingNext(true);

    const nextExcludeIds = [...excludeHistory];
    if (question) nextExcludeIds.push(question.id);
    const trimmedExcludeIds = nextExcludeIds.slice(-5);

    try {
      const res = await fetch('/api/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category,
          field,
          excludeIds: trimmedExcludeIds,
        }),
        cache: 'no-store',
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error('Failed to fetch next question:', errorText);
        setErrorMessage(
          '次の問題を取得できませんでした。時間をおいて再度お試しください。'
        );
        setFadeClass('fade-in');
        setIsLoadingNext(false);
        return;
      }

      const data = await res.json();
      if (!data || !Array.isArray(data.choices)) {
        console.error('Invalid data received for next question');
        setErrorMessage('取得した問題データが不正です。');
        setFadeClass('fade-in');
        setIsLoadingNext(false);
        return;
      }

      setTimeout(() => {
        setQuestion(data);
        setSelected(null);
        setExcludeHistory(trimmedExcludeIds);
        setFadeClass('fade-in');
        setIsLoadingNext(false);
      }, 300);
    } catch (err) {
      console.error('handleNext error:', err);
      setErrorMessage('次の問題の取得中にエラーが発生しました。');
      setFadeClass('fade-in');
      setIsLoadingNext(false);
    }
  };

  return (
    <div className='relative m-4 min-h-[24rem]'>
      {errorMessage && (
        <div className='fixed top-2 left-1/2 transform -translate-x-1/2 bg-red-100 text-red-800 border border-red-400 px-4 py-2 rounded-lg shadow z-50'>
          {errorMessage}
        </div>
      )}

      {showLimitNotice && (
        <div className='fixed top-2 left-1/2 transform -translate-x-1/2 bg-yellow-100 text-yellow-800 border border-yellow-400 px-4 py-2 rounded-lg shadow z-50'>
          復習リストの保存上限に達したため、古い問題を削除して保存しました。
        </div>
      )}

      {isLoadingNext && <LoadingOverlay />}

      {!question ? (
        <div className='flex flex-col items-center justify-center min-h-[60vh] text-xl text-gray-700'>
          <div className='animate-spin rounded-full h-10 w-10 border-4 border-blue-400 border-t-transparent mb-4' />
          <span>次の問題を読み込んでいます...</span>
        </div>
      ) : (
        <div className={`fade ${fadeClass}`}>
          <h2 className='text-xl font-semibold'>{question.question}</h2>

          <ul className='space-y-3 mb-4'>
            {question.choices.map((choice, index) => {
              const isSelected = selected === choice.id;
              return (
                <li
                  key={choice.id}
                  className={`border border-black text-lg rounded-lg p-2 mt-3 flex items-center gap-2
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
                  <span className='font-semibold'>{index + 1}.</span>
                  <span>{choice.text}</span>
                  {selected !== null && isSelected && (
                    <span>{choice.isCorrect ? '⭕️' : '❌'}</span>
                  )}
                </li>
              );
            })}
          </ul>

          {selected !== null && (
            <div className='mt-4'>
              {!isCorrect && correctChoice && (
                <p className='text-lg text-green-600'>
                  正：{correctChoice.text}
                </p>
              )}
              <div className='bg-yellow-50 border-l-4 border-yellow-400 rounded-lg p-2 mt-1'>
                <p className='text-lg'>{question.explanation}</p>
              </div>
            </div>
          )}

          <div className='flex justify-between mt-6'>
            <button
              onClick={handleBack}
              className='bg-gray-300 hover:bg-gray-400 px-5 py-3 rounded-xl cursor-pointer shadow transition-transform hover:scale-105'
            >
              分野選択へ
            </button>
            {selected !== null && (
              <button
                onClick={handleNext}
                className='bg-blue-400 hover:bg-blue-500 text-white px-5 py-3 rounded-xl cursor-pointer shadow transition-transform hover:scale-105'
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

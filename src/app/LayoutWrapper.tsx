'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

export default function LayoutWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // 解剖学ページ → 薄いピンク / 生理学ページ → 薄い緑 / それ以外 → ベージュ
  const bgColor = pathname.includes('/anatomy')
    ? 'bg-pink-100'
    : pathname.includes('/physiology')
    ? 'bg-green-100'
    : 'bg-orange-50';

  return <div className={`${bgColor} min-h-screen`}>{children}</div>;
}

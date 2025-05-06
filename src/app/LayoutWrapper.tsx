'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

export default function LayoutWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const bgColor = pathname.includes('/anatomy')
    ? 'bg-pink-100'
    : pathname.includes('/physiology')
    ? 'bg-green-100'
    : 'bg-orange-50';

  return <div className={`${bgColor} min-h-screen`}>{children}</div>;
}

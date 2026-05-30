'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { defaultLocale } from '@/lib/i18n/config';

// Always redirect to English (/en) — no browser language detection.
// This ensures a consistent English experience for all users (overseas project).
export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace(`/${defaultLocale}`);
  }, [router]);

  return null;
}

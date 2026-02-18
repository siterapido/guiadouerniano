'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils/cn';

interface ProgressBarProps {
  className?: string;
}

export function ReadingProgressBar({ className }: ProgressBarProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function updateProgress() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0;
      setProgress(Math.round(pct));
    }

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={progress}
      aria-label="Progresso de leitura"
      className={cn('fixed top-0 left-0 right-0 z-50 h-1 bg-[--neutro-200]', className)}
    >
      <div
        className="h-full bg-[--azul-correnteza] transition-all duration-100 ease-linear"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

'use client';

import { useState } from 'react';
import { Link2, Twitter, Facebook, Check } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface ShareButtonsProps {
  title: string;
  url?: string;
  className?: string;
}

export function ShareButtons({ title, url, className }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl = url ?? (typeof window !== 'undefined' ? window.location.href : '');
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: select input
    }
  }

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span className="text-sm text-[--neutro-600] font-medium mr-1">Compartilhar:</span>

      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Compartilhar no Twitter/X"
        className="w-9 h-9 rounded-lg bg-[--neutro-100] hover:bg-[--azul-correnteza] hover:text-white text-[--neutro-600] flex items-center justify-center transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[--azul-correnteza]"
      >
        <Twitter className="w-4 h-4" aria-hidden="true" />
      </a>

      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Compartilhar no Facebook"
        className="w-9 h-9 rounded-lg bg-[--neutro-100] hover:bg-[--azul-correnteza] hover:text-white text-[--neutro-600] flex items-center justify-center transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[--azul-correnteza]"
      >
        <Facebook className="w-4 h-4" aria-hidden="true" />
      </a>

      <button
        type="button"
        onClick={() => void copyLink()}
        aria-label={copied ? 'Link copiado!' : 'Copiar link'}
        className={cn(
          'w-9 h-9 rounded-lg flex items-center justify-center transition-colors duration-150',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-[--azul-correnteza]',
          copied
            ? 'bg-green-100 text-green-600'
            : 'bg-[--neutro-100] text-[--neutro-600] hover:bg-[--azul-correnteza] hover:text-white'
        )}
      >
        {copied ? <Check className="w-4 h-4" aria-hidden="true" /> : <Link2 className="w-4 h-4" aria-hidden="true" />}
      </button>
    </div>
  );
}

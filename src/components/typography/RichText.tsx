'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils/cn';

interface RichTextProps {
  html: string;
  className?: string;
}

export function RichText({ html, className }: RichTextProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Client-side DOMPurify sanitization as a safety net
    // Primary sanitization happens server-side
    async function sanitize() {
      if (!ref.current) return;
      try {
        const DOMPurify = (await import('dompurify')).default;
        const clean = DOMPurify.sanitize(html, {
          ALLOWED_TAGS: [
            'p', 'br', 'strong', 'em', 'u', 's', 'a', 'ul', 'ol', 'li',
            'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'pre', 'code',
            'table', 'thead', 'tbody', 'tr', 'th', 'td', 'img', 'figure', 'figcaption',
            'hr', 'div', 'span',
          ],
          ALLOWED_ATTR: ['href', 'target', 'rel', 'src', 'alt', 'width', 'height', 'class', 'id'],
          FORCE_BODY: true,
        });
        ref.current.innerHTML = clean;
      } catch {
        // If DOMPurify fails (e.g. SSR), show content as-is
        if (ref.current) ref.current.innerHTML = html;
      }
    }

    void sanitize();
  }, [html]);

  return (
    <div
      ref={ref}
      className={cn(
        'prose prose-lg max-w-none',
        // Headings
        'prose-headings:font-display prose-headings:text-[--neutro-950] prose-headings:font-bold prose-headings:tracking-tight',
        // Links
        'prose-a:text-[--azul-correnteza] prose-a:no-underline hover:prose-a:underline',
        // Blockquote
        'prose-blockquote:border-l-[--azul-correnteza] prose-blockquote:text-[--neutro-600] prose-blockquote:not-italic',
        // Code
        'prose-code:text-[--vermelho-luta] prose-code:bg-[--neutro-100] prose-code:rounded prose-code:px-1',
        'prose-pre:bg-[--neutro-950] prose-pre:text-[--neutro-100]',
        // Images
        'prose-img:rounded-xl prose-img:shadow-md',
        className
      )}
      suppressHydrationWarning
    />
  );
}

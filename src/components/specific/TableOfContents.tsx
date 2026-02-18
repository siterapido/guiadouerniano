'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils/cn';

interface TocHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

interface TableOfContentsProps {
  contentSelector?: string;
  className?: string;
}

export function TableOfContents({ contentSelector = '.prose', className }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TocHeading[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const container = document.querySelector(contentSelector);
    if (!container) return;

    const elements = Array.from(container.querySelectorAll('h2, h3')) as HTMLHeadingElement[];
    const items: TocHeading[] = elements.map((el) => {
      if (!el.id) {
        el.id = el.textContent?.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') ?? '';
      }
      return {
        id: el.id,
        text: el.textContent ?? '',
        level: (Number(el.tagName[1]) as 2 | 3),
      };
    });
    setHeadings(items);
  }, [contentSelector]);

  useEffect(() => {
    if (!headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '0px 0px -70% 0px', threshold: 0 }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (!headings.length) return null;

  return (
    <nav aria-label="Índice do conteúdo" className={cn('', className)}>
      <p className="text-xs font-semibold uppercase tracking-widest text-[--neutro-600] mb-3">
        Neste artigo
      </p>
      <ul className="space-y-1">
        {headings.map(({ id, text, level }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={cn(
                'block text-sm py-1 border-l-2 transition-all duration-150',
                level === 2 ? 'pl-3' : 'pl-6',
                activeId === id
                  ? 'border-[--azul-correnteza] text-[--azul-correnteza] font-semibold'
                  : 'border-transparent text-[--neutro-600] hover:text-[--neutro-900] hover:border-[--neutro-200]'
              )}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

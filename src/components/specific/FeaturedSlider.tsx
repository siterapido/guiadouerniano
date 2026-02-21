'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Clock, ArrowUpRight } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { formatRelative } from '@/lib/utils/format';
import type { PostWithAuthor } from '@/types';

interface FeaturedSliderProps {
  posts: PostWithAuthor[];
}

export function FeaturedSlider({ posts }: FeaturedSliderProps) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const autoTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = posts.length;

  const goTo = useCallback((index: number) => {
    setCurrent(index);
    setProgress(0);
  }, []);

  const goNext = useCallback(() => {
    setCurrent((prev) => (prev + 1) % total);
    setProgress(0);
  }, [total]);

  const goPrev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + total) % total);
    setProgress(0);
  }, [total]);

  useEffect(() => {
    if (total <= 1 || isPaused) {
      if (progressTimer.current) clearInterval(progressTimer.current);
      return;
    }
    setProgress(0);
    progressTimer.current = setInterval(() => {
      setProgress((p) => (p >= 100 ? 100 : p + 2));
    }, 100);
    return () => {
      if (progressTimer.current) clearInterval(progressTimer.current);
    };
  }, [current, total, isPaused]);

  useEffect(() => {
    if (total <= 1 || isPaused) return;
    autoTimer.current = setInterval(goNext, 5000);
    return () => {
      if (autoTimer.current) clearInterval(autoTimer.current);
    };
  }, [total, isPaused, goNext]);

  if (total === 0) return null;

  return (
    <div
      className="relative rounded-2xl overflow-hidden shadow-2xl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ===== IMAGENS (crossfade) ===== */}
      <div className="relative h-[420px] md:h-[560px]">
        {posts.map((p, i) => (
          <div
            key={p.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              i === current ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {p.cover_image_url ? (
              <Image
                src={p.cover_image_url}
                alt={p.title}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 1200px, 100vw"
                priority={i === 0}
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-azul-uern to-azul-brilhante" />
            )}
          </div>
        ))}

        {/* Gradiente overlay — forte em baixo, suave em cima */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutro-950 via-neutro-950/50 to-neutro-950/10" />

        {/* ===== CONTEÚDO SOBREPOSTO ===== */}
        <div className="absolute inset-0 flex flex-col justify-end">
          {/* Área de texto */}
          <div className="relative px-6 md:px-10 pb-6 md:pb-8">
            {posts.map((p, i) => (
              <div
                key={p.id}
                className={`transition-all duration-500 ${
                  i === current
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-3 absolute inset-x-0 bottom-0 px-6 md:px-10 pb-6 md:pb-8 pointer-events-none'
                }`}
              >
                {/* Categoria */}
                <span
                  className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider mb-3 px-3 py-1 rounded-full"
                  style={{
                    background: `${p.category.color ?? '#1A5FB4'}33`,
                    color: p.category.color ?? '#1A5FB4',
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: p.category.color ?? '#1A5FB4' }}
                  />
                  {p.category.name}
                </span>

                {/* Título */}
                <Link
                  href={`/blog/${p.slug}`}
                  tabIndex={i !== current ? -1 : 0}
                  className="group block no-underline mb-3"
                >
                  <h2 className="font-display font-extrabold text-2xl md:text-4xl text-white leading-tight group-hover:text-azul-brilhante transition-colors max-w-3xl">
                    {p.title}
                  </h2>
                </Link>

                {/* Excerpt — só desktop */}
                {p.excerpt && (
                  <p className="hidden md:block text-white/70 text-sm leading-relaxed line-clamp-2 max-w-2xl mb-4">
                    {p.excerpt}
                  </p>
                )}

                {/* Meta + CTA */}
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-3 min-w-0">
                    <Avatar
                      src={p.author.avatar_url ?? undefined}
                      name={p.author.name ?? undefined}
                      size="sm"
                    />
                    <div className="min-w-0">
                      <p className="text-white text-sm font-medium truncate">
                        {p.author.name ?? 'Autor'}
                      </p>
                      <div className="flex items-center gap-2 text-white/50 text-xs mt-0.5">
                        {p.published_at && <span>{formatRelative(p.published_at)}</span>}
                        {p.reading_time && (
                          <>
                            <span>·</span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {p.reading_time} min
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <Link
                    href={`/blog/${p.slug}`}
                    tabIndex={i !== current ? -1 : 0}
                    className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-neutro-950 font-bold text-sm hover:bg-neutro-200 transition-colors min-h-[44px]"
                  >
                    Ler artigo
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* ===== THUMBNAILS (desktop) ===== */}
          {total > 1 && (
            <div className="hidden md:flex items-center gap-2 px-10 pb-4 justify-end">
              {posts.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => goTo(i)}
                  aria-label={`Ver: ${p.title}`}
                  aria-current={i === current ? 'true' : undefined}
                  className={`relative overflow-hidden rounded-lg transition-all duration-300 flex-shrink-0 ${
                    i === current
                      ? 'w-28 h-16 ring-2 ring-white opacity-100'
                      : 'w-16 h-10 opacity-50 hover:opacity-80'
                  }`}
                >
                  {p.cover_image_url ? (
                    <Image
                      src={p.cover_image_url}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="112px"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-azul-correnteza/40" />
                  )}
                  {/* Progress overlay no thumbnail ativo */}
                  {i === current && (
                    <span
                      className="absolute bottom-0 left-0 h-[3px] bg-white transition-none"
                      style={{ width: `${progress}%` }}
                    />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ===== DOTS MOBILE ===== */}
        {total > 1 && (
          <div className="md:hidden absolute top-4 right-4 flex flex-col gap-1.5 z-10">
            {posts.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Slide ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === current
                    ? 'h-6 w-1.5 bg-white'
                    : 'h-1.5 w-1.5 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        )}

        {/* ===== ARROWS ===== */}
        {total > 1 && (
          <>
            <button
              onClick={goPrev}
              className="absolute top-1/2 -translate-y-1/2 left-4 z-10 w-11 h-11 rounded-full border border-white/20 bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-all"
              aria-label="Post anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goNext}
              className="absolute top-1/2 -translate-y-1/2 right-4 z-10 w-11 h-11 rounded-full border border-white/20 bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-all"
              aria-label="Próximo post"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* ===== PROGRESS BAR ===== */}
        {total > 1 && (
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/15 z-10">
            <div
              className="h-full bg-white/70 transition-none"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

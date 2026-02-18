import Link from 'next/link';
import Image from 'next/image';
import { Clock, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { formatRelative, formatReadingTime } from '@/lib/utils/format';
import { cn } from '@/lib/utils/cn';
import type { PostWithAuthor } from '@/types';

interface ArticleCardProps {
  post: PostWithAuthor;
  variant?: 'default' | 'horizontal' | 'featured';
  className?: string;
}

export function ArticleCard({ post, variant = 'default', className }: ArticleCardProps) {
  const href = `/blog/${post.slug}`;

  if (variant === 'horizontal') {
    return (
      <article className={cn('flex gap-4 p-4 rounded-xl hover:bg-neutro-100 transition-colors', className)}>
        {post.cover_image_url && (
          <Link href={href} className="flex-shrink-0">
            <div className="relative w-20 h-20 rounded-lg overflow-hidden">
              <Image src={post.cover_image_url} alt={post.title} fill className="object-cover" />
            </div>
          </Link>
        )}
        <div className="flex-1 min-w-0">
          <Badge variant="primary" className="mb-1 text-[10px]">
            {post.category.name}
          </Badge>
          <Link href={href} className="no-underline">
            <h3 className="font-display font-bold text-neutro-900 text-sm leading-snug line-clamp-2 hover:text-azul-correnteza transition-colors">
              {post.title}
            </h3>
          </Link>
          <div className="flex items-center gap-2 mt-1.5 text-xs text-neutro-600">
            <Clock className="w-3 h-3" />
            <span>{post.reading_time ? formatReadingTime(post.reading_time) : 'Leitura rápida'}</span>
            <span>·</span>
            <span>{post.published_at ? formatRelative(post.published_at) : ''}</span>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      className={cn(
        'group bg-white rounded-xl overflow-hidden border border-neutro-200 shadow-sm hover:shadow-card-hover transition-all duration-200 hover:-translate-y-1',
        className
      )}
    >
      {/* Imagem */}
      <Link href={href} className="block aspect-video overflow-hidden bg-neutro-100 relative">
        {post.cover_image_url ? (
          <Image
            src={post.cover_image_url}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-azul-claro to-azul-uern/10" />
        )}
      </Link>

      {/* Conteúdo */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="primary" className="text-[10px]">
            {post.category.name}
          </Badge>
          {post.reading_time && (
            <div className="flex items-center gap-1 text-xs text-neutro-600">
              <Clock className="w-3 h-3" />
              <span>{formatReadingTime(post.reading_time)}</span>
            </div>
          )}
        </div>

        <Link href={href} className="no-underline">
          <h2 className="font-display font-bold text-neutro-900 text-heading-sm leading-snug line-clamp-2 group-hover:text-azul-correnteza transition-colors mb-2">
            {post.title}
          </h2>
        </Link>

        {post.excerpt && (
          <p className="text-body-sm text-neutro-600 line-clamp-2 mb-3">{post.excerpt}</p>
        )}

        <div className="flex items-center gap-2 pt-3 border-t border-neutro-200">
          <Avatar src={post.author.avatar_url} name={post.author.name} size="xs" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-neutro-900 truncate">{post.author.name}</p>
            <p className="text-xs text-neutro-600">
              {post.published_at ? formatRelative(post.published_at) : 'Rascunho'}
            </p>
          </div>
          {post.views_count > 0 && (
            <div className="flex items-center gap-1 text-xs text-neutro-600">
              <Eye className="w-3 h-3" />
              <span>{post.views_count}</span>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

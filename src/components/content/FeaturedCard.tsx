import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { formatRelative } from '@/lib/utils/format';
import type { PostWithAuthor } from '@/types';

interface FeaturedCardProps {
  post: PostWithAuthor;
}

export function FeaturedCard({ post }: FeaturedCardProps) {
  const href = post.type === 'blog' ? `/blog/${post.slug}` : `/guia/${post.category.slug}/${post.slug}`;

  return (
    <article className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-azul-uern to-azul-correnteza text-white min-h-[320px] md:min-h-[400px] flex flex-col justify-end">
      {/* Background image */}
      {post.cover_image_url && (
        <Image
          src={post.cover_image_url}
          alt={post.title}
          fill
          className="object-cover opacity-40"
          priority
          sizes="(max-width: 768px) 100vw, 70vw"
        />
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-azul-uern/90 via-azul-uern/40 to-transparent" />

      {/* Conteúdo */}
      <div className="relative z-10 p-6 md:p-8">
        <Badge variant="urgente" className="mb-3">
          {post.category.name}
        </Badge>
        <h2 className="font-display font-extrabold text-display-lg text-white leading-tight mb-3 max-w-2xl">
          {post.title}
        </h2>
        {post.excerpt && (
          <p className="text-white/80 text-body-md mb-4 max-w-xl line-clamp-2">{post.excerpt}</p>
        )}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Avatar src={post.author.avatar_url} name={post.author.name} size="sm" />
            <div>
              <p className="text-sm font-medium text-white">{post.author.name}</p>
              {post.published_at && (
                <p className="text-xs text-white/60">{formatRelative(post.published_at)}</p>
              )}
            </div>
          </div>
          <Button variant="danger" size="md">
            <Link href={href} className="text-white no-underline">
              Ver mais →
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}

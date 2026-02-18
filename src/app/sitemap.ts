import { MetadataRoute } from 'next';
import { createSupabaseServerClient } from '@/lib/supabase/server';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://guiadouerniano.com.br';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createSupabaseServerClient();

  // Posts estáticos
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${BASE_URL}/guia`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/eventos`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/movimento`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/sobre`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ];

  // Posts dinâmicos
  const { data: posts } = await supabase
    .from('posts')
    .select('slug, type, updated_at, category:categories(slug)')
    .eq('status', 'published')
    .is('deleted_at', null);

  const postRoutes: MetadataRoute.Sitemap = (posts ?? []).map((post) => ({
    url: post.type === 'blog'
      ? `${BASE_URL}/blog/${post.slug}`
      : `${BASE_URL}/guia/${((post.category as unknown) as Array<{ slug: string }>)?.[0]?.slug ?? 'geral'}/${post.slug}`,
    lastModified: new Date(post.updated_at),
    changeFrequency: post.type === 'blog' ? ('weekly' as const) : ('monthly' as const),
    priority: post.type === 'blog' ? 0.7 : 0.6,
  }));

  // Eventos
  const { data: events } = await supabase
    .from('events')
    .select('slug, updated_at')
    .eq('is_public', true)
    .is('deleted_at', null);

  const eventRoutes: MetadataRoute.Sitemap = (events ?? []).map((event) => ({
    url: `${BASE_URL}/eventos/${event.slug}`,
    lastModified: new Date(event.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...postRoutes, ...eventRoutes];
}

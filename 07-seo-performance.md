# 07 - SEO e Performance

Guia completo de SEO e Performance para o "Guia do UERNIANO", construído com **Next.js 14 App Router**.

---

## 1. Estratégia de SEO

### Metadata por Tipo de Página

#### 1.1 Home (`app/page.tsx`)

```typescript
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Guia do UERNIANO',
  description: 'O guia completo para estudantes da UERN. Dicas, guias, eventos e comunidade do movimento Correnteza.',
  
  // Canonical
  alternates: {
    canonical: 'https://seu-dominio.com',
  },

  // Open Graph
  openGraph: {
    type: 'website',
    url: 'https://seu-dominio.com',
    title: 'Guia do UERNIANO',
    description: 'O guia completo para estudantes da UERN',
    images: [
      {
        url: 'https://seu-dominio.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Guia do UERNIANO',
      },
    ],
  },

  // Twitter
  twitter: {
    card: 'summary_large_image',
    title: 'Guia do UERNIANO',
    description: 'O guia completo para estudantes da UERN',
    images: ['https://seu-dominio.com/og-image.png'],
  },

  // Outros
  robots: 'index, follow',
  keywords: ['UERN', 'guia', 'estudantes', 'dicas', 'Mossoró'],
}

export default function Home() {
  return <div>Home Page</div>
}
```

#### 1.2 Blog Post (`app/blog/[slug]/page.tsx`)

```typescript
import { Metadata } from 'next'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'

interface Props {
  params: { slug: string }
}

async function getBlogPost(slug: string) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from('posts')
    .select('*, author:profiles(*), category:categories(*)')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (error || !data) return null
  return data
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getBlogPost(params.slug)

  if (!post) {
    return {
      title: 'Post não encontrado | Guia do UERNIANO',
    }
  }

  const postUrl = `https://seu-dominio.com/blog/${post.slug}`
  const ogImageUrl = `/api/og?title=${encodeURIComponent(post.title)}&category=${encodeURIComponent(post.category?.name || '')}`

  return {
    title: `${post.title} | Guia do UERNIANO`,
    description: post.excerpt || post.content.substring(0, 160),
    
    alternates: {
      canonical: postUrl,
    },

    openGraph: {
      type: 'article',
      url: postUrl,
      title: post.title,
      description: post.excerpt,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      publishedTime: post.published_at,
      authors: [post.author?.full_name || 'Guia do UERNIANO'],
      tags: post.tags || [],
    },

    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [ogImageUrl],
      creator: '@seu_twitter',
    },

    robots: 'index, follow',
    authors: [
      {
        name: post.author?.full_name || 'Guia do UERNIANO',
      },
    ],
    category: post.category?.name,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  return <article>{post.title}</article>
}
```

#### 1.3 Artigo do Guia (`app/guia/[slug]/page.tsx`)

```typescript
import { Metadata } from 'next'
import { createServerSupabaseClient } from '@/lib/supabase/server'

interface Props {
  params: { slug: string }
}

async function getGuideArticle(slug: string) {
  const supabase = createServerSupabaseClient()

  const { data } = await supabase
    .from('guide_articles')
    .select('*, category:categories(*)')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  return data
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getGuideArticle(params.slug)

  if (!article) {
    return { title: 'Artigo não encontrado | Guia do UERNIANO' }
  }

  const articleUrl = `https://seu-dominio.com/guia/${article.slug}`
  const ogImageUrl = `/api/og?type=guide&title=${encodeURIComponent(article.title)}`

  return {
    title: `${article.title} | Guia do UERNIANO`,
    description: article.description || article.content.substring(0, 160),
    
    alternates: {
      canonical: articleUrl,
    },

    openGraph: {
      type: 'article',
      url: articleUrl,
      title: article.title,
      description: article.description,
      images: [{ url: ogImageUrl, width: 1200, height: 630 }],
    },

    robots: 'index, follow',
  }
}

export default async function GuideArticlePage({ params }: Props) {
  const article = await getGuideArticle(params.slug)

  return <article>{article?.title}</article>
}
```

#### 1.4 Evento (`app/eventos/[slug]/page.tsx`)

```typescript
import { Metadata } from 'next'
import { createServerSupabaseClient } from '@/lib/supabase/server'

interface Props {
  params: { slug: string }
}

async function getEvent(slug: string) {
  const supabase = createServerSupabaseClient()

  const { data } = await supabase
    .from('events')
    .select('*')
    .eq('slug', slug)
    .gte('event_date', new Date().toISOString())
    .single()

  return data
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const event = await getEvent(params.slug)

  if (!event) {
    return { title: 'Evento não encontrado | Guia do UERNIANO' }
  }

  const eventUrl = `https://seu-dominio.com/eventos/${event.slug}`

  return {
    title: `${event.title} | Guia do UERNIANO`,
    description: event.description,
    
    alternates: {
      canonical: eventUrl,
    },

    openGraph: {
      type: 'article',
      url: eventUrl,
      title: event.title,
      description: event.description,
      images: [
        {
          url: event.image_url || `/api/og?title=${encodeURIComponent(event.title)}`,
          width: 1200,
          height: 630,
        },
      ],
    },

    robots: 'index, follow',
  }
}

export default async function EventPage({ params }: Props) {
  const event = await getEvent(params.slug)

  return <div>{event?.title}</div>
}
```

#### 1.5 Categoria (`app/categoria/[slug]/page.tsx`)

```typescript
import { Metadata } from 'next'
import { createServerSupabaseClient } from '@/lib/supabase/server'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const supabase = createServerSupabaseClient()

  const { data: category } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', params.slug)
    .single()

  if (!category) {
    return { title: 'Categoria não encontrada | Guia do UERNIANO' }
  }

  return {
    title: `${category.name} | Guia do UERNIANO`,
    description: category.description,
    
    alternates: {
      canonical: `https://seu-dominio.com/categoria/${category.slug}`,
    },

    openGraph: {
      type: 'website',
      title: category.name,
      description: category.description,
    },

    robots: 'index, follow',
  }
}

export default async function CategoryPage({ params }: Props) {
  return <div>Categoria</div>
}
```

#### 1.6 Busca (`app/busca/page.tsx`)

```typescript
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Buscar | Guia do UERNIANO',
  description: 'Busque posts, guias e eventos no Guia do UERNIANO',
  robots: 'noindex, follow', // Não indexar páginas de resultado de busca
}

export default function SearchPage() {
  return <div>Busca</div>
}
```

#### 1.7 Login (`app/login/page.tsx`)

```typescript
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login | Guia do UERNIANO',
  description: 'Faça login na sua conta para acessar conteúdo exclusivo',
  robots: 'noindex, follow',
}

export default function LoginPage() {
  return <div>Login</div>
}
```

#### 1.8 Perfil (`app/perfil/page.tsx`)

```typescript
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Seu Perfil | Guia do UERNIANO',
  robots: 'noindex, nofollow', // Perfil é privado
}

export default function ProfilePage() {
  return <div>Perfil</div>
}
```

### Structured Data (JSON-LD)

#### 1.9 WebSite com SearchAction

```typescript
// `app/layout.tsx` ou componente compartilhado
import { Metadata } from 'next'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Guia do UERNIANO',
  url: 'https://seu-dominio.com',
  description: 'O guia completo para estudantes da UERN',
  publisher: {
    '@type': 'Organization',
    name: 'Movimento Correnteza',
    logo: {
      '@type': 'ImageObject',
      url: 'https://seu-dominio.com/logo.png',
      width: 250,
      height: 60,
    },
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://seu-dominio.com/busca?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
}

export default function RootLayout() {
  return (
    <html>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>Content</body>
    </html>
  )
}
```

#### 1.10 Article Schema (Blog Post)

```typescript
// Em `app/blog/[slug]/page.tsx`
import { Metadata } from 'next'

export default async function BlogPostPage({ params }: Props) {
  const post = await getBlogPost(params.slug)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: `/api/og?title=${encodeURIComponent(post.title)}`,
    datePublished: post.published_at,
    dateModified: post.updated_at,
    author: {
      '@type': 'Person',
      name: post.author?.full_name,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Movimento Correnteza',
      logo: {
        '@type': 'ImageObject',
        url: 'https://seu-dominio.com/logo.png',
      },
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article>{post.title}</article>
    </>
  )
}
```

#### 1.11 HowTo Schema (Artigos do Guia)

```typescript
// Em `app/guia/[slug]/page.tsx`
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: article.title,
  description: article.description,
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Primeiro passo',
      text: 'Descrição do primeiro passo',
    },
    // ... mais passos
  ],
}
```

#### 1.12 Event Schema

```typescript
// Em `app/eventos/[slug]/page.tsx`
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: event.title,
  description: event.description,
  startDate: event.event_date,
  endDate: event.event_date_end,
  location: {
    '@type': 'Place',
    name: event.location,
    address: {
      '@type': 'PostalAddress',
      streetAddress: event.street,
      addressLocality: event.city,
    },
  },
  organizer: {
    '@type': 'Organization',
    name: 'Movimento Correnteza',
    url: 'https://seu-dominio.com',
  },
  image: event.image_url,
}
```

#### 1.13 BreadcrumbList

```typescript
// Componente reutilizável
export function Breadcrumbs({ items }: { items: Array<{ name: string; url: string }> }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://seu-dominio.com${item.url}`,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav>
        {items.map((item, index) => (
          <span key={item.url}>
            <a href={item.url}>{item.name}</a>
            {index < items.length - 1 && ' / '}
          </span>
        ))}
      </nav>
    </>
  )
}
```

#### 1.14 Organization Schema

```typescript
// No root layout
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Movimento Correnteza',
  url: 'https://seu-dominio.com',
  logo: 'https://seu-dominio.com/logo.png',
  description: 'Movimento estudantil da UERN dedicado à educação e comunidade',
  sameAs: [
    'https://instagram.com/seu_instagram',
    'https://twitter.com/seu_twitter',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Support',
    email: 'contato@seu-dominio.com',
  },
}
```

### Sitemap

**`app/sitemap.ts`:**
```typescript
import { MetadataRoute } from 'next'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createServerSupabaseClient()

  // Páginas estáticas
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: 'https://seu-dominio.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://seu-dominio.com/blog',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: 'https://seu-dominio.com/guia',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://seu-dominio.com/eventos',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ]

  // Posts publicados
  const { data: posts } = await supabase
    .from('posts')
    .select('slug, updated_at')
    .eq('published', true)

  const postPages: MetadataRoute.Sitemap = (posts || []).map((post) => ({
    url: `https://seu-dominio.com/blog/${post.slug}`,
    lastModified: post.updated_at,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Artigos do guia
  const { data: articles } = await supabase
    .from('guide_articles')
    .select('slug, updated_at')
    .eq('published', true)

  const articlePages: MetadataRoute.Sitemap = (articles || []).map((article) => ({
    url: `https://seu-dominio.com/guia/${article.slug}`,
    lastModified: article.updated_at,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Eventos futuros
  const { data: events } = await supabase
    .from('events')
    .select('slug, updated_at, event_date')
    .gte('event_date', new Date().toISOString())

  const eventPages: MetadataRoute.Sitemap = (events || []).map((event) => ({
    url: `https://seu-dominio.com/eventos/${event.slug}`,
    lastModified: event.updated_at,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Categorias
  const { data: categories } = await supabase
    .from('categories')
    .select('slug')

  const categoryPages: MetadataRoute.Sitemap = (categories || []).map((cat) => ({
    url: `https://seu-dominio.com/categoria/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [
    ...staticPages,
    ...postPages,
    ...articlePages,
    ...eventPages,
    ...categoryPages,
  ]
}
```

### Robots.txt

**`app/robots.ts`:**
```typescript
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin', '/api', '/membros', '/perfil'],
        crawlDelay: 0,
      },
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api', '/membros', '/perfil', '/reset-password'],
        crawlDelay: 1,
      },
    ],
    sitemap: 'https://seu-dominio.com/sitemap.xml',
  }
}
```

---

## 2. Open Graph Image Generation

### Route Handler `app/api/og/route.tsx`

```typescript
import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const title = searchParams.get('title') || 'Guia do UERNIANO'
  const category = searchParams.get('category') || 'Blog'
  const type = searchParams.get('type') || 'post'

  // Carregar fontes
  const syne = await fetch(
    new URL('https://fonts.googleapis.com/css2?family=Syne:wght@600;700&display=swap')
  ).then((res) => res.arrayBuffer())

  return new ImageResponse(
    type === 'guide' ? (
      // Template para artigos do guia
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: 40,
          fontFamily: 'Syne',
        }}
      >
        <div
          style={{
            fontSize: 48,
            fontWeight: 700,
            color: '#fff',
            textAlign: 'center',
            maxWidth: 900,
            marginBottom: 20,
            lineHeight: 1.2,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 24,
            color: 'rgba(255,255,255,0.8)',
            marginBottom: 40,
          }}
        >
          Artigo do Guia
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <img
            src="https://seu-dominio.com/logo.png"
            width={40}
            height={40}
            style={{ borderRadius: 8 }}
          />
          <div style={{ fontSize: 18, color: '#fff' }}>
            Guia do UERNIANO
          </div>
        </div>
      </div>
    ) : (
      // Template padrão para posts
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: 40,
          fontFamily: 'Syne',
        }}
      >
        <div
          style={{
            display: 'flex',
            marginBottom: 20,
            padding: '8px 16px',
            background: 'rgba(255,255,255,0.2)',
            borderRadius: 8,
            color: '#fff',
            fontSize: 18,
            fontWeight: 600,
          }}
        >
          {category}
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: '#fff',
            textAlign: 'center',
            maxWidth: 900,
            marginBottom: 40,
            lineHeight: 1.2,
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <img
            src="https://seu-dominio.com/logo.png"
            width={50}
            height={50}
            style={{ borderRadius: 8 }}
          />
          <div style={{ fontSize: 20, color: '#fff', fontWeight: 600 }}>
            Guia do UERNIANO
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Syne',
          data: syne,
          style: 'normal',
          weight: 600,
        },
      ],
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    }
  )
}
```

---

## 3. Performance — Core Web Vitals

### Metas de Performance

| Métrica | Meta | Estratégia |
|---|---|---|
| **LCP** (Largest Contentful Paint) | < 2.5s | Otimizar imagens, remover render-blocking JS, prefetch recursos críticos |
| **CLS** (Cumulative Layout Shift) | < 0.1 | Dimensionar imagens/ads, evitar injetar conteúdo, usar `size-adjust` em fonts |
| **INP** (Interaction to Next Paint) | < 200ms | Code splitting, lazy loading, cache agressivo de JS |
| **FID** (First Input Delay) | < 100ms | Reduzir JS principal, usar requestIdleCallback |
| **TTFB** (Time to First Byte) | < 800ms | Usar CDN, ISR, revalidação eficiente |

### Estratégias de Rendering

```typescript
// app/page.tsx - Home: Static (SSG)
export const revalidate = 3600 // Revalidar a cada 1 hora

export default async function Home() {
  return <div>Home</div>
}
```

```typescript
// app/blog/[slug]/page.tsx - Blog posts: ISR
export const revalidate = 1800 // Revalidar a cada 30 min

export async function generateStaticParams() {
  // Gerar rotas para posts populares
  const supabase = createServerSupabaseClient()
  const { data: posts } = await supabase
    .from('posts')
    .select('slug')
    .eq('published', true)
    .order('views', { ascending: false })
    .limit(50)

  return (posts || []).map((post) => ({ slug: post.slug }))
}

export default async function BlogPostPage({ params }: Props) {
  return <article>Post</article>
}
```

```typescript
// app/membros/dashboard/page.tsx - Dashboard: Dynamic (SSR)
export const dynamic = 'force-dynamic' // Sempre re-renderizar

import { createServerSupabaseClient } from '@/lib/supabase/server'

export default async function DashboardPage() {
  const supabase = createServerSupabaseClient()
  const { data: user } = await supabase.auth.getUser()

  return <div>Dashboard de {user.email}</div>
}
```

```typescript
// Componente Client: apenas quando necessário
'use client'

import { useState, useEffect } from 'react'

export function InteractiveWidget() {
  return <div>Widget interativo</div>
}
```

### Next.js Image Optimization

**`next.config.js`:**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'seu-projeto.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
}

module.exports = nextConfig
```

**Componente de Imagem:**
```typescript
import Image from 'next/image'

export function PostCard({ post }: { post: Post }) {
  return (
    <div className="relative w-full aspect-video rounded-lg overflow-hidden">
      <Image
        src={post.image_url}
        alt={post.title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={false}
        placeholder="blur"
        blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23f0f0f0' width='400' height='300'/%3E%3C/svg%3E"
        className="object-cover"
      />
    </div>
  )
}
```

### Font Optimization

**`app/layout.tsx`:**
```typescript
import { Syne, Inter } from 'next/font/google'

const syne = Syne({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '600', '700'],
  variable: '--font-syne',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
  display: 'swap',
})

export default function RootLayout() {
  return (
    <html lang="pt-BR" className={`${syne.variable} ${inter.variable}`}>
      <body className="font-sans">Content</body>
    </html>
  )
}
```

**`globals.css`:**
```css
:root {
  --font-syne: var(--font-syne, 'Syne', sans-serif);
  --font-inter: var(--font-inter, 'Inter', sans-serif);
}

body {
  font-family: var(--font-inter);
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-syne);
}
```

### Code Splitting & Bundle

**Dynamic Import com Loading State:**
```typescript
'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const HeavyEditor = dynamic(() => import('@/components/Editor'), {
  loading: () => <div className="animate-pulse h-96 bg-gray-200 rounded" />,
})

export function EditorContainer() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <HeavyEditor />
    </Suspense>
  )
}
```

**Analisar Bundle:**
```bash
# Instalar
npm install -D @next/bundle-analyzer

# Usar em next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)

# Executar
ANALYZE=true npm run build
```

### Caching Strategy

**Static Assets (1 year):**
```typescript
// next.config.js
const nextConfig = {
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 5,
  },
  headers: async () => {
    return [
      {
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}
```

**ISR com Revalidation Tags:**
```typescript
// app/blog/[slug]/page.tsx
import { revalidateTag } from 'next/cache'

export const revalidate = 86400 // 24 horas

async function getBlogPost(slug: string) {
  const supabase = createServerSupabaseClient()

  const { data } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single()

  return data
}

// Invalidar quando post é editado
export async function updatePost(slug: string, data: any) {
  // ... atualizar no banco
  revalidateTag(`blog-${slug}`)
}
```

**API Route Caching:**
```typescript
// app/api/posts/route.ts
export async function GET(request: Request) {
  const supabase = createServerSupabaseClient()
  const { data } = await supabase.from('posts').select('*')

  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
    },
  })
}
```

---

## 4. Performance Mobile

### Otimizações Específicas

**Touch Event Handling:**
```css
/* Evitar delay de 300ms no mobile */
* {
  touch-action: manipulation;
}

/* Passive listeners para scroll performance */
div {
  overscroll-behavior-y: contain;
}
```

**Scroll Performance:**
```css
/* Para animações suaves */
.scroll-container {
  will-change: scroll-position;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
}

/* Para elementos que se transformam */
.animated {
  will-change: transform;
  transform: translateZ(0);
}
```

**Preventing Layout Shifts:**
```typescript
// Use aspect-ratio para imagens
<div className="relative w-full aspect-video">
  <Image
    src="image.jpg"
    fill
    className="object-cover"
  />
</div>

// Ou defina altura explícita
<Image
  src="image.jpg"
  width={800}
  height={600}
  alt="Descrição"
/>
```

**Reduzir JS Parse Time:**
```typescript
// next.config.js
const withNextIntl = require('next-intl/config')

// Usar modularização: não enviar tudo ao cliente
export const config = {
  matcher: ['/((?!_next).*)'],
}

// Dynamic imports para componentes grandes
const AdminPanel = dynamic(() => import('@/components/AdminPanel'), {
  loading: () => <Skeleton />,
  ssr: false, // Não renderizar no servidor se não precisar
})
```

### Network

**Resource Hints:**
```typescript
// app/layout.tsx
export default function RootLayout() {
  return (
    <html>
      <head>
        {/* Preconnect para Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* DNS Prefetch para Supabase */}
        <link rel="dns-prefetch" href="https://seu-projeto.supabase.co" />

        {/* Preload fonts críticas */}
        <link
          rel="preload"
          as="font"
          href="https://fonts.googleapis.com/css2?family=Syne:wght@700&display=swap"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>Content</body>
    </html>
  )
}
```

**Critical CSS:**
```typescript
// Inline CSS crítico no head
export default function RootLayout() {
  return (
    <html>
      <head>
        <style dangerouslySetInnerHTML={{ __html: `
          body { margin: 0; font-family: system-ui; }
          .header { background: #fff; }
        ` }} />
      </head>
      <body>Content</body>
    </html>
  )
}
```

**Lazy Loading Imagens:**
```typescript
<Image
  src={image}
  alt="Descrição"
  loading="lazy"
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

---

## 5. PWA & Offline

### Manifest

**`app/manifest.ts`:**
```typescript
import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Guia do UERNIANO',
    short_name: 'Guia UERN',
    description: 'O guia completo para estudantes da UERN',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#667eea',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
    screenshots: [
      {
        src: '/screenshot-1.png',
        sizes: '540x720',
        type: 'image/png',
        form_factor: 'narrow',
      },
    ],
    categories: ['education', 'productivity'],
  }
}
```

### Service Worker com `next-pwa`

**Instalar:**
```bash
npm install next-pwa
```

**`next.config.js`:**
```javascript
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
})

module.exports = withPWA(nextConfig)
```

**Service Worker Customizado (`public/service-worker.js`):**
```javascript
const CACHE_NAME = 'guia-uerniano-v1'
const urlsToCache = [
  '/',
  '/offline.html',
  '/static/fonts/syne.woff2',
  '/static/fonts/inter.woff2',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache)
    })
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})

// Cache-first para assets
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return

  const { pathname } = new URL(event.request.url)

  // Cache-first para assets estáticos
  if (pathname.startsWith('/static/') || pathname.endsWith('.woff2')) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request)
      })
    )
  }
  // Network-first para posts
  else if (pathname.startsWith('/blog/')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const cache = caches.open(CACHE_NAME)
          cache.then((c) => c.put(event.request, response.clone()))
          return response
        })
        .catch(() => {
          return caches.match(event.request)
        })
    )
  }
  // Stale-while-revalidate para guia
  else if (pathname.startsWith('/guia/')) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        const fetchPromise = fetch(event.request).then((networkResponse) => {
          const cache = caches.open(CACHE_NAME)
          cache.then((c) => c.put(event.request, networkResponse.clone()))
          return networkResponse
        })
        return response || fetchPromise
      })
    )
  }
})
```

---

## 6. Monitoramento

### Plausible Analytics (Privacy-first)

**Instalar:**
```bash
npm install next-plausible
```

**`app/layout.tsx`:**
```typescript
import PlausibleProvider from 'next-plausible'

export default function RootLayout() {
  return (
    <html>
      <head>
        <PlausibleProvider domain="seu-dominio.com" />
      </head>
      <body>Content</body>
    </html>
  )
}
```

### Vercel Analytics

**Instalar:**
```bash
npm install @vercel/analytics @vercel/web-vitals
```

**`app/layout.tsx`:**
```typescript
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function RootLayout() {
  return (
    <html>
      <body>
        Content
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
```

### Core Web Vitals Monitoramento

```typescript
// lib/web-vitals.ts
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

export function reportWebVitals(metric: any) {
  // Enviar para serviço de analytics
  console.log(metric)

  if (window.gtag) {
    window.gtag('event', metric.name, {
      value: Math.round(metric.value),
      event_category: 'Web Vitals',
      event_label: metric.id,
    })
  }
}

export function initWebVitals() {
  getCLS(reportWebVitals)
  getFID(reportWebVitals)
  getFCP(reportWebVitals)
  getLCP(reportWebVitals)
  getTTFB(reportWebVitals)
}
```

---

## 7. Checklist de SEO por Página

### Blog Post Checklist

- [ ] **Metadata**
  - [ ] Title em formato: "Post Title | Guia do UERNIANO" (max 60 chars)
  - [ ] Meta description (120-160 chars)
  - [ ] Canonical URL setado
  - [ ] og:image gerado dinamicamente

- [ ] **Conteúdo**
  - [ ] H1 único (o título)
  - [ ] Headers em ordem (H2, H3, sem pular)
  - [ ] Imagens com alt text descritivo
  - [ ] Pelo menos 1000 palavras
  - [ ] Links internos relevantes (3-5)
  - [ ] Links externos para autoridades

- [ ] **Structured Data**
  - [ ] BlogPosting schema implementado
  - [ ] Author name completo
  - [ ] Publishing date correto
  - [ ] Article body em itemprop="articleBody"

- [ ] **Performance**
  - [ ] LCP < 2.5s
  - [ ] CLS < 0.1
  - [ ] INP < 200ms
  - [ ] Lighthouse score > 90

- [ ] **Social**
  - [ ] og:title preenchido
  - [ ] og:description preenchido
  - [ ] og:image com tamanho correto (1200x630)
  - [ ] twitter:card definido

### Artigo do Guia Checklist

- [ ] **Metadata**
  - [ ] Title único
  - [ ] Description específica (não genérica)
  - [ ] Canonical com slug correto

- [ ] **Conteúdo**
  - [ ] H1 único
  - [ ] Sumário (Table of Contents)
  - [ ] Seções bem organizadas
  - [ ] Instruções passo a passo (HowTo schema)
  - [ ] Código de exemplo (se aplicável)
  - [ ] Links para posts relacionados

- [ ] **Structured Data**
  - [ ] HowTo schema com steps
  - [ ] BreadcrumbList
  - [ ] FAQSchema (se aplicável)

- [ ] **Performance**
  - [ ] Imagens otimizadas
  - [ ] Code samples lazy-loaded
  - [ ] ISR configurado

### Homepage Checklist

- [ ] **Metadata**
  - [ ] Title: "Guia do UERNIANO"
  - [ ] Description com keyword principal
  - [ ] Keywords relevantes

- [ ] **Estrutura**
  - [ ] Hero section com CTA
  - [ ] Posts recentes destacados
  - [ ] Categorias principais
  - [ ] Footer com links importantes

- [ ] **Structured Data**
  - [ ] Organization schema
  - [ ] WebSite with SearchAction schema
  - [ ] BreadcrumbList

- [ ] **Performance**
  - [ ] Lighthouse score > 90
  - [ ] Core Web Vitals em verde
  - [ ] Speed Insights OK

---

## 8. Lighthouse CI

**`lighthouserc.js`:**
```javascript
module.exports = {
  ci: {
    collect: {
      url: ['https://seu-dominio.com', 'https://seu-dominio.com/blog'],
      numberOfRuns: 3,
      headless: true,
      settings: {
        chromeFlags: ['--no-sandbox'],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.95 }],
        'first-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
      },
    },
  },
}
```

**GitHub Actions (`.github/workflows/lighthouse.yml`):**
```yaml
name: Lighthouse CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - run: npm ci
      - run: npm run build
      - run: npm install -g @lhci/cli@0.9.x
      
      - name: Run Lighthouse CI
        run: lhci autorun
        env:
          LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }}
```

---

## Resumo Final

### Checklist de Implementação

- [ ] Metadata dinâmica em todas as páginas
- [ ] JSON-LD schemas para todos os conteúdos
- [ ] Sitemap e robots.txt
- [ ] OG image generation funcional
- [ ] Next.js Image otimizado
- [ ] Fonts com display: swap
- [ ] Dynamic imports para componentes pesados
- [ ] ISR configurado corretamente
- [ ] Cache headers apropriados
- [ ] Service Worker para PWA
- [ ] Plausible/Vercel Analytics
- [ ] Core Web Vitals monitorados
- [ ] Lighthouse CI rodando no CI/CD
- [ ] Mobile performance otimizada
- [ ] Critical CSS inlined

### Metas de Performance

| Métrica | Target | Frequência |
|---|---|---|
| Lighthouse Performance | > 90 | Toda build |
| CLS | < 0.1 | Monitorado |
| LCP | < 2.5s | Monitorado |
| INP | < 200ms | Monitorado |
| TTFB | < 800ms | Monitorado |

Este guia fornece uma base sólida para um site performático e bem ranqueado no Google.

# Arquitetura Técnica: Guia do UERNIANO

**Stack Tecnológico Completo**  
**Versão:** 1.0  
**Data:** Fevereiro 2025  
**Baseado em:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Supabase

---

## Índice
1. [Tech Stack Completa](#1-tech-stack-completa)
2. [Justificativa de Cada Escolha](#2-justificativa-de-cada-escolha)
3. [Estrutura de Pastas](#3-estrutura-de-pastas)
4. [Convenções de Código](#4-convenções-de-código)
5. [Variáveis de Ambiente](#5-variáveis-de-ambiente)
6. [Configuração do Tailwind](#6-configuração-do-tailwind)
7. [Configuração do Supabase](#7-configuração-do-supabase)
8. [Padrões de Fetch de Dados](#8-padrões-de-fetch-de-dados)
9. [Setup Inicial](#9-setup-inicial-passo-a-passo)
10. [Scripts do package.json](#10-scripts-do-packagejson)
11. [Estratégia Git e Branching](#11-estratégia-git-e-branching)

---

## 1. Tech Stack Completa

### 1.1 Frontend Framework
```
Framework: Next.js 14 (App Router)
Language: TypeScript 5
CSS: Tailwind CSS v3 + CSS Custom Properties
HTTP Client: Fetch API (nativa) + React Query (TanStack Query)
Forms: React Hook Form v7 + Zod (validation)
State Management: Zustand (global) + React Query (server)
UI Components: Lucide React (icons)
Typography: Syne (Display) + Inter (Body)
```

### 1.2 Backend & Database
```
Database: Supabase (PostgreSQL)
Authentication: Supabase Auth (JWT)
File Storage: Supabase Storage
Real-time: Supabase Realtime (WebSocket)
API: Next.js Route Handlers + Server Actions
ORM: Supabase JS Client (tipo-safe com types gerados)
```

### 1.3 Testing
```
Unit/Integration: Vitest + React Testing Library
E2E: Playwright
Test Coverage: 70%+ (mínimo)
```

### 1.4 DevOps & Deployment
```
Deployment: Vercel
Git: GitHub
CI/CD: GitHub Actions
Monitoring: Sentry (errors) + Plausible (analytics)
Email: Resend
DNS: Cloudflare (optional, for CDN)
```

### 1.5 Libraries Principais

#### Frontend Core
```json
{
  "next": "^14.0.0",
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "typescript": "^5.3.0"
}
```

#### Styling & UI
```json
{
  "tailwindcss": "^3.4.0",
  "autoprefixer": "^10.4.0",
  "postcss": "^8.4.0",
  "lucide-react": "^0.292.0",
  "clsx": "^2.1.0",
  "tailwind-merge": "^2.2.0"
}
```

#### Forms & Validation
```json
{
  "react-hook-form": "^7.48.0",
  "zod": "^3.22.0",
  "@hookform/resolvers": "^3.3.0"
}
```

#### State & Data Fetching
```json
{
  "zustand": "^4.4.0",
  "@tanstack/react-query": "^5.28.0",
  "@supabase/supabase-js": "^2.38.0"
}
```

#### Utilities
```json
{
  "date-fns": "^2.30.0",
  "dompurify": "^3.0.0",
  "nanoid": "^4.0.0"
}
```

#### Development
```json
{
  "vitest": "^0.34.0",
  "@testing-library/react": "^14.1.0",
  "@testing-library/jest-dom": "^6.1.0",
  "playwright": "^1.40.0",
  "eslint": "^8.54.0",
  "prettier": "^3.1.0"
}
```

---

## 2. Justificativa de Cada Escolha

### 2.1 Next.js 14 com App Router
**Por quê?**
- ✅ React Server Components nativas (RSC) — melhor performance
- ✅ Route Handlers e Server Actions para backend sem API layer separado
- ✅ Vercel como default host — 0 overhead de deployment
- ✅ File-based routing — escalável e organizado
- ✅ Built-in image optimization (next/image)
- ✅ ISR (Incremental Static Regeneration) para conteúdo semi-estático
- ✅ Streaming de componentes (Suspense)
- ✅ Gera sitemap.xml e robots.txt automaticamente

**Alternativas rejeitadas:**
- Remix: Mais boilerplate, overkill para este projeto
- Vite + React: Precisa de um backend separado (complexidade)
- Astro: Menos ideal para apps interativas (comentários, eventos)

---

### 2.2 TypeScript 5
**Por quê?**
- ✅ Type safety para evitar bugs em runtime
- ✅ IntelliSense melhorado no VSCode
- ✅ Self-documenting code (tipos como documentação)
- ✅ Refatorações seguras
- ✅ Integração perfeita com Supabase (types-safe com tipos gerados)

**Configuração:**
- `strict: true` em `tsconfig.json`
- `noImplicitAny: true`
- `skipLibCheck: true` (performance)

---

### 2.3 Tailwind CSS + CSS Custom Properties
**Por quê?**
- ✅ Utility-first CSS — mantém styles próximas do HTML
- ✅ Atomic design — reutilização massiva
- ✅ Pequeno bundle size (com purge)
- ✅ Dark mode nativo
- ✅ CSS Custom Properties (CSS variables) para design system
- ✅ Performance — menos CSS gerado vs Bootstrap

**CSS Custom Properties:**
```css
/* Define cores do design system */
:root {
  --color-blue-uern: #003087;
  --color-blue-correnteza: #1A5FB4;
  --color-blue-bright: #2870D4;
  --color-red-fight: #E63946;
  --color-orange-energy: #F4732A;
}
```

**Alternativas rejeitadas:**
- Styled-components: Runtime overhead, menos optimizável
- Emotion: Similar ao styled-components
- CSS modules: Menos reutilizável que Tailwind

---

### 2.4 Supabase (PostgreSQL + Auth + Storage + Realtime)
**Por quê?**
- ✅ PostgreSQL robusto (relações, constraints)
- ✅ Authentication nativa com JWT (sem serviço externo)
- ✅ Storage integrado para imagens/PDFs
- ✅ Real-time com Realtime API (WebSocket)
- ✅ Row-Level Security (RLS) para autorização em BD
- ✅ Preço justo (gratuito até 2GB storage, queries ilimitadas)
- ✅ Managed service (não precisa se preocupar com ops)

**Setup:**
```typescript
// supabase/client.ts
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
```

**Alternativas rejeitadas:**
- Firebase: Modelo document-based (menos relacional)
- PlanetScale (MySQL): Menos RLS, sem auth integrada
- MongoDB: Sem RLS nativa, queries mais caras

---

### 2.5 React Hook Form + Zod
**Por quê?**
- ✅ React Hook Form: Minimal re-renders, performance ótima
- ✅ Zod: Type-safe schema validation, integração perfeita
- ✅ Juntos: Validação client-side + server-side automática
- ✅ DX excelente (resolvers)

**Exemplo:**
```typescript
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(8)
});

type FormData = z.infer<typeof schema>;

export function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  return (
    <form onSubmit={handleSubmit(async (data) => {
      // submit
    })}>
      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}
    </form>
  );
}
```

**Alternativas rejeitadas:**
- Formik: Mais boilerplate, mais re-renders
- Final Form: Menos popular, documentação inferior

---

### 2.6 Zustand (Global State) + React Query (Server State)
**Por quê?**
- ✅ Zustand: Minimalista, performático, sem boilerplate
- ✅ React Query: Caching, sincronização, deduplicação automática
- ✅ Separação clara: Client-side (Zustand) vs Server (React Query)

**Zustand para:**
- Theme (light/dark)
- UI state (modal aberto, sidebar colapsada)
- Filtered search

**React Query para:**
- Artigos do servidor
- Usuário autenticado
- Comentários de um artigo
- Eventos

**Setup Zustand:**
```typescript
// stores/ui.ts
import { create } from 'zustand';

interface UIStore {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  sidebarOpen: true,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen }))
}));
```

**Alternativas rejeitadas:**
- Redux: Muito boilerplate, overkill para este projeto
- Context API: Sem caching, performance ruim para dados dinâmicos
- MobX: Learning curve maior

---

### 2.7 Lucide React (Icons)
**Por quê?**
- ✅ 450+ ícones bem desenhados
- ✅ Importação tree-shakeable (bundle pequeno)
- ✅ Suporta customização com Tailwind classes
- ✅ SVG nativo (performance)

**Uso:**
```typescript
import { Menu, ChevronDown, Send } from 'lucide-react';

export function Header() {
  return (
    <nav className="flex items-center gap-2">
      <Menu className="w-6 h-6 text-blue-600" />
      <ChevronDown className="w-4 h-4" />
    </nav>
  );
}
```

**Alternativas rejeitadas:**
- Font Awesome: Mais pesado, menos opções
- Feather Icons: Menos ícones, menos manutenido

---

### 2.8 Syne (Display) + Inter (Body)
**Por quê?**
- ✅ Syne: Moderna, bold, perfeita para headers
- ✅ Inter: Legível, neutra, ideal para corpo de texto
- ✅ Google Fonts: Grátis, host confiável
- ✅ Ambas otimizadas (variable fonts)

**Import:**
```typescript
// app/layout.tsx
import { Syne, Inter } from 'next/font/google';

const syne = Syne({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });

export default function RootLayout() {
  return (
    <html>
      <body className={inter.className}>
        {/* inter para todo o corpo */}
      </body>
    </html>
  );
}
```

---

### 2.9 Vitest + Testing Library + Playwright
**Por quê?**
- ✅ Vitest: Rápido, compatível com Jest API, esma-modules nativa
- ✅ Testing Library: Test behavior não implementation
- ✅ Playwright: E2E cross-browser, parallelização rápida

**Cobertura esperada:**
- Unit: 70%+ (components, utils)
- Integration: 40%+ (API calls, user flows)
- E2E: Happy paths + edge cases críticos

---

### 2.10 Vercel (Deployment)
**Por quê?**
- ✅ Criadores do Next.js
- ✅ Auto-deployment em cada push
- ✅ Preview deployments em PRs
- ✅ Edge Functions (Middleware)
- ✅ Analytics integrado
- ✅ Serverless functions (se precisar)
- ✅ Free tier generoso

**Alternativas rejeitadas:**
- AWS: Complexo, overhead operacional
- DigitalOcean: Container-based, mais setup
- Railway: Mais caro que Vercel

---

### 2.11 Resend (Email)
**Por quê?**
- ✅ Email para devs (focused API)
- ✅ React Components no email
- ✅ Generous free tier
- ✅ Bom deliverability
- ✅ SDK TypeScript nativa

**Alternativas rejeitadas:**
- SendGrid: Mais caro, menos DX
- Mailgun: Similar ao SendGrid
- SMTP próprio: Overhead operacional

---

### 2.12 Plausible (Analytics)
**Por quê?**
- ✅ Privacy-first (não coleta IPs, user agents detalhados)
- ✅ GDPR compliant (não precisa de banner de cookies)
- ✅ Leve (1KB script)
- ✅ Dashboard simples e útil
- ✅ Pricing justo

**Alternativas rejeitadas:**
- Google Analytics: Coleta muitos dados, complexo
- Mixpanel: Overkill, pricing alto
- Fathom: Mais caro que Plausible

---

## 3. Estrutura de Pastas

```
guia-do-uerniano/
├── app/                          # App Router do Next.js
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page
│   ├── (auth)/                   # Grupo de rotas privadas
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── signup/
│   │   │   └── page.tsx
│   │   └── reset-password/
│   │       └── page.tsx
│   ├── (dashboard)/              # Rotas autenticadas
│   │   ├── layout.tsx            # Layout wrapper com sidebar
│   │   ├── dashboard/
│   │   │   └── page.tsx          # Dashboard home
│   │   ├── artigos/
│   │   │   ├── page.tsx          # Listar artigos
│   │   │   ├── [slug]/
│   │   │   │   └── page.tsx      # Detalhe artigo
│   │   │   └── novo/
│   │   │       └── page.tsx      # Criar artigo
│   │   ├── guia/
│   │   │   ├── page.tsx          # Listar seções
│   │   │   └── [id]/
│   │   │       └── page.tsx      # Editar seção
│   │   ├── membros/
│   │   │   ├── page.tsx          # Listar membros
│   │   │   └── [id]/
│   │   │       └── page.tsx      # Perfil do membro
│   │   ├── eventos/
│   │   │   ├── page.tsx          # Listar eventos
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx      # Detalhe evento
│   │   │   └── novo/
│   │   │       └── page.tsx      # Criar evento
│   │   ├── admin/
│   │   │   ├── layout.tsx        # Admin sidebar
│   │   │   ├── dashboard/
│   │   │   ├── usuarios/
│   │   │   ├── comentarios/
│   │   │   └── configuracoes/
│   │   └── perfil/
│   │       └── page.tsx          # Meu perfil
│   └── api/                      # Route Handlers
│       ├── auth/
│       │   ├── login/route.ts
│       │   ├── logout/route.ts
│       │   └── refresh/route.ts
│       ├── artigos/
│       │   ├── route.ts          # GET list, POST create
│       │   ├── [id]/route.ts     # GET, PUT, DELETE
│       │   └── [id]/comentarios/route.ts
│       ├── eventos/
│       │   ├── route.ts
│       │   ├── [id]/route.ts
│       │   └── [id]/inscrever/route.ts
│       ├── membros/
│       │   ├── route.ts
│       │   └── [id]/route.ts
│       ├── busca/
│       │   └── route.ts
│       ├── upload/
│       │   └── route.ts          # Upload de imagens
│       └── webhooks/
│           ├── supabase/route.ts
│           └── email/route.ts
├── components/                   # React components reutilizáveis
│   ├── ui/                       # Componentes de UI base
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   ├── Tabs.tsx
│   │   ├── Badge.tsx
│   │   ├── Select.tsx
│   │   └── Skeleton.tsx
│   ├── forms/                    # Form components
│   │   ├── LoginForm.tsx
│   │   ├── ArticleForm.tsx
│   │   ├── EventForm.tsx
│   │   └── CommentForm.tsx
│   ├── layout/                   # Layout components
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Footer.tsx
│   │   ├── MainLayout.tsx
│   │   └── AdminLayout.tsx
│   ├── sections/                 # Componentes de seções maiores
│   │   ├── HeroSection.tsx
│   │   ├── ArticleCard.tsx
│   │   ├── EventCard.tsx
│   │   ├── MemberCard.tsx
│   │   └── SearchBox.tsx
│   └── shared/                   # Componentes compartilhados
│       ├── LoadingSpinner.tsx
│       ├── ErrorBoundary.tsx
│       ├── Toast.tsx
│       └── Pagination.tsx
├── lib/                          # Utilitários e helpers
│   ├── supabase/
│   │   ├── client.ts             # Supabase client
│   │   ├── admin.ts              # Supabase admin (server-only)
│   │   ├── auth.ts               # Auth helpers
│   │   ├── queries.ts            # Common queries
│   │   └── mutations.ts           # Common mutations
│   ├── api/
│   │   ├── fetcher.ts            # Fetch wrapper com error handling
│   │   └── types.ts              # Tipos de resposta API
│   ├── hooks/
│   │   ├── useAuth.ts            # Hook para auth
│   │   ├── useUser.ts            # Hook para user data
│   │   ├── useArticles.ts        # Hook para artigos
│   │   ├── useEvents.ts          # Hook para eventos
│   │   └── useLocalStorage.ts    # Hook para localStorage
│   ├── utils/
│   │   ├── cn.ts                 # classname merge (clsx + tailwind)
│   │   ├── format.ts             # Formatadores (data, texto)
│   │   ├── validation.ts         # Zod schemas reutilizáveis
│   │   ├── sanitize.ts           # DOMPurify wrapper
│   │   └── constants.ts          # Constantes globais
│   └── types/
│       ├── index.ts              # Tipos globais
│       ├── api.ts                # Tipos de API
│       └── database.ts           # Tipos do Supabase (auto-generated)
├── stores/                       # Zustand stores
│   ├── ui.ts                     # UI state (theme, modal, etc)
│   ├── auth.ts                   # Auth state
│   ├── search.ts                 # Search filters
│   └── index.ts                  # Exporta tudo
├── public/                       # Assets estáticos
│   ├── logo.svg
│   ├── icons/
│   ├── images/
│   └── fonts/                    # Self-hosted fonts (optional)
├── styles/                       # CSS globals
│   ├── globals.css               # Reset, CSS vars, @font-face
│   └── animations.css            # Keyframes customizadas
├── config/                       # Configurações
│   ├── site.ts                   # Metadados de site
│   ├── navigation.ts             # Estrutura de navegação
│   └── tailwind/
│       └── theme.ts              # Tokens de design system
├── __tests__/                    # Testes
│   ├── unit/
│   │   ├── lib/
│   │   └── utils/
│   ├── integration/
│   │   └── api/
│   └── e2e/
│       ├── auth.spec.ts
│       ├── articles.spec.ts
│       └── events.spec.ts
├── .github/
│   └── workflows/
│       ├── ci.yml                # Tests + linting
│       └── deploy.yml            # Deploy to Vercel
├── supabase/
│   ├── migrations/               # SQL migrations
│   │   ├── 001_initial_schema.sql
│   │   ├── 002_add_columns.sql
│   │   └── ...
│   └── seed.sql                  # Dados iniciais
├── .env.example                  # Exemplo de variáveis
├── .env.local                    # Local (NÃO commitar)
├── .gitignore
├── tsconfig.json                 # TypeScript config
├── tailwind.config.ts            # Tailwind config
├── next.config.js                # Next.js config
├── postcss.config.js             # PostCSS config
├── package.json
├── package-lock.json
├── README.md
└── CONTRIBUTING.md
```

### 3.1 Explicação das Pastas Principais

**`app/`** - App Router do Next.js
- Estrutura de arquivos = estrutura de rotas
- Layouts inheritam de cima para baixo
- `(auth)` e `(dashboard)` são route groups (não afetam URL)

**`components/`** - Componentes React reutilizáveis
- `ui/` → componentes base (Button, Input, etc)
- `forms/` → componentes de formulário
- `layout/` → Header, Sidebar, Footer
- `sections/` → compostos complexos

**`lib/`** - Lógica e utilidades
- `supabase/` → clientes e queries
- `hooks/` → Custom hooks React
- `utils/` → funções auxiliares
- `types/` → TypeScript types

**`stores/`** - Estado global (Zustand)
- Separado por domínio (ui, auth, search)
- Não precisa de Context Provider boilerplate

**`supabase/migrations/`** - Versionamento de schema
- Cada alteração é um arquivo SQL separado
- Facilita rollback e colaboração

---

## 4. Convenções de Código

### 4.1 Nomenclatura de Arquivos

| Tipo | Padrão | Exemplo |
|------|--------|---------|
| Componentes | `PascalCase.tsx` | `ArticleCard.tsx`, `LoginForm.tsx` |
| Pages | `page.tsx` | Sempre `page.tsx` no App Router |
| Layouts | `layout.tsx` | Sempre `layout.tsx` |
| Hooks | `camelCase.ts` (starts with `use`) | `useArticles.ts`, `useAuth.ts` |
| Utils | `camelCase.ts` | `formatDate.ts`, `sanitize.ts` |
| Stores | `camelCase.ts` | `ui.ts`, `auth.ts` |
| API routes | `route.ts` | Sempre `route.ts` em App Router |
| Styles | `camelCase.css` | `animations.css`, `globals.css` |
| Config | `camelCase.ts` | `site.ts`, `navigation.ts` |
| Types | `camelCase.ts` ou `PascalCase.ts` | `database.ts`, `User.ts` |

### 4.2 Estrutura de Um Componente TypeScript + Tailwind

```typescript
// components/ui/Button.tsx
/**
 * Button component
 * 
 * Versatile button with multiple variants and sizes.
 * Uses Tailwind CSS for styling.
 * 
 * @example
 * <Button variant="primary" size="lg">Click me</Button>
 */

import { ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils/cn';

// Define variants using CVA (optional but recommended)
const buttonVariants = cva(
  // Base styles
  'inline-flex items-center justify-center font-medium transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: 'bg-blue-correnteza text-white hover:bg-blue-uern focus:ring-blue-correnteza',
        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-200',
        outline: 'border border-blue-correnteza text-blue-correnteza hover:bg-blue-correnteza hover:text-white',
        ghost: 'text-gray-700 hover:bg-gray-100',
      },
      size: {
        sm: 'px-3 py-2 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: ReactNode;
  isLoading?: boolean;
  icon?: ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, icon, children, disabled, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Spinner className="mr-2 h-4 w-4" />}
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  )
);

Button.displayName = 'Button';
```

### 4.3 Estrutura de Um Custom Hook

```typescript
// lib/hooks/useArticles.ts
'use client'; // Necessário em Client Components

import { useQuery, useMutation } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase/client';
import type { Article } from '@/lib/types/database';

interface UseArticlesOptions {
  limit?: number;
  offset?: number;
  category?: string;
}

/**
 * Hook para buscar artigos com cache automático
 */
export function useArticles(options?: UseArticlesOptions) {
  const { limit = 10, offset = 0, category } = options || {};

  // Query para listar artigos
  const query = useQuery({
    queryKey: ['articles', limit, offset, category],
    queryFn: async () => {
      let q = supabase
        .from('articles')
        .select('*')
        .eq('published', true)
        .order('published_at', { ascending: false });

      if (category) {
        q = q.eq('category', category);
      }

      const { data, error } = await q
        .range(offset, offset + limit - 1);

      if (error) throw error;
      return data as Article[];
    },
  });

  // Mutation para criar artigo
  const createMutation = useMutation({
    mutationFn: async (article: Omit<Article, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('articles')
        .insert([article])
        .select()
        .single();

      if (error) throw error;
      return data as Article;
    },
    onSuccess: () => {
      // Invalida cache para recarregar lista
      query.refetch();
    },
  });

  return {
    articles: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error,
    createArticle: createMutation.mutate,
    isCreating: createMutation.isPending,
  };
}
```

### 4.4 Estrutura de Um Server Component

```typescript
// app/(dashboard)/artigos/page.tsx
/**
 * Artigos List Page
 * 
 * Server Component que lista todos os artigos publicados.
 * Usa Server Actions para fetching de dados.
 */

import { Suspense } from 'react';
import { ArticleCard } from '@/components/sections/ArticleCard';
import { ArticleSkeleton } from '@/components/shared/Skeleton';
import { getArticles } from '@/lib/supabase/queries';

export default async function ArticlesPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Artigos do Correnteza</h1>
      
      <Suspense fallback={<ArticleListSkeleton />}>
        <ArticleList />
      </Suspense>
    </main>
  );
}

async function ArticleList() {
  const articles = await getArticles();

  if (articles.length === 0) {
    return <p className="text-gray-500">Nenhum artigo publicado ainda.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}

function ArticleListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <ArticleSkeleton key={i} />
      ))}
    </div>
  );
}
```

### 4.5 Ordem de Imports

```typescript
// Ordem recomendada:
// 1. React imports
import React, { useState, useCallback } from 'react';
import { type ReactNode } from 'react';

// 2. Next.js imports
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// 3. External libraries (ordem alfabética)
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import { clsx } from 'clsx';

// 4. Alias imports (@/) - componentes, libs, etc
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/lib/hooks/useAuth';
import { cn } from '@/lib/utils/cn';
import type { User } from '@/lib/types/database';

// 5. Relative imports (se necessário)
import { helper } from './helper';
import type { Props } from '../types';

export function MyComponent() {
  // ...
}
```

### 4.6 Padrões TypeScript

#### Interfaces vs Types
```typescript
// Use INTERFACE para contracts de objetos
interface User {
  id: string;
  name: string;
  email: string;
}

// Use TYPE para unions, tuples, primitivos
type Status = 'pending' | 'completed' | 'failed';
type Result = { success: true; data: User } | { success: false; error: string };
type Tuple = [string, number];

// Estenda interfaces quando possível
interface AdminUser extends User {
  role: 'admin' | 'moderator';
  permissions: string[];
}
```

#### Generics
```typescript
// Bom uso de generics para reutilização
interface ApiResponse<T> {
  data: T;
  error: string | null;
  timestamp: Date;
}

async function fetchData<T>(url: string): Promise<ApiResponse<T>> {
  const response = await fetch(url);
  return response.json();
}

// Uso
const userResponse = await fetchData<User>('/api/user');
const articlesResponse = await fetchData<Article[]>('/api/articles');
```

#### Utility Types
```typescript
// Omit - remover propriedades
type ArticleWithoutId = Omit<Article, 'id'>;

// Pick - selecionar propriedades
type ArticlePreview = Pick<Article, 'id' | 'title' | 'excerpt'>;

// Partial - tornar tudo opcional
type PartialArticle = Partial<Article>;

// Required - tornar tudo obrigatório
type RequiredArticle = Required<Article>;

// Record - objeto com chaves específicas
type RolePermissions = Record<'admin' | 'moderator' | 'user', string[]>;

// ReturnType - extrair tipo de retorno de função
type QueryResult = ReturnType<typeof useQuery>;
```

---

## 5. Variáveis de Ambiente

### 5.1 .env.example

```bash
# ===== SUPABASE =====
# URL pública do seu projeto Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co

# Chave anônima (segura expor publicamente)
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Chave de serviço (NUNCA expor publicamente, apenas server-side)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# ===== EMAIL (RESEND) =====
# API key do Resend para envio de emails
RESEND_API_KEY=re_xxxxxxxxxxxxx

# Email default do remetente
RESEND_FROM_EMAIL=noreply@guiadouerniano.com.br

# ===== ANALYTICS (PLAUSIBLE) =====
# Domain registrado no Plausible
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=guiadouerniano.com.br

# ===== SENTRY (OPTIONAL) =====
# DSN do Sentry para error tracking
SENTRY_DSN=https://xxxxxxxxxxxxx@xxxxx.ingest.sentry.io/xxxxx

# Ambiente
SENTRY_ENVIRONMENT=production

# ===== APP CONFIG =====
# URL da aplicação (para links absolutos)
NEXT_PUBLIC_APP_URL=https://guiadouerniano.com.br

# Ambiente: development, staging, production
NODE_ENV=production

# ===== INTEGRATIONS =====
# Webhook URL do WhatsApp (para notificações)
WHATSAPP_WEBHOOK_URL=https://api.whatsapp.com/...

# Token do Discord Bot
DISCORD_BOT_TOKEN=xxxxxxxxxxxxx

# ID do servidor Discord
DISCORD_GUILD_ID=123456789
```

### 5.2 Carregamento no Código

```typescript
// lib/utils/env.ts
/**
 * Validação de variáveis de ambiente no runtime
 */

const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
] as const;

const optionalEnvVars = [
  'RESEND_API_KEY',
  'SENTRY_DSN',
  'DISCORD_BOT_TOKEN',
] as const;

function getEnv<K extends string>(key: K): string {
  const value = process.env[key];
  
  if (!value && requiredEnvVars.includes(key as any)) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  
  return value || '';
}

export const env = {
  // Supabase
  supabaseUrl: getEnv('NEXT_PUBLIC_SUPABASE_URL'),
  supabaseAnonKey: getEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',

  // Email
  resendApiKey: process.env.RESEND_API_KEY || '',
  resendFromEmail: getEnv('RESEND_FROM_EMAIL'),

  // Analytics
  plausibleDomain: getEnv('NEXT_PUBLIC_PLAUSIBLE_DOMAIN'),
  sentryDsn: process.env.SENTRY_DSN || '',
  
  // App
  appUrl: getEnv('NEXT_PUBLIC_APP_URL'),
  nodeEnv: (process.env.NODE_ENV || 'development') as 'development' | 'staging' | 'production',
};
```

---

## 6. Configuração do Tailwind

### 6.1 tailwind.config.ts

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // ===== CORES DO DESIGN SYSTEM =====
      colors: {
        // Azuis UERN
        'blue': {
          uern: '#003087',      // Azul oficial UERN
          correnteza: '#1A5FB4', // Azul Correnteza
          bright: '#2870D4',     // Azul Brilhante
          light: '#E8F0FF',      // Azul claro para backgrounds
        },
        // Vermelhos
        'red': {
          fight: '#E63946',      // Vermelho de luta
          light: '#F5E4E6',      // Vermelho claro
        },
        // Laranjas
        'orange': {
          energy: '#F4732A',     // Laranja de energia
          light: '#FEE9DE',      // Laranja claro
        },
        // Grays (neutros)
        'gray': {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
      },

      // ===== TIPOGRAFIA =====
      fontFamily: {
        // Syne para display (headings)
        display: ['var(--font-syne)', 'sans-serif'],
        // Inter para body text
        body: ['var(--font-inter)', 'sans-serif'],
      },
      fontSize: {
        // Display sizes (com Syne)
        'display-lg': ['3.5rem', { lineHeight: '1.1', fontWeight: '700' }],
        'display-md': ['2.5rem', { lineHeight: '1.2', fontWeight: '700' }],
        'display-sm': ['2rem', { lineHeight: '1.2', fontWeight: '700' }],
        // Heading sizes
        'h1': ['2rem', { lineHeight: '1.3', fontWeight: '600' }],
        'h2': ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }],
        'h3': ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }],
        'h4': ['1.125rem', { lineHeight: '1.4', fontWeight: '600' }],
        // Body sizes
        'body-lg': ['1.125rem', { lineHeight: '1.6' }],
        'body-base': ['1rem', { lineHeight: '1.6' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5' }],
        'body-xs': ['0.75rem', { lineHeight: '1.5' }],
      },

      // ===== ESPAÇAMENTO =====
      spacing: {
        // Adiciona valores extras (Tailwind já tem 0-96)
        '128': '32rem',
        '144': '36rem',
      },

      // ===== BORDER RADIUS =====
      borderRadius: {
        'xs': '0.25rem',    // 4px
        'sm': '0.375rem',   // 6px
        'base': '0.5rem',   // 8px
        'md': '0.75rem',    // 12px
        'lg': '1rem',       // 16px
        'xl': '1.5rem',     // 24px
        '2xl': '2rem',      // 32px
        'full': '9999px',   // Fully rounded
      },

      // ===== SHADOWS =====
      boxShadow: {
        'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'base': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'elevation': '0 10px 25px 0 rgba(0, 48, 135, 0.15)', // UERN blue shadow
      },

      // ===== ANIMAÇÕES =====
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },

      // ===== TRANSITIONS =====
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
        '500': '500ms',
      },

      // ===== Z-INDEX =====
      zIndex: {
        'dropdown': '1000',
        'sticky': '1020',
        'fixed': '1030',
        'modal-backdrop': '1040',
        'modal': '1050',
        'popover': '1060',
        'tooltip': '1070',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),      // Melhora estilo de forms
    require('@tailwindcss/typography'), // Estilo para prosa
    require('@tailwindcss/aspect-ratio'), // Aspect ratio utilities
  ],
};

export default config;
```

### 6.2 globals.css

```css
/* styles/globals.css */

/* ===== CSS CUSTOM PROPERTIES (Design System) ===== */
:root {
  /* Colors */
  --color-blue-uern: #003087;
  --color-blue-correnteza: #1A5FB4;
  --color-blue-bright: #2870D4;
  --color-blue-light: #E8F0FF;
  --color-red-fight: #E63946;
  --color-red-light: #F5E4E6;
  --color-orange-energy: #F4732A;
  --color-orange-light: #FEE9DE;

  /* Spacing */
  --space-xs: 0.5rem;
  --space-sm: 0.75rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
  --space-2xl: 3rem;

  /* Border Radius */
  --radius-sm: 0.375rem;
  --radius-md: 0.75rem;
  --radius-lg: 1rem;
  --radius-xl: 1.5rem;

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);

  /* Transitions */
  --transition-fast: 150ms ease-in-out;
  --transition-base: 200ms ease-in-out;
  --transition-slow: 300ms ease-in-out;
}

/* ===== RESET & BASE STYLES ===== */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: #fff;
  color: #1f2937;
  font-family: var(--font-inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* ===== HEADINGS COM SYNE =====*/
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-syne, sans-serif);
  font-weight: 700;
  line-height: 1.2;
}

h1 { font-size: 2rem; }
h2 { font-size: 1.5rem; }
h3 { font-size: 1.25rem; }
h4 { font-size: 1.125rem; }

/* ===== LINKS =====*/
a {
  color: var(--color-blue-correnteza);
  text-decoration: none;
  transition: color var(--transition-base);
}

a:hover {
  color: var(--color-blue-uern);
  text-decoration: underline;
}

/* ===== FORMS =====*/
input,
textarea,
select {
  font-family: inherit;
  font-size: 1rem;
  line-height: 1.5;
  border: 1px solid #d1d5db;
  border-radius: var(--radius-md);
  padding: 0.75rem;
  transition: border-color var(--transition-base);
}

input:focus,
textarea:focus,
select:focus {
  outline: none;
  border-color: var(--color-blue-correnteza);
  box-shadow: 0 0 0 3px rgba(26, 95, 180, 0.1);
}

/* ===== CODE BLOCKS =====*/
code {
  background-color: #f3f4f6;
  color: #e63946;
  padding: 0.2em 0.4em;
  border-radius: 0.25rem;
  font-family: 'Fira Code', 'Courier New', monospace;
  font-size: 0.9em;
}

pre {
  background-color: #1f2937;
  color: #e5e7eb;
  padding: 1rem;
  border-radius: var(--radius-lg);
  overflow-x: auto;
  margin: 1rem 0;
}

pre code {
  background-color: transparent;
  color: inherit;
  padding: 0;
}

/* ===== SCROLLBAR CUSTOMIZADO =====*/
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* ===== PRINT STYLES =====*/
@media print {
  body {
    background: white;
  }
  
  a {
    text-decoration: underline;
  }
}

/* ===== ACCESSIBILITY =====*/
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

@media (prefers-color-scheme: dark) {
  body {
    background-color: #0f172a;
    color: #e2e8f0;
  }

  input,
  textarea,
  select {
    background-color: #1e293b;
    color: #e2e8f0;
    border-color: #334155;
  }
}
```

---

## 7. Configuração do Supabase

### 7.1 Schema Overview

```sql
-- Schema do Supabase para Guia do UERNIANO

-- ===== USERS & AUTH =====
-- (Gerenciado automaticamente pelo Supabase Auth)

-- Tabela de perfil de usuário (complemento)
create table public.profiles (
  id uuid references auth.users not null primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now()),
  
  -- Dados pessoais
  name text,
  bio text,
  avatar_url text,
  pronouns text, -- ex: "ele/dele", "ela/dela"
  
  -- Organização
  role text not null default 'user', -- 'user', 'member', 'editor', 'moderator', 'admin'
  nucleos text[], -- array de núcleos (ex: ARRAY['coordenação', 'eventos'])
  
  -- Configurações
  email_notifications boolean default true,
  newsletter_subscribed boolean default false,
  is_active boolean default true,
  
  constraint role_check check (role in ('user', 'member', 'editor', 'moderator', 'admin'))
);

-- ===== ARTIGOS =====
create table public.articles (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now()),
  published_at timestamp with time zone,
  
  -- Conteúdo
  title text not null,
  slug text not null unique,
  excerpt text,
  content text not null, -- Markdown ou HTML
  cover_image_url text,
  
  -- Metadados
  author_id uuid references public.profiles not null,
  category text not null, -- 'análise', 'tutorial', 'notícia', 'relato'
  tags text[],
  published boolean default false,
  featured boolean default false,
  
  -- SEO
  meta_description text,
  meta_keywords text[],
  
  -- Contador
  views_count integer default 0
);

-- ===== COMENTÁRIOS =====
create table public.comments (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now()),
  
  -- Relações
  article_id uuid references public.articles on delete cascade not null,
  author_id uuid references public.profiles on delete cascade not null,
  parent_id uuid references public.comments on delete cascade, -- Para replies
  
  -- Conteúdo
  content text not null,
  
  -- Moderação
  approved boolean default true,
  hidden boolean default false
);

-- ===== EVENTOS =====
create table public.events (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now()),
  
  -- Informações
  title text not null,
  slug text not null unique,
  description text,
  
  -- Timing
  starts_at timestamp with time zone not null,
  ends_at timestamp with time zone not null,
  
  -- Local
  location text,
  location_url text, -- Google Maps ou similar
  
  -- Organização
  organizers_ids uuid[] not null, -- array de user IDs
  category text, -- 'encontro', 'atividade', 'palestra', 'protesto'
  
  -- Limite
  max_attendees integer,
  
  -- Media
  cover_image_url text,
  stream_url text, -- Link de transmissão ao vivo
  
  -- Visibilidade
  published boolean default false
);

-- ===== INSCRIÇÕES DE EVENTOS =====
create table public.event_registrations (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  
  -- Relações
  event_id uuid references public.events on delete cascade not null,
  user_id uuid references public.profiles on delete cascade not null,
  
  -- Status
  status text default 'registered', -- 'registered', 'attended', 'cancelled'
  
  unique(event_id, user_id)
);

-- ===== GUIA SECTIONS =====
create table public.guide_sections (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now()),
  
  -- Info
  title text not null,
  slug text not null unique,
  content text not null, -- Markdown
  order_index integer not null,
  
  -- Media
  cover_image_url text,
  
  -- Autor
  updated_by_id uuid references public.profiles,
  
  -- Metadata
  version integer default 1
);

-- ===== FAVORITOS =====
create table public.saved_articles (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  
  -- Relações
  user_id uuid references public.profiles on delete cascade not null,
  article_id uuid references public.articles on delete cascade not null,
  
  unique(user_id, article_id)
);

-- ===== AUDITORIA =====
create table public.audit_logs (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  
  -- O que aconteceu
  action text not null, -- 'create', 'update', 'delete', 'login'
  resource_type text not null, -- 'article', 'event', 'comment'
  resource_id text,
  
  -- Quem fez
  user_id uuid references public.profiles,
  
  -- Context
  ip_address text,
  user_agent text
);

-- ===== ÍNDICES PARA PERFORMANCE =====
create index articles_author_id_idx on articles(author_id);
create index articles_published_idx on articles(published, published_at desc);
create index articles_category_idx on articles(category);
create index comments_article_id_idx on comments(article_id);
create index comments_author_id_idx on comments(author_id);
create index events_starts_at_idx on events(starts_at);
create index event_registrations_user_id_idx on event_registrations(user_id);
create index saved_articles_user_id_idx on saved_articles(user_id);

-- ===== ROW LEVEL SECURITY =====
-- Users podem ver seu próprio perfil e perfis de membros
create policy "Users can view own profile"
  on profiles for select
  using (auth.uid() = id);

create policy "Users can view public member profiles"
  on profiles for select
  using (role != 'user');

-- Articles: qualquer um pode ler publicados
create policy "Anyone can view published articles"
  on articles for select
  using (published = true or auth.uid() = author_id);

-- Editors podem criar/editar artigos
create policy "Editors can create articles"
  on articles for insert
  with check (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
      and profiles.role in ('editor', 'admin')
    )
  );
```

### 7.2 Conectar no Código

```typescript
// lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr';
import { env } from '@/lib/utils/env';

export const supabase = createBrowserClient(
  env.supabaseUrl,
  env.supabaseAnonKey
);
```

```typescript
// lib/supabase/admin.ts (Server-only)
import 'server-only';
import { createClient } from '@supabase/supabase-js';
import { env } from '@/lib/utils/env';

export const supabaseAdmin = createClient(
  env.supabaseUrl,
  env.supabaseServiceRoleKey,
  {
    auth: { persistSession: false },
  }
);
```

---

## 8. Padrões de Fetch de Dados

### 8.1 Server Components (RSC) — Preferido para dados estáticos

```typescript
// app/(dashboard)/artigos/page.tsx
import { getArticles } from '@/lib/supabase/queries';

export default async function ArticlesPage() {
  // Executa no servidor
  const articles = await getArticles();

  return (
    <main>
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </main>
  );
}

// lib/supabase/queries.ts
export async function getArticles() {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('published', true)
    .order('published_at', { ascending: false });

  if (error) throw error;
  return data;
}
```

**Vantagens:**
- Zero JavaScript no cliente
- Dados do servidor não expostos
- Melhor SEO
- Cache automático

---

### 8.2 Server Actions — Para mutations (POST, PUT, DELETE)

```typescript
// lib/actions/articles.ts
'use server'; // Marca como Server Action

import { revalidatePath } from 'next/cache';
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function createArticle(formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;

  const { data, error } = await supabaseAdmin
    .from('articles')
    .insert([{ title, content }])
    .select()
    .single();

  if (error) throw error;

  // Revalidate cache
  revalidatePath('/artigos');
  
  return data;
}

// app/(dashboard)/artigos/novo/page.tsx
import { createArticle } from '@/lib/actions/articles';

export default function NewArticlePage() {
  return (
    <form action={createArticle}>
      <input type="text" name="title" required />
      <textarea name="content" required />
      <button type="submit">Criar</button>
    </form>
  );
}
```

**Vantagens:**
- Sem API route boilerplate
- Typesafe
- Revalidação automática
- Trabalha com forms HTML

---

### 8.3 Client Components com React Query — Para dados em tempo real

```typescript
// components/CommentsSection.tsx
'use client';

import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase/client';

interface Comment {
  id: string;
  content: string;
  author: { name: string; avatar_url: string };
}

export function CommentsSection({ articleId }: { articleId: string }) {
  // Busca automática, cache, refetch em intervalo
  const { data: comments, isLoading } = useQuery({
    queryKey: ['comments', articleId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('comments')
        .select('*, author:profiles(*)')
        .eq('article_id', articleId)
        .eq('approved', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Comment[];
    },
  });

  if (isLoading) return <div>Carregando comentários...</div>;

  return (
    <div>
      {comments?.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
```

**Vantagens:**
- Auto-refetch
- Cache inteligente
- Retry automático
- Background sync

---

### 8.4 Real-time com Supabase

```typescript
// hooks/useRealtimeComments.ts
'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import type { Comment } from '@/lib/types/database';

export function useRealtimeComments(articleId: string) {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    // Subscribe to changes
    const subscription = supabase
      .channel(`comments:${articleId}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'comments', filter: `article_id=eq.${articleId}` },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setComments((prev) => [payload.new, ...prev]);
          } else if (payload.eventType === 'DELETE') {
            setComments((prev) => prev.filter((c) => c.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [articleId]);

  return comments;
}
```

---

## 9. Setup Inicial Passo a Passo

### 9.1 Criar o projeto

```bash
# 1. Clone o repositório ou crie um novo
npx create-next-app@14 guia-do-uerniano \
  --typescript \
  --tailwind \
  --app \
  --import-alias '@/*'

cd guia-do-uerniano

# 2. Instale dependências principais
npm install \
  @supabase/supabase-js \
  @supabase/ssr \
  react-hook-form \
  zod \
  @hookform/resolvers \
  @tanstack/react-query \
  zustand \
  lucide-react \
  dompurify \
  date-fns \
  clsx \
  tailwind-merge

# 3. Instale dev dependencies
npm install -D \
  vitest \
  @testing-library/react \
  @testing-library/jest-dom \
  @vitest/ui \
  playwright \
  @types/dompurify \
  eslint-config-next \
  prettier

# 4. Crie as pastas estruturais
mkdir -p {app/{api,\(auth\),\(dashboard\)},components/{ui,forms,layout,sections,shared},lib/{hooks,utils,supabase,types},stores,styles,config,supabase/migrations,__tests__/{unit,integration,e2e}}
```

### 9.2 Configuração do Supabase

```bash
# 1. Crie uma conta em supabase.com
# 2. Crie um novo projeto
# 3. Copie as credenciais e crie .env.local

# 4. Instale Supabase CLI (opcional, para migrations locais)
npm install -D supabase

# 5. Link seu projeto (opcional)
npx supabase link --project-ref your-project-ref
```

### 9.3 Configuração de git

```bash
# Crie .gitignore
echo "
node_modules/
.next/
.env.local
.env
.DS_Store
dist/
build/
.vercel/
coverage/
" >> .gitignore

# Initialize git
git init
git add .
git commit -m "initial commit"
```

### 9.4 Configuração do TypeScript

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "preserve",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noImplicitReturns": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### 9.5 Configuração do ESLint

```javascript
// .eslintrc.json
{
  "extends": "next/core-web-vitals",
  "rules": {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "@next/next/no-html-link-for-pages": "off"
  }
}
```

### 9.6 Configuração do Prettier

```javascript
// prettier.config.js
module.exports = {
  semi: true,
  singleQuote: true,
  trailingComma: 'es5',
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  arrowParens: 'always',
};
```

---

## 10. Scripts do package.json

```json
{
  "scripts": {
    // Development
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    
    // Testing
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    
    // Linting & Formatting
    "lint": "eslint . --ext .ts,.tsx",
    "lint:fix": "eslint . --ext .ts,.tsx --fix",
    "format": "prettier --write \"**/*.{ts,tsx,md,json}\"",
    "format:check": "prettier --check \"**/*.{ts,tsx,md,json}\"",
    "type-check": "tsc --noEmit",
    
    // Database (Supabase)
    "db:migrate": "supabase db push",
    "db:pull": "supabase db pull",
    "db:reset": "supabase db reset",
    
    // Build & Deploy
    "prebuild": "npm run type-check && npm run lint && npm run test",
    "analyze": "ANALYZE=true next build",
    
    // CI/CD (GitHub Actions)
    "ci": "npm run lint && npm run type-check && npm run test && npm run build"
  }
}
```

---

## 11. Estratégia Git e Branching

### 11.1 Gitflow Simplificado

```
main (production)
├── Sempre estável
└── Deploy automático em Vercel

develop (staging)
├── Feature PRs são feitas aqui
└── Deploy automático em preview

feature/* (feature branches)
├── Criadas de develop
├── Uma feature por branch
└── PR para develop após review

bugfix/* (hotfixes)
├── Criadas de develop
├── Correções críticas
└── PR para develop após review
```

### 11.2 Convenção de Commits

```bash
# Use Conventional Commits
feat: adiciona seção de eventos ao guia
fix: corrige bug na busca de artigos
refactor: reorganiza estrutura de componentes
docs: atualiza README
test: adiciona testes para ArticleCard
chore: atualiza dependências
perf: otimiza query de artigos

# Com scope (opcional)
feat(api): adiciona endpoint /artigos/popular
fix(ui): corrige spacing no header
```

### 11.3 Exemplo de Feature Branch

```bash
# 1. Atualize develop
git checkout develop
git pull origin develop

# 2. Crie uma feature branch
git checkout -b feature/article-comments

# 3. Trabalhe na feature
# ... edite arquivos ...

# 4. Commit com mensagens claras
git add .
git commit -m "feat: adiciona sistema de comentários em artigos"

# 5. Envie para remote
git push origin feature/article-comments

# 6. Crie um PR no GitHub (interface web)
# - Title: "Feature: Adiciona comentários em artigos"
# - Description: explique a feature, requisitos atendidos
# - Link PRD if relevant
# - Cite usuarios que podem revisar

# 7. Após aprovação e merge
git checkout develop
git pull origin develop
git branch -d feature/article-comments
```

### 11.4 Pre-commit Hooks (Husky + Lint-Staged)

```bash
# Instale
npm install -D husky lint-staged

# Setup Husky
npx husky install

# Crie hook de pre-commit
npx husky add .husky/pre-commit "npx lint-staged"

# Configure lint-staged no package.json
{
  "lint-staged": {
    "*.{ts,tsx}": "eslint --fix",
    "*.{ts,tsx,md,json}": "prettier --write"
  }
}
```

---

## 12. Próximos Passos

1. **Instale e teste o setup** — certifique-se que tudo funciona localmente
2. **Crie componentes base** — Button, Input, Card, etc
3. **Configure Supabase** — crie tabelas, RLS policies
4. **Implemente autenticação** — login, signup, logout
5. **Crie primeira página** — landing page ou dashboard
6. **Setup CI/CD** — GitHub Actions para tests e deploy
7. **Deploy no Vercel** — conecte repo e deploy automático

---

**Documento completo. Uso como referência para construir o site.**
**Próxima atualização: pós-MVP (feedback de usuários)**


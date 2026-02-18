# 📚 Índice da Documentação — Guia do UERNIANO
### Referência completa para construção do site com Claude Code

---

## Visão Geral

O **Guia do UERNIANO** é um portal para estudantes da UERN criado pelo Movimento Correnteza. Esta pasta contém toda a documentação necessária para construir o site do zero usando Claude Code.

**Stack:** Next.js 14 · TypeScript · Tailwind CSS · Supabase · Vercel

---

## Mapa da Documentação

```
📁 Guia do UERNIANO/
│
├── 📄 CLAUDE.md                    ← LEIA PRIMEIRO (entry point do Claude Code)
├── 📄 00-INDICE.md                 ← Este arquivo
│
├── 🎨 DESIGN & UX
│   ├── ui-ux-identidade-visual.md  ← Design system completo + tokens CSS
│   └── 02-spec-paginas-ux.md       ← UX detalhado de cada uma das 14 páginas
│
├── 🏗️ PRODUTO & ARQUITETURA
│   ├── 00-PRD-visao-geral.md       ← PRD, personas, user stories, roadmap
│   └── 01-arquitetura-tecnica.md   ← Stack, estrutura de pastas, convenções
│
├── ⚛️ FRONTEND
│   └── 03-componentes.md           ← 56 componentes React com código completo
│
├── 🗄️ BACKEND & DADOS
│   ├── 04-banco-dados-schema.md    ← Schema SQL, RLS, triggers, types TS
│   └── 05-api-endpoints.md         ← Server Actions, queries, Route Handlers
│
├── 🔐 AUTH & MEMBROS
│   └── 06-autenticacao-membros.md  ← Fluxos de auth, roles, área de membros
│
└── 🚀 SEO & PERFORMANCE
    └── 07-seo-performance.md       ← Metadata, structured data, Core Web Vitals
```

---

## Por onde começar (ordem recomendada)

### Fase 0 — Setup (Sprint 1)
1. Ler `CLAUDE.md` e `01-arquitetura-tecnica.md`
2. Criar projeto Next.js com a estrutura de pastas documentada
3. Configurar Tailwind com os tokens do design system
4. Configurar Supabase e rodar as migrations de `04-banco-dados-schema.md`
5. Configurar autenticação seguindo `06-autenticacao-membros.md`

### Fase 1 — Componentes Base (Sprint 2)
1. Ler `ui-ux-identidade-visual.md` e `03-componentes.md`
2. Implementar todos os componentes primitivos (Button, Input, Badge, etc.)
3. Implementar componentes de layout (TopAppBar, BottomNavBar, Navbar, Footer)
4. Implementar componentes de feedback (Toast, Skeleton, EmptyState)

### Fase 2 — Páginas Públicas (Sprints 3-5)
1. Ler `02-spec-paginas-ux.md`
2. Implementar Home (/)
3. Implementar Blog (/blog e /blog/[slug])
4. Implementar Guia (/guia, /guia/[cat], /guia/[cat]/[slug])
5. Implementar Busca (/busca)
6. Implementar Eventos (/eventos, /eventos/[slug])

### Fase 3 — Auth & Membros (Sprint 6)
1. Ler `06-autenticacao-membros.md`
2. Implementar /login com email e Google OAuth
3. Implementar middleware de proteção de rotas
4. Implementar /membros (dashboard)
5. Implementar /membros/materiais

### Fase 4 — SEO & Performance (Sprint 7)
1. Ler `07-seo-performance.md`
2. Implementar generateMetadata por página
3. Implementar structured data (JSON-LD)
4. Gerar sitemap dinâmico
5. Configurar OG image generation
6. Otimizar Core Web Vitals

---

## Resumo das páginas

| Página | Tipo | Auth | Spec |
|---|---|---|---|
| `/` | Pública | Não | `02-spec-paginas-ux.md` §1 |
| `/guia` | Pública | Não | `02-spec-paginas-ux.md` §2 |
| `/guia/[categoria]` | Pública | Não | `02-spec-paginas-ux.md` §3 |
| `/guia/[categoria]/[slug]` | Pública | Não | `02-spec-paginas-ux.md` §4 |
| `/blog` | Pública | Não | `02-spec-paginas-ux.md` §5 |
| `/blog/[slug]` | Pública | Não | `02-spec-paginas-ux.md` §6 |
| `/movimento` | Pública | Não | `02-spec-paginas-ux.md` §7 |
| `/eventos` | Pública | Não | `02-spec-paginas-ux.md` §8 |
| `/eventos/[slug]` | Pública | Não | `02-spec-paginas-ux.md` §9 |
| `/busca` | Pública | Não | `02-spec-paginas-ux.md` §10 |
| `/login` | Pública | Redirect se logado | `02-spec-paginas-ux.md` §11 |
| `/membros` | Protegida | member+ | `02-spec-paginas-ux.md` §12 |
| `/membros/materiais` | Protegida | member+ | `02-spec-paginas-ux.md` §13 |
| `/sobre` | Pública | Não | `02-spec-paginas-ux.md` §14 |

---

## Resumo dos componentes (56 total)

**Layout (7):** TopAppBar · BottomNavBar · Navbar · Footer · PageLayout · Container · Section

**Primitivos (12):** Button · Badge · Input · Textarea · Select · Checkbox · Radio · Switch · Avatar · Chip · Divider · Skeleton

**Feedback (7):** Toast · Alert · Modal · BottomSheet · Spinner · EmptyState · ErrorBoundary

**Navegação (5):** Breadcrumb · Tabs · FilterChips · Pagination · SearchBar

**Conteúdo (10):** ArticleCard · GuideCard · EventCard · MaterialCard · CategoryCard · FeaturedCard · QuickAccessCard · AuthorInfo · ReadingTime · TableOfContents

**Tipografia (3):** Heading · Callout · RichText

**Formulários (6):** SearchForm · LoginForm · RegisterForm · FeedbackForm · ReportForm · CommentForm

**Específicos (6):** CategoryGrid · HorizontalScroll · ProgressBar · ShareButtons · ThemeToggle · MemberCard

---

## Resumo do banco de dados (12 tabelas)

`profiles` · `categories` · `posts` · `guide_articles` · `tags` · `post_tags` · `events` · `comments` · `post_reactions` · `materials` · `post_reports` · `notifications`

---

## Paleta de cores resumida

| Token | Hex | Uso |
|---|---|---|
| Azul UERN | `#003087` | Logotipo, headers institucionais |
| Azul Correnteza | `#1A5FB4` | Botões primários, nav ativa |
| Azul Brilhante | `#2870D4` | Hover, links |
| Vermelho Luta | `#E63946` | CTAs, urgente, destaque |
| Laranja Energia | `#F4732A` | Tags "novo", notícias quentes |
| Cinza Escuro | `#374151` | Textos de corpo |
| Quase Preto | `#1A202C` | Títulos |
| Branco | `#FFFFFF` | Fundos |

---

*Guia do UERNIANO · Movimento Correnteza × UERN · Mossoró, RN · 2026*

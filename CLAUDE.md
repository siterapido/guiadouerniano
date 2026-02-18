# CLAUDE.md — Guia do UERNIANO
> Este arquivo é lido automaticamente pelo Claude Code ao abrir o projeto.
> Contém o contexto essencial, regras e referências para construção do site.

---

## O que é este projeto

**Guia do UERNIANO** é um site guia e portal para estudantes da **UERN (Universidade do Estado do Rio Grande do Norte)**, criado pelo **Movimento Correnteza**. É onde os estudantes encontrarão informações sobre a universidade, movimento estudantil e lutas sociais. Inclui um blog e uma área de membros com materiais exclusivos.

**Site:** `guiadouerniano.com.br` (a definir)
**Stack:** Next.js 14 App Router · TypeScript · Tailwind CSS · Supabase

---

## Documentação de referência (LER ANTES DE CODAR)

Todos os documentos estão na pasta raiz do projeto. Leia o relevante antes de cada tarefa:

| Arquivo | Quando ler |
|---|---|
| `ui-ux-identidade-visual.md` | Antes de criar qualquer UI — cores, tipografia, tokens, componentes |
| `00-PRD-visao-geral.md` | Para entender escopo, personas e requisitos |
| `01-arquitetura-tecnica.md` | Antes de criar arquivos, pastas ou configurações |
| `02-spec-paginas-ux.md` | Antes de implementar qualquer página |
| `03-componentes.md` | Antes de criar qualquer componente React |
| `04-banco-dados-schema.md` | Antes de qualquer operação no banco de dados |
| `05-api-endpoints.md` | Antes de criar Server Actions ou Route Handlers |
| `06-autenticacao-membros.md` | Antes de implementar qualquer fluxo de auth |
| `07-seo-performance.md` | Antes de fazer deploy ou otimizações |

---

## Stack resumida

```
Framework:    Next.js 14 (App Router)
Linguagem:    TypeScript 5 (strict mode)
Estilos:      Tailwind CSS + CSS Custom Properties
Banco/Auth:   Supabase (PostgreSQL + Supabase Auth)
State:        Zustand (global) + React Query (server state)
Forms:        React Hook Form + Zod
Ícones:       Lucide React
Fontes:       Syne (títulos) + Inter (corpo) via next/font/google
Deploy:       Vercel
Email:        Resend
Analytics:    Plausible
```

---

## Regras críticas — SEMPRE seguir

### Design & UI
- **Mobile-first sempre.** CSS parte do mobile, desktop é `@media (min-width: ...)`.
- Usar APENAS as cores do design system: `--azul-uern: #003087`, `--azul-correnteza: #1A5FB4`, `--vermelho-luta: #E63946`. Ver tokens completos em `ui-ux-identidade-visual.md`.
- Fonte de título: **Syne Bold/ExtraBold**. Fonte de corpo: **Inter Regular/Medium/SemiBold**.
- Touch targets mínimos de **44×44px** em todo elemento interativo.
- Contraste mínimo WCAG AA em todo texto (4.5:1 para texto normal).
- Bottom Navigation Bar como nav primária no mobile (máx. 5 itens).
- Nunca usar `outline: none` sem alternativa de foco visível.

### Código TypeScript
- `strict: true` em `tsconfig.json`. Sem `any`, sem `@ts-ignore`.
- Sempre tipar props de componentes com `interface` (não `type` para props).
- Server Components por padrão. Client Components (`"use client"`) apenas quando necessário (interatividade, hooks de browser, state local).
- Zod para TODA validação de entrada (forms, URL params, env vars).

### Estrutura de arquivos
- Componentes em `src/components/` (PascalCase: `ArticleCard.tsx`)
- Páginas em `src/app/` (kebab-case: `blog/[slug]/page.tsx`)
- Server Actions em `src/actions/` (camelCase: `createPost.ts`)
- Queries em `src/lib/queries/` (camelCase: `getPosts.ts`)
- Tipos em `src/types/` (PascalCase: `Post.ts`)
- Hooks em `src/hooks/` (camelCase: `useAuth.ts`)

### Banco de dados
- Nunca fazer queries diretas no cliente — usar Server Components ou Server Actions.
- RLS habilitado em TODAS as tabelas. Ver políticas em `04-banco-dados-schema.md`.
- Sempre usar `created_at` e `updated_at` nos modelos.
- UUID como chave primária.
- Soft delete (campo `deleted_at`) onde indicado.

### Segurança
- Nunca expor chaves de API no cliente (`NEXT_PUBLIC_` apenas para chaves públicas).
- Sanitizar HTML de rich text antes de renderizar (usar `DOMPurify`).
- Proteger rotas com middleware — ver `06-autenticacao-membros.md`.
- Server Actions devem verificar autenticação antes de qualquer mutation.

### Performance
- `next/image` para **toda** imagem. Nunca usar `<img>` diretamente.
- `loading="lazy"` em imagens abaixo do fold, `priority` nas hero images.
- Dynamic imports para componentes pesados (editor de texto, mapa, etc.).
- `revalidate` configurado por tipo de conteúdo — ver `07-seo-performance.md`.

---

## Páginas do site

```
/                           Home — Feed principal
/guia                       Índice do Guia da UERN
/guia/[categoria]           Listagem de artigos de uma categoria
/guia/[categoria]/[slug]    Artigo do guia
/blog                       Blog / Notícias
/blog/[slug]                Artigo do blog
/movimento                  Sobre o Movimento Correnteza
/eventos                    Calendário de eventos
/eventos/[slug]             Evento individual
/busca                      Busca global
/login                      Login e cadastro
/membros                    Dashboard do membro (protegida)
/membros/materiais          Materiais exclusivos (protegida)
/sobre                      Sobre o projeto
/auth/callback              Callback OAuth (Supabase)
```

---

## Roles e permissões resumidas

| Role | Acesso |
|---|---|
| `student` (público/logado) | Lê tudo público, pode comentar |
| `member` | + acesso à área de membros e materiais |
| `editor` | + criar/editar posts e eventos |
| `admin` | Acesso total, gerencia usuários e roles |

---

## Cores do Design System (tokens principais)

```css
/* Copiar para globals.css */
:root {
  --azul-uern:          #003087;
  --azul-correnteza:    #1A5FB4;
  --azul-brilhante:     #2870D4;
  --vermelho-luta:      #E63946;
  --laranja-energia:    #F4732A;
  --neutro-950:         #0D1117;
  --neutro-900:         #1A202C;
  --neutro-800:         #374151;
  --neutro-600:         #6B7280;
  --neutro-200:         #E8EAED;
  --neutro-100:         #F8F9FC;
}
```

---

## Comandos úteis

```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Checar tipos
npm run type-check

# Lint
npm run lint

# Testes
npm run test

# Testes E2E
npm run test:e2e

# Analisar bundle
npm run analyze
```

---

## Variáveis de ambiente necessárias

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Resend (email)
RESEND_API_KEY=

# Revalidation (webhook secret)
REVALIDATION_SECRET=
```

---

## Ao receber uma tarefa, sempre:

1. **Identificar o documento de referência** relevante e lê-lo
2. **Verificar se existe componente já especificado** em `03-componentes.md`
3. **Verificar se a página já tem spec** em `02-spec-paginas-ux.md`
4. **Implementar mobile-first** — começar pelo layout 375px
5. **Tipar corretamente** — interface props, tipos de retorno, generics
6. **Testar estados** — loading, empty, error além do happy path
7. **Verificar acessibilidade** — aria-labels, foco, contraste

---

*Guia do UERNIANO · Movimento Correnteza × UERN · 2026*

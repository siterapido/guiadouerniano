# Documentação Completa - Guia do UERNIANO

Este diretório contém toda a documentação técnica e de design para o projeto "Guia do UERNIANO", um portal para estudantes da UERN desenvolvido pelo Movimento Correnteza.

## Arquivos de Documentação

### 1. **00-PRD-visao-geral.md** (34 KB)
Documento de Visão Geral e PRD (Product Requirements Document)
- Visão e propósito do projeto
- Público-alvo e personas
- Objetivos e resultados esperados
- Requisitos funcionais e não-funcionais
- Timeline e roadmap

### 2. **01-arquitetura-tecnica.md** (56 KB)
Especificação de Arquitetura Técnica
- Stack tecnológico (React, Next.js, Tailwind, TypeScript)
- Arquitetura de pastas e organização
- Padrões de dados e APIs
- Fluxos de autenticação
- Performance e otimização
- Deploy e CI/CD
- Segurança e infraestrutura

### 3. **02-spec-paginas-ux.md** (28 KB)
Especificação Detalhada de UI/UX para Todas as Páginas
Inclui especificação completa para 14 páginas:
- / (Home)
- /guia (Índice do Guia)
- /guia/[categoria] (Listagem de Categoria)
- /guia/[categoria]/[slug] (Artigo do Guia)
- /blog (Blog)
- /blog/[slug] (Artigo do Blog)
- /movimento (Sobre o Movimento)
- /eventos (Calendário de Eventos)
- /eventos/[slug] (Evento Individual)
- /busca (Busca)
- /login (Autenticação)
- /membros (Dashboard de Membros)
- /membros/materiais (Biblioteca de Materiais)
- /sobre (Sobre o Projeto)

**Para cada página:**
- Informações básicas (URL, título, propósito, objetivo)
- Componentes utilizados
- Layout mobile (ASCII art detalhado)
- Layout desktop (ASCII art detalhado)
- Estados da página (loading, empty, error, success)
- Dados necessários (interfaces TypeScript)
- Regras de negócio
- SEO (meta tags, og tags, structured data)
- Acessibilidade (ARIA, keyboard navigation)
- Notas de implementação

### 4. **03-componentes.md** (29 KB)
Guia Completo de Componentes React
Especificação de 56 componentes divididos em categorias:

**Layout (7 componentes):**
- TopAppBar
- BottomNavBar
- Navbar (Desktop)
- Footer
- PageLayout
- Container
- Section

**Primitivos UI (12 componentes):**
- Button (4 variantes: primary, secondary, ghost, danger)
- Badge / Tag
- Input
- Textarea
- Select
- Checkbox
- Radio
- Switch / Toggle
- Avatar
- Chip
- Divider
- Skeleton

**Feedback (7 componentes):**
- Toast / Snackbar
- Alert
- Modal
- BottomSheet
- Spinner
- EmptyState
- ErrorBoundary

**Navegação (5 componentes):**
- Breadcrumb
- Tabs
- FilterChips
- Pagination
- SearchBar

**Conteúdo (10 componentes):**
- ArticleCard
- GuideCard
- EventCard
- MaterialCard
- CategoryCard
- FeaturedCard
- QuickAccessCard
- AuthorInfo
- ReadingTime
- TableOfContents

**Tipografia (3 componentes):**
- Heading (h1-h6)
- Callout (tip, warning, info, important)
- RichText

**Formulários (6 componentes):**
- SearchForm
- LoginForm
- RegisterForm
- FeedbackForm
- ReportForm
- CommentForm

**Específicos/Compostos (6 componentes):**
- CategoryGrid
- HorizontalScroll
- ProgressBar
- ShareButtons
- ThemeToggle
- MemberCard

**Para cada componente:**
- Arquivo (localização relativa a src/components/)
- Propósito e descrição
- Interface TypeScript completa (Props)
- Exemplo de uso (JSX)
- Variantes e estados
- Implementação Tailwind (classes principais)
- Dependências (outros componentes)

### 5. **ui-ux-identidade-visual.md** (36 KB)
Guia de Identidade Visual e UI/UX Design
- Design System completo
- Paleta de cores
- Tipografia (Syne + Inter)
- Ícones e iconografia
- Componentes base
- Padrões de interação
- Acessibilidade

---

## Design System

### Cores
- **Primária:** #1A5FB4 (Azul Correnteza)
- **Secundária:** #003087 (Azul UERN)
- **Acento:** #E63946 (Vermelho)
- **Neutras:** Escala de cinza de #F9FAFB a #111827

### Tipografia
- **Títulos:** Syne (Bold, SemiBold)
- **Corpo:** Inter (Regular, Medium, SemiBold)
- **Escala:** 12px → 48px

### Abordagem
- **Mobile-First:** Otimizado para dispositivos móveis primeiro
- **Responsivo:** Tablet e desktop suportados
- **Acessível:** WCAG 2.1 AA compliance

---

## Como Usar Esta Documentação

### Para Desenvolvedores Backend
Consulte **01-arquitetura-tecnica.md** para entender:
- APIs necessárias e seus schemas
- Autenticação e autorização
- Modelos de dados
- Endpoints requeridos

### Para Desenvolvedores Frontend
Consulte **02-spec-paginas-ux.md** e **03-componentes.md** para:
- Layouts e estrutura de cada página
- Componentes a implementar
- Prototipagem de interfaces
- Estados e interações

### Para Designers
Consulte **ui-ux-identidade-visual.md** e **02-spec-paginas-ux.md** para:
- Design System
- Referências de layout
- Padrões de interação
- Especificações de acessibilidade

### Para Product Managers
Consulte **00-PRD-visao-geral.md** para:
- Visão geral do projeto
- Requisitos funcionais
- Timeline e roadmap
- Métricas de sucesso

### Para Claude Code (Implementação)
Siga esta ordem:
1. **01-arquitetura-tecnica.md** - Entender estrutura geral
2. **03-componentes.md** - Implementar componentes base
3. **02-spec-paginas-ux.md** - Implementar páginas
4. **ui-ux-identidade-visual.md** - Aplicar estilos e identidade visual

---

## Estrutura do Projeto Recomendada

```
guia-do-uerniano/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── TopAppBar.tsx
│   │   │   ├── BottomNavBar.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── PageLayout.tsx
│   │   │   ├── Container.tsx
│   │   │   └── Section.tsx
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Textarea.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── Checkbox.tsx
│   │   │   ├── Radio.tsx
│   │   │   ├── Switch.tsx
│   │   │   ├── Avatar.tsx
│   │   │   ├── Chip.tsx
│   │   │   ├── Divider.tsx
│   │   │   └── Skeleton.tsx
│   │   ├── feedback/
│   │   │   ├── Toast.tsx
│   │   │   ├── Alert.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── BottomSheet.tsx
│   │   │   ├── Spinner.tsx
│   │   │   ├── EmptyState.tsx
│   │   │   └── ErrorBoundary.tsx
│   │   ├── navigation/
│   │   │   ├── Breadcrumb.tsx
│   │   │   ├── Tabs.tsx
│   │   │   ├── FilterChips.tsx
│   │   │   ├── Pagination.tsx
│   │   │   └── SearchBar.tsx
│   │   ├── content/
│   │   │   ├── ArticleCard.tsx
│   │   │   ├── GuideCard.tsx
│   │   │   ├── EventCard.tsx
│   │   │   ├── MaterialCard.tsx
│   │   │   ├── CategoryCard.tsx
│   │   │   ├── FeaturedCard.tsx
│   │   │   ├── QuickAccessCard.tsx
│   │   │   ├── AuthorInfo.tsx
│   │   │   ├── ReadingTime.tsx
│   │   │   └── TableOfContents.tsx
│   │   ├── typography/
│   │   │   ├── Heading.tsx
│   │   │   ├── Callout.tsx
│   │   │   └── RichText.tsx
│   │   ├── forms/
│   │   │   ├── SearchForm.tsx
│   │   │   ├── LoginForm.tsx
│   │   │   ├── RegisterForm.tsx
│   │   │   ├── FeedbackForm.tsx
│   │   │   ├── ReportForm.tsx
│   │   │   └── CommentForm.tsx
│   │   └── specific/
│   │       ├── CategoryGrid.tsx
│   │       ├── HorizontalScroll.tsx
│   │       ├── ProgressBar.tsx
│   │       ├── ShareButtons.tsx
│   │       ├── ThemeToggle.tsx
│   │       └── MemberCard.tsx
│   ├── pages/
│   │   ├── index.tsx (Home)
│   │   ├── guia/
│   │   │   ├── index.tsx
│   │   │   ├── [categoria]/
│   │   │   │   ├── index.tsx
│   │   │   │   └── [slug].tsx
│   │   ├── blog/
│   │   │   ├── index.tsx
│   │   │   └── [slug].tsx
│   │   ├── movimento.tsx
│   │   ├── eventos/
│   │   │   ├── index.tsx
│   │   │   └── [slug].tsx
│   │   ├── busca.tsx
│   │   ├── login.tsx
│   │   ├── membros/
│   │   │   ├── index.tsx
│   │   │   └── materiais.tsx
│   │   ├── sobre.tsx
│   │   └── _app.tsx
│   ├── hooks/
│   ├── utils/
│   ├── lib/
│   ├── types/
│   └── styles/
├── public/
├── tailwind.config.ts
├── tsconfig.json
├── next.config.js
└── package.json
```

---

## Stack Tecnológico

```json
{
  "framework": "Next.js 14+",
  "language": "TypeScript 5+",
  "ui": "React 18+",
  "styling": "Tailwind CSS 3+",
  "forms": "React Hook Form 7+",
  "validation": "Zod 3+",
  "animation": "Framer Motion 10+",
  "icons": "React Icons 4+",
  "calendar": "React Big Calendar 1+",
  "html-sanitizer": "DOMPurify 2+",
  "syntax-highlighting": "Prism React Renderer 2+",
  "database": "PostgreSQL (recomendado)",
  "auth": "NextAuth.js ou JWT",
  "api": "REST com Next.js API Routes"
}
```

---

## Próximos Passos

1. **Setup Inicial:**
   - Criar repositório Git
   - Inicializar Next.js com TypeScript
   - Configurar Tailwind CSS
   - Setup de variáveis de ambiente

2. **Implementação de Componentes:**
   - Começar com componentes primitivos (Button, Input, etc)
   - Depois componentes compostos (Cards, Forms, etc)
   - Finalmente componentes de página

3. **Implementação de Páginas:**
   - Home primeiro (validação de arquitetura)
   - Guia (estrutura complexa)
   - Blog (conteúdo dinâmico)
   - Resto das páginas

4. **Backend/API:**
   - Implementar CMS para Guia e Blog (Strapi, Sanity, ou custom)
   - Autenticação (NextAuth.js + JWT)
   - Database (PostgreSQL)
   - Deployment (Vercel ou similar)

5. **Testing e QA:**
   - Testes unitários (Jest)
   - Testes de componentes (React Testing Library)
   - Testes de integração
   - Testes de acessibilidade

6. **Analytics e Monitoring:**
   - Google Analytics ou Posthog
   - Error tracking (Sentry)
   - Performance monitoring

---

## Suporte e Contribuição

Esta documentação foi criada para servir como referência completa para desenvolvimento do Guia do UERNIANO. Para atualizações ou correções, atualize os arquivos .md correspondentes.

Para contribuições ao código, siga a estrutura de arquivos recomendada e as especificações de componentes.

---

**Última atualização:** 18 de fevereiro de 2025
**Versão:** 1.0
**Status:** Documentação Completa Pronta para Desenvolvimento

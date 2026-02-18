# Especificação Detalhada de UI/UX - Guia do UERNIANO

## Introdução

Especificação completa de UI/UX para cada página do site **Guia do UERNIANO** — um portal moderno para estudantes da UERN (Universidade do Estado do Rio Grande do Norte), criado pelo Movimento Correnteza.

### Design System

- **Cores Primárias:** #1A5FB4 (Azul Correnteza), #003087 (Azul UERN)
- **Acento:** #E63946 (Vermelho)
- **Tipografia:** Syne (títulos), Inter (corpo)
- **Abordagem:** Mobile-first
- **Plataforma:** React + Tailwind CSS

---

## 1. HOME (/)

### Informações Básicas
- **URL:** `/`
- **Título:** Guia do UERNIANO — Seu guia para a UERN
- **Propósito:** Página de entrada principal com melhor conteúdo e acesso rápido
- **Objetivo:** Explorar notícias, acessar guia, ver eventos, navegar por áreas de interesse

### Componentes Utilizados
- TopAppBar, BottomNavBar, Chips, FeaturedCard, ArticleCard, QuickAccessCard, HorizontalScroll, Section, PageLayout

### Layout Mobile
```
┌────────────────────────┐
│ [≡] LOGO [🔔] [👤]   │ TopAppBar
└────────────────────────┘
┌────────────────────────┐
│ Movimento  Acadêmico   │
│ Social    UERN      [→]│ FilterChips (scroll)
└────────────────────────┘
┌────────────────────────┐
│ ╔════════════════════╗  │
│ ║ DESTAQUE           ║  │ FeaturedCard
│ ║ Título Grande      ║  │
│ ║ [Gradiente Azul]   ║  │
│ ╚════════════════════╝  │
└────────────────────────┘
┌────────────────────────┐
│ FEED DE NOTÍCIAS       │
│ [Card] [Card] [Card]   │ ArticleCards
└────────────────────────┘
┌────────────────────────┐
│ ACESSO RÁPIDO          │
│ [📚]      [📅]        │ QuickAccessCards
│ Biblioteca Calendário  │
│ [🍽]       [🤝]       │
│ RU          DCE        │
└────────────────────────┘
┌────────────────────────┐
│ DO GUIA — [Artigos] [→]│
│ [Card] [Card] [Card]   │
└────────────────────────┘
┌────────────────────────┐
│ [🏠] [🔍] [📖]       │
│ [✍] [👤]              │ BottomNavBar
└────────────────────────┘
```

### Layout Desktop
```
┌────────────────────────────────────────────────┐
│ [LOGO] [Home] [Explorar] [Guia] [Movimento]   │
│                         [Busca] [Login] [👤]  │
└────────────────────────────────────────────────┘
┌────────────────────────────────────────────────┐
│ Movimento | Acadêmico | Social | UERN      [→]│
└────────────────────────────────────────────────┘
┌────────────────────────────────────────────────┐
│  ╔══════════════════════════════════════════╗  │
│  ║ DESTAQUE GRANDE - ARTIGO PRINCIPAL       ║  │ FeaturedCard
│  ║ [Gradiente Azul Correnteza]              ║  │
│  ╚══════════════════════════════════════════╝  │
└────────────────────────────────────────────────┘
┌────────────────────────────────────────────────┐
│ FEED DE NOTÍCIAS (2x2 grid)                    │
└────────────────────────────────────────────────┘
┌────────────────────────────────────────────────┐
│ ACESSO RÁPIDO (2x2 grid)                       │
└────────────────────────────────────────────────┘
┌────────────────────────────────────────────────┐
│ DO GUIA — Artigos Recentes                     │
│ [Card] [Card] [Card] [Card]                    │
└────────────────────────────────────────────────┘
│ Footer                                         │
```

### Estados da Página

**Loading:** Skeleton loaders para cards  
**Empty:** "Nenhuma notícia no momento"  
**Error:** Alert com botão retry  
**Success:** Conteúdo carregado e animado

### Dados Necessários
```typescript
interface HomeData {
  featuredArticle: { id, title, slug, image, category };
  articles: Array<{ id, title, slug, image, category, author, date, readingTime }>;
  guideArticles: Array<{ id, title, slug, category, icon }>;
  categories: string[];
}
```

### SEO / Acessibilidade
- **Title:** "Guia do UERNIANO — Seu Portal para a UERN"
- **Description:** "Guia completo para estudantes da UERN. Notícias, calendário acadêmico, RU, biblioteca..."
- ARIA labels para navegação
- Lazy load images

---

## 2. GUIA (/guia)

### Hub central do guia com acesso a todas as categorias
- **URL:** `/guia`
- **Componentes:** SearchBar, CategoryCard, CategoryGrid, Badge, Section

### Layout Mobile
```
┌────────────────────────┐
│ [≡] GUIA [🔔] [👤]   │
└────────────────────────┘
┌────────────────────────┐
│ ┌──────────────────┐   │
│ │ [🔍] Buscar...   │   │ SearchBar
│ └──────────────────┘   │
└────────────────────────┘
┌────────────────────────┐
│ COMO USAR O GUIA?      │
│ Clique em uma categoria│
└────────────────────────┘
┌────────────────────────┐
│ CATEGORIAS             │
│ ┌──────────────────┐   │
│ │ 📝 MATRÍCULA    │   │
│ │ 5 artigos       │   │
│ └──────────────────┘   │
│ ... (mais categorias)  │
└────────────────────────┘
│ ARTIGOS RECENTES       │
│ • Título 1             │
│ • Título 2             │
```

### Dados Necessários
```typescript
interface GuideIndexData {
  categories: Array<{ id, name, slug, icon, description, articleCount }>;
  recentArticles: Array<{ id, title, slug, category }>;
}
```

### Regras de Negócio
- Categorias com contadores atualizados
- Busca case-insensitive
- Cache agressivo

---

## 3. LISTAGEM DE CATEGORIA (/guia/[categoria])

### Listar artigos de categoria com filtros
- **Componentes:** Breadcrumb, GuideCard, FilterChips, SearchBar, Pagination

### Layout Mobile
```
┌────────────────────────┐
│ [←] MATRÍCULA [🔔][👤]│
└────────────────────────┘
│ Home > Guia > Matrícula│ Breadcrumb
│ Saiba tudo sobre...    │
┌────────────────────────┐
│ Ordenar: Recente ▼     │
├────────────────────────┤
│ • Artigo 1             │
│   15 min de leitura    │
│ • Artigo 2             │
│   12 min de leitura    │
└────────────────────────┘
│ [← Anterior] [Próximo →]│ Pagination
```

### Dados Necessários
```typescript
interface CategoryPageData {
  category: { id, name, slug, icon, description };
  articles: Array<{ id, title, slug, readingTime, date, views }>;
  pagination: { currentPage, totalPages, totalItems };
}
```

---

## 4. ARTIGO DO GUIA (/guia/[categoria]/[slug])

### Artigo completo com índice, callouts, feedback
- **Componentes:** Breadcrumb, TableOfContents, RichText, Callout, FeedbackForm, RelatedArticles

### Layout Mobile
```
┌────────────────────────┐
│ [←] [🔔] [👤]         │
└────────────────────────┘
│ Home > Guia > Cat > Art│
│ TÍTULO DO ARTIGO       │
│ Atualizado 2025        │
│ 12 min de leitura      │
├────────────────────────┤
│ ▼ ÍNDICE (colapsável)  │ ToC
├────────────────────────┤
│ CONTEÚDO:              │
│ 1. INTRODUÇÃO          │
│ Lorem ipsum...         │
│ ┌──────────────────┐   │
│ │ 💡 DICA:         │   │ Callout
│ │ Use o sistema... │   │
│ └──────────────────┘   │
│ 2. DOCUMENTOS          │
│ ...                    │
├────────────────────────┤
│ ISSO FOI ÚTIL?         │
│ [👍] [👎]             │ Feedback
├────────────────────────┤
│ [🚨] REPORTAR ERRO    │
│ ARTIGOS RELACIONADOS   │
```

### Dados Necessários
```typescript
interface GuideArticleData {
  article: {
    id, title, slug, category, content, htmlContent, author, updatedAt,
    readingTime, tableOfContents: Array<{ id, title, level, children }>
  };
  relatedArticles: Array<{ id, title, slug }>;
}
```

### Callouts Suportados
- 💡 Dica (azul)
- ⚠️ Aviso (amarelo)
- ℹ️ Informação (verde)
- ❗ Importante (vermelho)

---

## 5. BLOG (/blog)

### Portal de notícias com destaque e grid
- **Componentes:** FilterChips, FeaturedCard, ArticleCard, Sidebar (tags, populares)

### Layout Mobile
```
┌────────────────────────┐
│ [≡] BLOG [🔔] [👤]   │
└────────────────────────┘
│ Movimento | Acadêmico  │
│ Social    | UERN    [→]│ FilterChips
└────────────────────────┘
│ ╔════════════════════╗  │
│ ║ DESTAQUE GRANDE    ║  │ FeaturedCard
│ ║ [Categoria | 5min] ║  │
│ ╚════════════════════╝  │
│ ARTIGOS RECENTES       │
│ [Card] [Card] [Card]   │ 1x1 grid mobile
│ [Card] [Card] [Card]   │
```

### Layout Desktop
```
┌────────────────────────────────────────────────┐
│ Movimento | Acadêmico | Social | UERN      [→]│
└────────────────────────────────────────────────┘
│ DESTAQUE GRANDE                                │
├──────────────────┬──────────────────────────────┤
│ GRID 3x3         │ SIDEBAR:                     │
│ [Card] [C] [C]   │ TAGS POPULARES               │
│ [Card] [C] [C]   │ • Movimento                  │
│ [Card] [C] [C]   │ • Educação                   │
│ Paginação        │ ARTIGOS POPULARES            │
│                  │ • Artigo 1                   │
│                  │ • Artigo 2                   │
└──────────────────┴──────────────────────────────┘
```

### Dados Necessários
```typescript
interface BlogData {
  featuredArticle: { id, title, slug, image, category, author, date, readingTime };
  articles: Array<{ id, title, slug, image, category, author, date, readingTime }>;
  categories: string[];
  tags: Array<{ name, count }>;
  popularArticles: Array<{ id, title, slug }>;
  pagination: { currentPage, totalPages };
}
```

### Regras
- Destaque é artigo mais recente
- 9 artigos por página
- Filtro por categoria

---

## 6. ARTIGO DO BLOG (/blog/[slug])

### Artigo com hero image, ProgressBar, comentários, compartilhamento
- **Componentes:** ProgressBar, Hero, AuthorInfo, RichText, ShareButtons, CommentSection

### Layout Mobile
```
┌────────────────────────┐
│ ═══════════════════════│ ProgressBar
│ [←] [🔔] [👤]         │
└────────────────────────┘
│ [📷 HERO IMAGE]        │
│ TÍTULO DO ARTIGO       │ Hero Section
│ [Overlay gradiente]    │
├────────────────────────┤
│ [👤] Autor             │
│ Data | Categoria | 5min│ AuthorInfo
├────────────────────────┤
│ CONTEÚDO DO ARTIGO:    │
│ Lorem ipsum...         │ RichText
├────────────────────────┤
│ COMPARTILHAR           │
│ [W] [T] [Copiar]       │ ShareButtons
├────────────────────────┤
│ COMENTÁRIOS (3)        │
│ [👤] User 1            │
│ "Excelente!"           │ Comments
│ 2h atrás               │
│                        │
│ DEIXE UM COMENTÁRIO    │ CommentForm
│ [Textarea]             │
│ [Enviar]               │
├────────────────────────┤
│ ARTIGOS RELACIONADOS   │
│ • Artigo 1             │
│ • Artigo 2             │
```

### Dados Necessários
```typescript
interface BlogArticleData {
  article: {
    id, title, slug, image, heroImage, category, author: { id, name, avatar },
    date, updatedAt, readingTime, content, htmlContent
  };
  comments: Array<{ id, author: { name, avatar }, text, date }>;
  relatedArticles: Array<{ id, title, slug, image }>;
}
```

### Share Buttons
- WhatsApp
- Twitter/X
- Copy Link (com toast)

---

## 7. MOVIMENTO (/movimento)

### Apresentação do movimento, história, equipe, lutas
- **Componentes:** Hero, Timeline, Section, MemberCard, Card

### Layout Mobile
```
┌────────────────────────┐
│ [≡] [🔔] [👤]         │
└────────────────────────┘
│ ╔════════════════════╗  │
│ ║ MOVIMENTO          ║  │ Hero
│ ║ CORRENTEZA         ║  │
│ ║ A luta continua... ║  │
│ ╚════════════════════╝  │
├────────────────────────┤
│ QUEM SOMOS             │
│ Somos um movimento...  │
├────────────────────────┤
│ NOSSA HISTÓRIA         │
│ 2019 — Fundação       │
│ 2020 — Primeira...    │
│ 2021 — Criação...     │ Timeline
│ 2024 — Crescimento    │
├────────────────────────┤
│ NOSSAS LUTAS           │
│ • Educação pública     │
│ • Melhoria do RU       │
│ • Contra assédio       │
│ • Direitos LGBTQ+      │
├────────────────────────┤
│ EQUIPE                 │
│ [👤] Nome — Função     │
│ [👤] Nome — Função     │
├────────────────────────┤
│ [JUNTE-SE]             │ CTA
```

### Dados Necessários
```typescript
interface MovimentoData {
  about: string; // HTML
  timeline: Array<{ year, title, description, icon }>;
  lutas: Array<{ id, title, description, icon }>;
  team: Array<{ id, name, role, bio, photo, social }>;
}
```

---

## 8. EVENTOS (/eventos)

### Calendário e lista de eventos com filtros
- **Componentes:** Toggle (Lista/Calendário), FilterChips, EventCard, Calendar

### Layout Mobile
```
┌────────────────────────┐
│ [≡] EVENTOS [🔔][👤] │
└────────────────────────┘
│ [Lista] [Calendário]   │ Toggle
├────────────────────────┤
│ Assembleia | Reunião   │
│ Ato | Sarau         [→]│ FilterChips
├────────────────────────┤
│ PRÓXIMOS EVENTOS       │
│ 20 FEB                 │
│ ASSEMBLEIA GERAL       │
│ 📍 Campus Central      │ EventCard
│ 🕒 14h — Biblioteca    │
│ [+ ADICIONAR]          │
│ [COMPARTILHAR]         │
│                        │
│ 25 FEB                 │
│ REUNIÃO COORD          │
│ 📍 Campus Mossoró      │
│ 🕒 18h — Sala 101      │
```

### Dados Necessários
```typescript
interface EventosData {
  events: Array<{
    id, title, slug, date, time, location, campus, type, description
  }>;
  types: string[];
  campuses: string[];
}
```

---

## 9. EVENTO INDIVIDUAL (/eventos/[slug])

### Detalhes do evento com mapa e compartilhamento
- **Componentes:** Header (data grande), Badge, ShareButtons, Map, RelatedEvents

### Layout Mobile
```
┌────────────────────────┐
│ [←] [🔔] [👤]         │
└────────────────────────┘
│ 20 FEB 2025            │
│ ASSEMBLEIA GERAL       │ Data grande + Título
│ [Tipo]                 │
├────────────────────────┤
│ 🕒 14h — 16h           │
│ 📍 Biblioteca Central  │
│ Campus Central, Natal  │ Informações
│ 🏢 Mov. Correnteza     │
├────────────────────────┤
│ DESCRIÇÃO:             │
│ Lorem ipsum...         │
├────────────────────────┤
│ [+ AGENDA] [COMPARTILH]│ CTAs
├────────────────────────┤
│ [Mapa - Google Maps]   │ Map
├────────────────────────┤
│ COMPARTILHAR           │
│ [W] [T] [Copiar]       │
├────────────────────────┤
│ EVENTOS RELACIONADOS   │
│ • Reunião 25 fev       │
│ • Ato 03 mar           │
```

---

## 10. BUSCA (/busca?q=[query])

### Busca central com filtros por tipo
- **Componentes:** SearchBar (grande), FilterChips, SearchResults, Pagination

### Layout Mobile
```
┌────────────────────────┐
│ [🔍] Buscar...        │ SearchBar grande
│ [X]                    │
└────────────────────────┘
│ Guia | Blog | Eventos  │ FilterChips
├────────────────────────┤
│ RESULTADOS (12)        │
│ [📖] Resultado 1       │
│ Guia > Matrícula       │
│ Lorem ipsum dolor...   │ SearchResult
│ Leia mais →            │
│                        │
│ [📝] Resultado 2       │
│ Blog > Movimento       │
│ Lorem ipsum dolor...   │
```

### Estados
- **Vazio:** Sugestões de buscas populares
- **Sem resultado:** "Nenhum resultado para '[query]'"
- **Com resultado:** Lista com paginação

---

## 11. LOGIN (/login)

### Autenticação com login e cadastro em abas
- **Componentes:** Tabs, LoginForm, RegisterForm, Button, Divider

### Layout Mobile
```
┌────────────────────────┐
│ [←] LOGIN [🔔] [👤]  │
└────────────────────────┘
│ [ENTRAR] [CRIAR CONTA] │ Tabs
├────────────────────────┤
│ ENTRAR                 │
│                        │
│ E-mail                 │
│ [seu@email.com]        │ Input
│                        │
│ Senha                  │
│ [•••••••••]            │ Input
│                        │
│ [ENTRAR]               │ Primary Button
│                        │
│ ─── OU ───             │ Divider
│                        │
│ [🔵 ENTRAR COM GOOGLE] │ Secondary Button
│                        │
│ Esqueceu a senha?      │ Link
```

### Fluxos
1. **Login:** e-mail + senha OU Google OAuth
2. **Cadastro:** nome, e-mail, senha, curso, campus, termos
3. **Forgot Password:** enviar e-mail de reset

### Dados Necessários
```typescript
interface LoginRequest { email, password }
interface RegisterRequest { name, email, password, course, campus, acceptTerms }
interface LoginResponse { user: { id, email, name, avatar }, token }
```

---

## 12. MEMBROS — DASHBOARD (/membros)

### Área de membros com acesso a materiais, eventos, comunicados
- **Componentes:** ProfileCard, DashboardCard, ActivityFeed, Button

### Layout Mobile
```
┌────────────────────────┐
│ [≡] ÁREA DE MEMBROS   │
│     [🔔] [⚙] [👤]     │
└────────────────────────┘
│ ╔════════════════════╗  │
│ ║ [👤 Avatar]        ║  │
│ ║ Nome Completo      ║  │ ProfileCard
│ ║ Curso / Campus     ║  │
│ ║ ✓ Membro Ativo     ║  │
│ ╚════════════════════╝  │
├────────────────────────┤
│ SEUS ACESSOS           │
│ [📚 Materiais] [24]    │
│ [🎟 Exclusivos] [5]    │ DashboardCards
│ [📢 Comunicados] [3]   │
├────────────────────────┤
│ ATIVIDADE RECENTE      │
│ • Adicionado ao grupo  │ ActivityFeed
│   2h atrás             │
│ • Novo comunicado      │
│   6h atrás             │
```

### Proteção
- Requer autenticação
- Redireciona para /login se não autenticado

---

## 13. BIBLIOTECA DE MATERIAIS (/membros/materiais)

### Repositório de materiais com filtros
- **Componentes:** FilterChips, SearchBar, MaterialCard, Grid, Modal (upload)

### Layout Mobile
```
┌────────────────────────┐
│ [≡] MATERIAIS [🔔][👤]│
└────────────────────────┘
│ ┌──────────────────┐   │
│ │ [🔍] Buscar...   │   │ SearchBar
│ └──────────────────┘   │
├────────────────────────┤
│ PDF | Vídeo | Link | + │ FilterChips
├────────────────────────┤
│ MATERIAIS              │
│ ┌──────────────────┐   │
│ │ [📄] PDF         │   │
│ │ Cartilha de...   │   │ MaterialCard
│ │ Baixar           │   │
│ │ 15/02/2025       │   │
│ └──────────────────┘   │
│ ┌──────────────────┐   │
│ │ [🎥] Vídeo       │   │
│ │ Assembleia 2024  │   │
│ │ Assistir         │   │
│ │ 12/02/2025       │   │
│ └──────────────────┘   │
```

### Funcionalidades
- Filtro por tipo (PDF, Vídeo, Link)
- Filtro por categoria
- Upload para admins
- Download direto para usuários

---

## 14. SOBRE (/sobre)

### Informações do projeto, equipe, como contribuir
- **Componentes:** Hero, Section, Button, Card, Link

### Layout Mobile
```
┌────────────────────────┐
│ [≡] SOBRE [🔔] [👤]  │
└────────────────────────┘
│ ╔════════════════════╗  │
│ ║ GUIA DO UERNIANO   ║  │ Hero
│ ║ Por estudantes     ║  │
│ ║ da UERN            ║  │
│ ╚════════════════════╝  │
├────────────────────────┤
│ SOBRE O PROJETO        │
│ Lorem ipsum dolor...   │
├────────────────────────┤
│ EQUIPE                 │
│ • Pessoa 1 — Dev      │
│ • Pessoa 2 — Design   │
│ • Pessoa 3 — PM       │
├────────────────────────┤
│ COMO CONTRIBUIR        │
│ [VER NO GITHUB]        │ CTAs
│ [REPORTAR ERRO]        │
│ [ENVIAR SUGESTÃO]      │
├────────────────────────┤
│ LEGAL                  │
│ • Termos de Uso        │
│ • Privacidade          │
│ • Licença MIT          │
```

---

## Padrões de Implementação Globais

### Autenticação & Autorização
- JWT tokens em localStorage
- Session management automático
- Redireciona para /login rotas protegidas
- Logout limpa token e redireciona

### Estados de Loading
- Skeleton loaders para estrutura
- Spinner para ações
- Shimmer effect em imagens

### Feedback do Usuário
- Toast notifications para ações (sucesso/erro)
- ARIA live regions para atualizações
- Confirmação em ações destrutivas

### Responsividade
- Mobile-first: 320px mínimo
- Tablet: 768px+
- Desktop: 1024px+
- Breakpoints: sm (640), md (768), lg (1024), xl (1280)

### Performance
- ISR para Guia e Blog (revalidate 3600s)
- Suspense + Skeleton para Suspense boundaries
- Image optimization com next/image
- Lazy loading de imagens e componentes

### SEO
- Meta tags dinâmicas por página
- og: tags para sharing
- Structured Data (JSON-LD) para articles, events
- robots.txt e sitemap.xml
- Canonical URLs

---

## Conclusão

Esta especificação fornece base sólida para implementação de UI/UX consistente em todas as páginas do Guia do UERNIANO. Seguir esses padrões garante experiência coesa, acessível e performática para todos os usuários.

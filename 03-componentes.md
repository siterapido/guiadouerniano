# Guia Completo de Componentes - Guia do UERNIANO

## Introdução

Especificação de todos os componentes React que precisam ser criados para o site "Guia do UERNIANO". Cada componente inclui interface TypeScript, exemplo de uso, variantes e notas de implementação.

**Stack:** React 18+ | TypeScript | Tailwind CSS | Next.js 14+

---

# COMPONENTES DE LAYOUT

## 1. TopAppBar

**Arquivo:** `src/components/layout/TopAppBar.tsx`

**Propósito:** Barra superior com logo, notificações e avatar (mobile/tablet)

**Props:**
```typescript
interface TopAppBarProps {
  onMenuClick?: () => void;
  onAvatarClick?: () => void;
  notificationCount?: number;
}
```

**Exemplo de Uso:**
```typescript
<TopAppBar 
  onMenuClick={() => setMenuOpen(true)}
  notificationCount={3}
/>
```

**Variantes:**
- Com notificações (badge com contagem)
- Sem notificações
- Com dropdown avatar
- Mode compacto (sem logo)

**Implementação Tailwind:**
```
bg-white shadow-sm | h-16 | flex items-center justify-between
px-4 gap-4 | border-b border-gray-200
```

---

## 2. BottomNavBar

**Arquivo:** `src/components/layout/BottomNavBar.tsx`

**Propósito:** Navegação inferior com 5 itens (mobile/tablet)

**Props:**
```typescript
interface BottomNavBarProps {
  activeTab: 'home' | 'explore' | 'guide' | 'movement' | 'profile';
  onTabChange: (tab: string) => void;
}
```

**Exemplo de Uso:**
```typescript
<BottomNavBar 
  activeTab="home"
  onTabChange={(tab) => router.push(`/${tab}`)}
/>
```

**Items:** Home, Explorar, Guia, Movimento, Perfil

**Implementação:**
```
fixed bottom-0 w-full | bg-white border-t border-gray-200
flex justify-around items-center | h-20 | z-50
active-tab: text-primary-blue bg-blue-50
```

---

## 3. Navbar (Desktop)

**Arquivo:** `src/components/layout/Navbar.tsx`

**Propósito:** Navegação horizontal desktop com logo, menu, busca, login

**Props:**
```typescript
interface NavbarProps {
  isAuthenticated: boolean;
  userName?: string;
  userAvatar?: string;
}
```

**Exemplo de Uso:**
```typescript
<Navbar 
  isAuthenticated={user?.id}
  userName={user?.name}
  userAvatar={user?.avatar}
/>
```

**Itens:** Logo, Home, Explorar, Guia, Movimento, Busca, Login/Logout, Avatar

**Implementação:**
```
bg-white shadow-sm | h-20 | flex items-center justify-between
px-8 gap-12 | sticky top-0 z-40
Dropdowns para Guia (categorias) e Movimento (seções)
```

---

## 4. Footer

**Arquivo:** `src/components/layout/Footer.tsx`

**Propósito:** Rodapé com links, redes sociais, copyright

**Props:**
```typescript
interface FooterProps {
  variant?: 'full' | 'minimal';
}
```

**Exemplo de Uso:**
```typescript
<Footer variant="full" />
```

**Seções:**
- Sobre & Links
- Redes Sociais
- Newsletter (opcional)
- Copyright

**Implementação:**
```
bg-gray-900 text-white | py-12 px-6
grid cols-1 md:cols-4 gap-8
Links: About, Blog, Guia, Contato, Termos, Privacidade
```

---

## 5. PageLayout

**Arquivo:** `src/components/layout/PageLayout.tsx`

**Propósito:** Wrapper padrão para páginas com navbar, conteúdo, footer

**Props:**
```typescript
interface PageLayoutProps {
  children: React.ReactNode;
  showBottomNav?: boolean;
  showFooter?: boolean;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}
```

**Exemplo de Uso:**
```typescript
<PageLayout maxWidth="lg" showFooter>
  {/* conteúdo da página */}
</PageLayout>
```

**Implementação:**
```
flex flex-col min-h-screen
<Navbar /> | <main maxW-*> {children} </main> | <Footer />
BottomNav em mobile automaticamente
```

---

## 6. Container

**Arquivo:** `src/components/layout/Container.tsx`

**Propósito:** Container com max-width e margin automático

**Props:**
```typescript
interface ContainerProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}
```

**Exemplo de Uso:**
```typescript
<Container size="lg">
  {/* conteúdo */}
</Container>
```

**Sizes:**
- sm: max-w-sm (24rem)
- md: max-w-2xl (42rem)
- lg: max-w-4xl (56rem)
- xl: max-w-6xl (72rem)

---

## 7. Section

**Arquivo:** `src/components/layout/Section.tsx`

**Propósito:** Seção com título, ícone opcional, conteúdo

**Props:**
```typescript
interface SectionProps {
  title: string;
  icon?: React.ReactNode;
  description?: string;
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'centered' | 'elevated';
}
```

**Exemplo de Uso:**
```typescript
<Section 
  title="ACESSO RÁPIDO" 
  icon={<LightbulbIcon />}
>
  {/* conteúdo */}
</Section>
```

**Implementação:**
```
py-8 px-4 | border-b | first:border-0
<h2 className="text-2xl font-syne font-bold mb-6">
h3 com ícone opcional
Conteúdo com pt-4
```

---

# COMPONENTES PRIMITIVOS UI

## 8. Button

**Arquivo:** `src/components/ui/Button.tsx`

**Props:**
```typescript
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
}
```

**Variantes:**
- **Primary:** #1A5FB4 background, white text, hover darker
- **Secondary:** white background, blue text, blue border
- **Ghost:** transparent, blue text on hover
- **Danger:** #E63946 background, white text

**Exemplo:**
```typescript
<Button variant="primary" size="lg">
  Clique aqui
</Button>
```

**Implementação:**
```
py-2 px-4 rounded-lg | transition-colors duration-200
Font: Inter medium
Loading state: disabled + spinner
Full width: w-full
```

---

## 9. Badge / Tag

**Arquivo:** `src/components/ui/Badge.tsx`

**Props:**
```typescript
interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
}
```

**Variantes:**
- Primary: Azul Correnteza
- Secondary: Azul UERN
- Success: Verde
- Warning: Amarelo
- Danger: Vermelho

**Exemplo:**
```typescript
<Badge variant="primary">Movimento</Badge>
<Badge variant="success" size="sm">Ativo</Badge>
```

---

## 10. Input

**Arquivo:** `src/components/ui/Input.tsx`

**Props:**
```typescript
interface InputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  helperText?: string;
  error?: boolean;
  disabled?: boolean;
  type?: 'text' | 'email' | 'password' | 'number';
  icon?: React.ReactNode;
}
```

**Exemplo:**
```typescript
<Input 
  label="E-mail"
  type="email"
  placeholder="seu@email.com"
  error={!!emailError}
  helperText={emailError}
/>
```

**Implementação:**
```
border border-gray-300 rounded-lg px-4 py-2
focus: border-primary-blue ring-2 ring-blue-100
error: border-red-500
w-full
```

---

## 11. Textarea

**Arquivo:** `src/components/ui/Textarea.tsx`

**Props:**
```typescript
interface TextareaProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  maxLength?: number;
  error?: boolean;
  helperText?: string;
}
```

**Exemplo:**
```typescript
<Textarea 
  label="Comentário"
  rows={4}
  maxLength={500}
  placeholder="Deixe seu comentário aqui..."
/>
```

---

## 12. Select

**Arquivo:** `src/components/ui/Select.tsx`

**Props:**
```typescript
interface SelectProps {
  label?: string;
  options: Array<{ value: string; label: string }>;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  error?: boolean;
}
```

**Exemplo:**
```typescript
<Select 
  label="Campus"
  options={campusOptions}
  placeholder="Selecione..."
  onChange={setCampus}
/>
```

---

## 13. Checkbox

**Arquivo:** `src/components/ui/Checkbox.tsx`

**Props:**
```typescript
interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  error?: boolean;
}
```

**Exemplo:**
```typescript
<Checkbox 
  checked={accepted}
  onChange={setAccepted}
  label="Aceito os termos de uso"
/>
```

---

## 14. Radio

**Arquivo:** `src/components/ui/Radio.tsx`

**Props:**
```typescript
interface RadioProps {
  name: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  label?: string;
}
```

---

## 15. Switch / Toggle

**Arquivo:** `src/components/ui/Switch.tsx`

**Props:**
```typescript
interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}
```

**Exemplo:**
```typescript
<Switch 
  checked={darkMode}
  onChange={setDarkMode}
  label="Modo escuro"
/>
```

---

## 16. Avatar

**Arquivo:** `src/components/ui/Avatar.tsx`

**Props:**
```typescript
interface AvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}
```

**Exemplo:**
```typescript
<Avatar 
  src={user.avatar}
  alt={user.name}
  size="lg"
/>
// Fallback para iniciais: JD para "João Da Silva"
```

**Implementação:**
```
rounded-full | aspect-square
sm: w-8 h-8
md: w-12 h-12
lg: w-16 h-16
bg-blue-100 text-blue-700 para fallback
```

---

## 17. Chip

**Arquivo:** `src/components/ui/Chip.tsx`

**Props:**
```typescript
interface ChipProps {
  label: string;
  onDelete?: () => void;
  onClick?: () => void;
  selected?: boolean;
  icon?: React.ReactNode;
  variant?: 'default' | 'filled';
}
```

**Exemplo:**
```typescript
<Chip 
  label="Movimento"
  selected={activeFilter === 'movement'}
  onClick={() => setActiveFilter('movement')}
/>
```

---

## 18. Divider

**Arquivo:** `src/components/ui/Divider.tsx`

**Props:**
```typescript
interface DividerProps {
  text?: string;
  className?: string;
}
```

**Exemplo:**
```typescript
<Divider text="OU" />
// Renderiza: ─── OU ───
```

---

## 19. Skeleton

**Arquivo:** `src/components/ui/Skeleton.tsx`

**Props:**
```typescript
interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string;
  count?: number;
  className?: string;
}
```

**Exemplo:**
```typescript
<Skeleton height={200} borderRadius="8px" />
<Skeleton height={20} width="80%" />
```

**Implementação:**
```
bg-gray-200 animate-pulse
shimmer effect com gradient
```

---

# COMPONENTES DE FEEDBACK

## 20. Toast / Snackbar

**Arquivo:** `src/components/feedback/Toast.tsx`

**Props:**
```typescript
interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  duration?: number; // ms
  onClose?: () => void;
}
```

**Exemplo:**
```typescript
const { showToast } = useToast();
showToast('Copiado!', 'success', 2000);
```

**Implementação:**
```
fixed bottom-6 right-6 | max-w-sm
bg-white shadow-lg rounded-lg px-6 py-4
border-l-4 (cor por tipo)
auto-dismiss após duration
z-50
```

---

## 21. Alert

**Arquivo:** `src/components/feedback/Alert.tsx`

**Props:**
```typescript
interface AlertProps {
  message: string;
  type?: 'info' | 'warning' | 'error' | 'success';
  title?: string;
  closeable?: boolean;
  onClose?: () => void;
  className?: string;
}
```

**Exemplo:**
```typescript
<Alert 
  type="warning"
  title="Atenção"
  message="Seu perfil está incompleto"
/>
```

---

## 22. Modal

**Arquivo:** `src/components/feedback/Modal.tsx`

**Props:**
```typescript
interface ModalProps {
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  actions?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}
```

**Exemplo:**
```typescript
<Modal 
  isOpen={showConfirm}
  title="Confirmar ação"
  onClose={() => setShowConfirm(false)}
  actions={<Button onClick={handleConfirm}>Confirmar</Button>}
>
  Tem certeza que deseja continuar?
</Modal>
```

---

## 23. BottomSheet

**Arquivo:** `src/components/feedback/BottomSheet.tsx`

**Propósito:** Modal inferior para mobile (drawer)

**Props:**
```typescript
interface BottomSheetProps {
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  height?: 'sm' | 'md' | 'lg';
}
```

**Implementação:**
```
fixed bottom-0 left-0 right-0
slide-in animation (translateY)
rounded-t-2xl bg-white shadow-lg
backdrop com semi-transparent overlay
h-[50vh] por padrão
```

---

## 24. Spinner

**Arquivo:** `src/components/feedback/Spinner.tsx`

**Props:**
```typescript
interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}
```

**Exemplo:**
```typescript
{isLoading && <Spinner size="lg" />}
```

**Implementação:**
```
Animated circular border
sm: w-4 h-4 | md: w-8 h-8 | lg: w-12 h-12
border: 2px | border-color: transparent to primary
```

---

## 25. EmptyState

**Arquivo:** `src/components/feedback/EmptyState.tsx`

**Props:**
```typescript
interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  image?: string;
}
```

**Exemplo:**
```typescript
<EmptyState 
  icon={<SearchIcon />}
  title="Nenhum resultado"
  description="Tente outros termos de busca"
  action={<Button>Voltar</Button>}
/>
```

---

## 26. ErrorBoundary

**Arquivo:** `src/components/feedback/ErrorBoundary.tsx`

**Propósito:** Capturar erros de componentes filhos

**Props:**
```typescript
interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: (error: Error) => React.ReactNode;
}
```

**Exemplo:**
```typescript
<ErrorBoundary>
  <ComplexComponent />
</ErrorBoundary>
```

---

# COMPONENTES DE NAVEGAÇÃO

## 27. Breadcrumb

**Arquivo:** `src/components/navigation/Breadcrumb.tsx`

**Props:**
```typescript
interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: string;
}
```

**Exemplo:**
```typescript
<Breadcrumb 
  items={[
    { label: 'Home', href: '/' },
    { label: 'Guia', href: '/guia' },
    { label: 'Matrícula', href: '/guia/matricula' },
    { label: 'Como fazer' }
  ]}
/>
```

---

## 28. Tabs

**Arquivo:** `src/components/navigation/Tabs.tsx`

**Props:**
```typescript
interface TabItem {
  label: string;
  value: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
}

interface TabsProps {
  items: TabItem[];
  defaultValue?: string;
  onChange?: (value: string) => void;
  variant?: 'default' | 'pills';
}
```

**Exemplo:**
```typescript
<Tabs 
  items={[
    { label: 'Entrar', value: 'login', content: <LoginForm /> },
    { label: 'Cadastro', value: 'register', content: <RegisterForm /> }
  ]}
  defaultValue="login"
/>
```

---

## 29. FilterChips

**Arquivo:** `src/components/navigation/FilterChips.tsx`

**Propósito:** Grupo de chips para filtrar conteúdo

**Props:**
```typescript
interface FilterChipsProps {
  options: Array<{ label: string; value: string }>;
  selected: string[];
  onChange: (selected: string[]) => void;
  multiple?: boolean;
  scrollable?: boolean;
}
```

**Exemplo:**
```typescript
<FilterChips 
  options={[
    { label: 'Movimento', value: 'movement' },
    { label: 'Acadêmico', value: 'academic' }
  ]}
  selected={selectedFilters}
  onChange={setSelectedFilters}
  multiple
/>
```

---

## 30. Pagination

**Arquivo:** `src/components/navigation/Pagination.tsx`

**Props:**
```typescript
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showPreviousNext?: boolean;
  maxPagesToShow?: number;
}
```

**Exemplo:**
```typescript
<Pagination 
  currentPage={page}
  totalPages={totalPages}
  onPageChange={setPage}
/>
```

---

## 31. SearchBar

**Arquivo:** `src/components/navigation/SearchBar.tsx`

**Props:**
```typescript
interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onSearch: (query: string) => void;
  suggestions?: string[];
  onSuggestionClick?: (suggestion: string) => void;
  size?: 'sm' | 'md' | 'lg';
}
```

**Exemplo:**
```typescript
<SearchBar 
  placeholder="Buscar no guia..."
  value={query}
  onChange={setQuery}
  onSearch={(q) => router.push(`/busca?q=${q}`)}
  suggestions={searchHistory}
  size="lg"
/>
```

---

# COMPONENTES DE CONTEÚDO

## 32. ArticleCard

**Arquivo:** `src/components/content/ArticleCard.tsx`

**Props:**
```typescript
interface ArticleCardProps {
  id: string;
  title: string;
  slug: string;
  image: string;
  category: string;
  author: string;
  date: string;
  readingTime: number;
  onClick?: () => void;
}
```

**Exemplo:**
```typescript
<ArticleCard 
  title="Assembleia Geral de 2025"
  image={heroImage}
  category="Movimento"
  author="João Silva"
  readingTime={5}
/>
```

**Implementação:**
```
Card: rounded-lg shadow hover:shadow-lg transition
Image: aspect-video object-cover rounded-t-lg
Title: font-syne text-lg font-bold
Meta: text-sm text-gray-600
Hover: elevação + imagem zoom
```

---

## 33. GuideCard

**Arquivo:** `src/components/content/GuideCard.tsx`

**Props:**
```typescript
interface GuideCardProps {
  id: string;
  title: string;
  slug: string;
  category: string;
  readingTime: number;
  icon?: React.ReactNode;
  onClick?: () => void;
}
```

**Exemplo:**
```typescript
<GuideCard 
  title="Como fazer matrícula"
  category="Matrícula"
  readingTime={12}
  icon={<DocumentIcon />}
/>
```

**Nota:** Sem imagem, mais informacional que visual

---

## 34. EventCard

**Arquivo:** `src/components/content/EventCard.tsx`

**Props:**
```typescript
interface EventCardProps {
  id: string;
  title: string;
  slug: string;
  date: string;
  time: string;
  location: string;
  campus: string;
  type: string;
  onClick?: () => void;
}
```

**Exemplo:**
```typescript
<EventCard 
  title="Assembleia Geral"
  date="2025-02-20"
  time="14:00"
  location="Biblioteca Central"
  type="Assembleia"
/>
```

**Implementação:**
```
Data em destaque (grande) no lado esquerdo
Resto das info à direita
Tipo com badge
Hover: elevação
```

---

## 35. MaterialCard

**Arquivo:** `src/components/content/MaterialCard.tsx`

**Props:**
```typescript
interface MaterialCardProps {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'link';
  category: string;
  uploadedBy: string;
  createdAt: string;
  onDownload?: () => void;
}
```

**Exemplo:**
```typescript
<MaterialCard 
  title="Cartilha de Direitos"
  type="pdf"
  category="Movimento"
  onDownload={handleDownload}
/>
```

---

## 36. CategoryCard

**Arquivo:** `src/components/content/CategoryCard.tsx`

**Props:**
```typescript
interface CategoryCardProps {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description?: string;
  articleCount: number;
  onClick?: () => void;
}
```

**Exemplo:**
```typescript
<CategoryCard 
  name="MATRÍCULA"
  icon="📝"
  articleCount={5}
  description="Tudo sobre inscrição e matrícula"
/>
```

---

## 37. FeaturedCard

**Arquivo:** `src/components/content/FeaturedCard.tsx`

**Props:**
```typescript
interface FeaturedCardProps {
  id: string;
  title: string;
  slug: string;
  image: string;
  category: string;
  description?: string;
  author?: string;
  onClick?: () => void;
}
```

**Exemplo:**
```typescript
<FeaturedCard 
  title="Assembleia de 2025"
  image={heroImage}
  description="As pautas mais importantes do semestre"
  onClick={() => router.push(`/blog/${slug}`)}
/>
```

**Implementação:**
```
Destaque visual com gradiente azul overlay
Imagem full-width
Título grande em branco
Meta embaixo
Variante: com/sem imagem
```

---

## 38. QuickAccessCard

**Arquivo:** `src/components/content/QuickAccessCard.tsx`

**Props:**
```typescript
interface QuickAccessCardProps {
  id: string;
  label: string;
  icon: string;
  href: string;
  onClick?: () => void;
}
```

**Exemplo:**
```typescript
<QuickAccessCard 
  label="Biblioteca"
  icon="📚"
  href="/guia/biblioteca"
/>
```

---

## 39. AuthorInfo

**Arquivo:** `src/components/content/AuthorInfo.tsx`

**Props:**
```typescript
interface AuthorInfoProps {
  name: string;
  avatar?: string;
  date: string;
  category?: string;
  readingTime?: number;
  layout?: 'horizontal' | 'vertical';
}
```

**Exemplo:**
```typescript
<AuthorInfo 
  name="João Silva"
  avatar={avatar}
  date="2025-02-18"
  category="Movimento"
  readingTime={5}
/>
```

---

## 40. ReadingTime

**Arquivo:** `src/components/content/ReadingTime.tsx`

**Props:**
```typescript
interface ReadingTimeProps {
  minutes: number;
  wordCount?: number;
  className?: string;
}
```

**Exemplo:**
```typescript
<ReadingTime minutes={12} />
// Renderiza: "12 min de leitura"
```

---

## 41. TableOfContents

**Arquivo:** `src/components/content/TableOfContents.tsx`

**Props:**
```typescript
interface TOCItem {
  id: string;
  title: string;
  level: number; // 2, 3, 4 para h2, h3, h4
  children?: TOCItem[];
}

interface TableOfContentsProps {
  items: TOCItem[];
  onItemClick?: (id: string) => void;
  collapsible?: boolean;
  sticky?: boolean;
}
```

**Exemplo:**
```typescript
<TableOfContents 
  items={tocItems}
  onItemClick={(id) => scrollToElement(id)}
  sticky
  collapsible={isMobile}
/>
```

---

# COMPONENTES DE TIPOGRAFIA

## 42. Heading

**Arquivo:** `src/components/typography/Heading.tsx`

**Props:**
```typescript
interface HeadingProps {
  children: React.ReactNode;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  id?: string;
}
```

**Exemplo:**
```typescript
<Heading level={1}>Título da página</Heading>
<Heading level={2}>Subtítulo</Heading>
```

**Implementação:**
```
h1: text-4xl font-syne font-bold
h2: text-3xl font-syne font-bold
h3: text-2xl font-syne font-bold
h4: text-xl font-syne font-bold
h5: text-lg font-syne font-bold
h6: text-base font-syne font-bold
Todas: text-gray-900 mt-0
```

---

## 43. Callout

**Arquivo:** `src/components/typography/Callout.tsx`

**Props:**
```typescript
interface CalloutProps {
  type: 'tip' | 'warning' | 'info' | 'important';
  title?: string;
  children: React.ReactNode;
  className?: string;
}
```

**Exemplo:**
```typescript
<Callout type="tip" title="Dica">
  Use o sistema de busca para encontrar rapidamente
</Callout>

<Callout type="warning">
  Não esqueça de levar cópias dos documentos
</Callout>
```

**Cores por tipo:**
- tip (💡): bg-blue-50 border-l-4 border-blue-500
- warning (⚠️): bg-yellow-50 border-l-4 border-yellow-500
- info (ℹ️): bg-green-50 border-l-4 border-green-500
- important (❗): bg-red-50 border-l-4 border-red-500

---

## 44. RichText

**Arquivo:** `src/components/typography/RichText.tsx`

**Props:**
```typescript
interface RichTextProps {
  content: string; // HTML string
  className?: string;
}
```

**Exemplo:**
```typescript
<RichText content={htmlContent} />
```

**Implementação:**
```typescript
// Renderiza HTML com estilos Tailwind
// Sanitiza com DOMPurify
// Styled heading, paragraphs, lists, links, code blocks
// Lazy load images com next/image
// Syntax highlighting para <code> com prism.js
```

---

# COMPONENTES DE FORMULÁRIO

## 45. SearchForm

**Arquivo:** `src/components/forms/SearchForm.tsx`

**Props:**
```typescript
interface SearchFormProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
}
```

**Exemplo:**
```typescript
<SearchForm 
  onSearch={(q) => navigate(`/search?q=${q}`)}
  placeholder="Buscar..."
  size="lg"
/>
```

---

## 46. LoginForm

**Arquivo:** `src/components/forms/LoginForm.tsx`

**Props:**
```typescript
interface LoginFormProps {
  onSubmit: (credentials: { email: string; password: string }) => Promise<void>;
  onForgotPassword?: () => void;
  onGoogleLogin?: () => void;
  isLoading?: boolean;
}
```

**Exemplo:**
```typescript
<LoginForm 
  onSubmit={handleLogin}
  onGoogleLogin={handleGoogleAuth}
/>
```

**Campos:**
- E-mail (email input)
- Senha (password input com show/hide)
- Entrar (button primary)
- Esqueceu a senha? (link)
- Entrar com Google (button secondary)

---

## 47. RegisterForm

**Arquivo:** `src/components/forms/RegisterForm.tsx`

**Props:**
```typescript
interface RegisterFormProps {
  onSubmit: (data: RegisterData) => Promise<void>;
  onGoogleSignUp?: () => void;
  isLoading?: boolean;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  course: string;
  campus: string;
  acceptTerms: boolean;
}
```

**Campos:**
- Nome completo
- E-mail
- Senha (com strength indicator)
- Confirmar senha
- Curso (select)
- Campus (select)
- Aceitar termos (checkbox)

---

## 48. FeedbackForm

**Arquivo:** `src/components/forms/FeedbackForm.tsx`

**Props:**
```typescript
interface FeedbackFormProps {
  articleId: string;
  onSubmit?: (feedback: 'helpful' | 'not_helpful') => Promise<void>;
  size?: 'sm' | 'md';
}
```

**Exemplo:**
```typescript
<FeedbackForm 
  articleId={article.id}
  onSubmit={sendFeedback}
/>
// Renderiza: "Isso foi útil?" com [👍] [👎]
```

---

## 49. ReportForm

**Arquivo:** `src/components/forms/ReportForm.tsx`

**Props:**
```typescript
interface ReportFormProps {
  articleId: string;
  onSubmit: (data: ReportData) => Promise<void>;
  onClose: () => void;
}

interface ReportData {
  email: string;
  description: string;
  type: string; // 'typo', 'broken_link', 'outdated', 'other'
}
```

**Exemplo:**
```typescript
<ReportForm 
  articleId={article.id}
  onSubmit={reportError}
  onClose={() => setShowReport(false)}
/>
```

---

## 50. CommentForm

**Arquivo:** `src/components/forms/CommentForm.tsx`

**Props:**
```typescript
interface CommentFormProps {
  articleId: string;
  onSubmit: (comment: string) => Promise<void>;
  isAuthenticated: boolean;
  onLoginClick?: () => void;
  isLoading?: boolean;
}
```

**Exemplo:**
```typescript
<CommentForm 
  articleId={article.id}
  onSubmit={postComment}
  isAuthenticated={!!user}
/>
```

---

# COMPONENTES ESPECÍFICOS / COMPOSTOS

## 51. CategoryGrid

**Arquivo:** `src/components/specific/CategoryGrid.tsx`

**Props:**
```typescript
interface CategoryGridProps {
  categories: Array<{
    id: string;
    name: string;
    slug: string;
    icon: string;
    articleCount: number;
  }>;
  onCategoryClick: (slug: string) => void;
  columns?: number;
}
```

**Exemplo:**
```typescript
<CategoryGrid 
  categories={categories}
  onCategoryClick={(slug) => navigate(`/guia/${slug}`)}
  columns={3}
/>
```

---

## 52. HorizontalScroll

**Arquivo:** `src/components/specific/HorizontalScroll.tsx`

**Props:**
```typescript
interface HorizontalScrollProps {
  children: React.ReactNode;
  showIndicator?: boolean;
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}
```

**Exemplo:**
```typescript
<HorizontalScroll showIndicator gap="md">
  <Card />
  <Card />
  <Card />
</HorizontalScroll>
```

**Implementação:**
```
overflow-x-auto scrollbar-hide
gap spacing (sm: 2, md: 4, lg: 6)
Snap points para smooth scroll
Dot indicators em mobile (opcional)
```

---

## 53. ProgressBar

**Arquivo:** `src/components/specific/ProgressBar.tsx`

**Props:**
```typescript
interface ProgressBarProps {
  progress: number; // 0-100
  position?: 'top' | 'bottom';
  color?: string;
  height?: string;
}
```

**Exemplo:**
```typescript
<ProgressBar progress={readingProgress} position="top" />
```

**Implementação:**
```
fixed top-0 w-full | bg-primary-blue
height: h-1
smooth transition: transition-all duration-300
z-40
```

---

## 54. ShareButtons

**Arquivo:** `src/components/specific/ShareButtons.tsx`

**Props:**
```typescript
interface ShareButtonsProps {
  url: string;
  title: string;
  text?: string;
  layout?: 'vertical' | 'horizontal';
  platforms?: Array<'whatsapp' | 'twitter' | 'facebook' | 'copy'>;
}
```

**Exemplo:**
```typescript
<ShareButtons 
  url={currentUrl}
  title="Artigo incrível"
  platforms={['whatsapp', 'twitter', 'copy']}
/>
```

---

## 55. ThemeToggle

**Arquivo:** `src/components/specific/ThemeToggle.tsx`

**Props:**
```typescript
interface ThemeToggleProps {
  onChange?: (theme: 'light' | 'dark') => void;
}
```

**Exemplo:**
```typescript
<ThemeToggle onChange={changeTheme} />
```

---

## 56. MemberCard

**Arquivo:** `src/components/specific/MemberCard.tsx`

**Props:**
```typescript
interface MemberCardProps {
  id: string;
  name: string;
  avatar: string;
  role: string;
  bio?: string;
  social?: {
    instagram?: string;
    twitter?: string;
    email?: string;
  };
  onEdit?: () => void;
}
```

**Exemplo:**
```typescript
<MemberCard 
  name="João Silva"
  role="Coordenador"
  bio="Ativista pela educação"
  social={{ instagram: 'joao.silva' }}
/>
```

---

# Resumo de Dependências

**Bibliotecas Principais:**
```json
{
  "react": "^18.0.0",
  "next": "^14.0.0",
  "typescript": "^5.0.0",
  "tailwindcss": "^3.0.0",
  "framer-motion": "^10.0.0",
  "react-hook-form": "^7.0.0",
  "zod": "^3.0.0",
  "next-image-export-optimizer": "^1.0.0",
  "react-big-calendar": "^1.0.0",
  "dompurify": "^2.0.0",
  "prism-react-renderer": "^2.0.0",
  "react-icons": "^4.0.0"
}
```

---

# Padrões de Implementação Global

1. **Tipagem:** Sempre usar TypeScript com interfaces explícitas
2. **Acessibilidade:** ARIA labels, roles, keyboard navigation
3. **Performance:** Lazy loading, code splitting, memoization onde necessário
4. **Estilos:** Tailwind CSS com variáveis customizadas
5. **Testing:** Cada componente deve ter testes de snapshot e funcionais
6. **Documentação:** Storybook stories para cada componente


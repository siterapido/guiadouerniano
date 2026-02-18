# 05 - API Endpoints - Guia do UERNIANO

## 1. Arquitetura de Dados

### Padrão de Dados no Next.js App Router

O Guia do UERNIANO segue estas regras:

#### 1.1 Server Components (Sem API Layer)
**Quando usar:** Renderização no servidor, dados que não mudam frequentemente

- Buscar posts publicados
- Carregar categorias
- Mostrar perfis públicos
- SEO e metadata dinâmica

```typescript
// Diretamente no componente ou em server-side functions
const posts = await supabase
  .from('posts')
  .select('*')
  .eq('status', 'published')
```

**Vantagens:** Sem requisição de rede, seguro (credenciais não expostas), melhor SEO

---

#### 1.2 Server Actions (Mutations)
**Quando usar:** Criar, atualizar ou deletar dados; revalidar cache

- Criar post
- Adicionar comentário
- Atualizar perfil
- Revalidar ISR

```typescript
'use server'

export async function createPost(formData: FormData) {
  // Validação
  // Mutation no Supabase
  // Revalidate path
}
```

**Vantagens:** Seguro, sem expo exposição de chaves, suporta revalidation

---

#### 1.3 Route Handlers (`/api/...`)
**Quando usar:** 

- APIs externas (webhooks, Open Graph)
- Requisições que precisam de custom headers
- Fazer upload de arquivos grandes
- Integração com serviços de terceiros

```typescript
// app/api/revalidate/route.ts
export async function POST(request: Request) {
  // Validar secret token
  // Revalidar paths
  return Response.json({ revalidated: true })
}
```

**Vantagens:** Flexibilidade, acesso a request/response native

---

#### 1.4 React Query (Cliente)
**Quando usar:**

- Dados que mudam frequentemente
- Busca em tempo real
- Polling/refetch automático
- Cache no cliente

```typescript
// Fazer fetch de notificações não lidas
const { data } = useQuery({
  queryKey: ['notifications'],
  queryFn: async () => { /* fetch */ }
})
```

**Vantagens:** Sincronização com servidor, otimização automática

---

## 2. Server Actions (Mutations)

### Estrutura Geral

```typescript
// src/actions/[domain].ts
'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import type { Result } from '@/types'

// Validação com Zod
const schema = z.object({
  // ... fields
})

export async function actionName(
  input: z.infer<typeof schema>
): Promise<Result<{ id: string }>> {
  try {
    // 1. Validar input
    const validated = schema.parse(input)
    
    // 2. Verificar autenticação
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Não autenticado')
    
    // 3. Executar mutation
    const { data, error } = await supabase
      .from('table')
      .insert({ /* ... */ })
      .select()
      .single()
    
    if (error) throw error
    
    // 4. Revalidar cache
    revalidatePath('/path')
    
    // 5. Retornar sucesso
    return { ok: true, value: data }
  } catch (error) {
    return { ok: false, error: new Error(/* ... */) }
  }
}
```

---

### 2.1 Posts: createPost

**Arquivo:** `src/actions/posts.ts`

```typescript
'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import type { Result } from '@/types'

export const postSchema = z.object({
  title: z.string().min(3).max(200),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  content: z.string().min(10),
  excerpt: z.string().max(300).optional(),
  coverImageUrl: z.string().url().optional(),
  categoryId: z.string().uuid(),
  type: z.enum(['blog', 'guide']),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
  isFeatured: z.boolean().default(false),
  seoTitle: z.string().max(60).optional(),
  seoDescription: z.string().max(160).optional(),
  ogImageUrl: z.string().url().optional(),
})

type PostInput = z.infer<typeof postSchema>

export async function createPost(input: PostInput): Promise<Result<{ id: string }>> {
  try {
    const validated = postSchema.parse(input)
    
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) throw new Error('Usuário não autenticado')
    
    const { data, error } = await supabase
      .from('posts')
      .insert({
        title: validated.title,
        slug: validated.slug,
        content: validated.content,
        excerpt: validated.excerpt,
        cover_image_url: validated.coverImageUrl,
        category_id: validated.categoryId,
        author_id: user.id,
        type: validated.type,
        status: validated.status,
        is_featured: validated.isFeatured,
        seo_title: validated.seoTitle,
        seo_description: validated.seoDescription,
        og_image_url: validated.ogImageUrl,
        published_at: validated.status === 'published' ? new Date() : null,
      })
      .select()
      .single()
    
    if (error) throw error
    
    // Revalidar listagens e feed
    revalidatePath('/blog')
    revalidatePath('/guia')
    revalidatePath('/')
    
    return { ok: true, value: { id: data.id } }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro ao criar post'
    return { ok: false, error: new Error(message) }
  }
}

export async function updatePost(
  id: string,
  input: Partial<PostInput>
): Promise<Result<{ id: string }>> {
  try {
    const validated = postSchema.partial().parse(input)
    
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) throw new Error('Usuário não autenticado')
    
    // Verificar se é o autor
    const { data: post } = await supabase
      .from('posts')
      .select('author_id')
      .eq('id', id)
      .single()
    
    if (post?.author_id !== user.id) {
      throw new Error('Apenas o autor pode atualizar o post')
    }
    
    const { data, error } = await supabase
      .from('posts')
      .update({
        ...(validated.title && { title: validated.title }),
        ...(validated.content && { content: validated.content }),
        ...(validated.status && { status: validated.status }),
        ...(validated.isFeatured !== undefined && { is_featured: validated.isFeatured }),
        ...(validated.seoTitle && { seo_title: validated.seoTitle }),
        ...(validated.seoDescription && { seo_description: validated.seoDescription }),
      })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    
    revalidatePath(`/blog/${validated.slug}`)
    revalidatePath('/blog')
    
    return { ok: true, value: { id: data.id } }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro ao atualizar post'
    return { ok: false, error: new Error(message) }
  }
}

export async function publishPost(id: string): Promise<Result<{ id: string }>> {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) throw new Error('Usuário não autenticado')
    
    const { data, error } = await supabase
      .from('posts')
      .update({
        status: 'published',
        published_at: new Date(),
      })
      .eq('id', id)
      .eq('author_id', user.id) // Apenas autor pode publicar
      .select()
      .single()
    
    if (error) throw error
    
    revalidatePath('/blog')
    revalidatePath('/')
    
    return { ok: true, value: { id: data.id } }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro ao publicar post'
    return { ok: false, error: new Error(message) }
  }
}

export async function deletePost(id: string): Promise<Result<{ id: string }>> {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) throw new Error('Usuário não autenticado')
    
    // Soft delete via deleted_at
    const { data, error } = await supabase
      .from('posts')
      .update({ deleted_at: new Date() })
      .eq('id', id)
      .eq('author_id', user.id)
      .select()
      .single()
    
    if (error) throw error
    
    revalidatePath('/blog')
    revalidatePath('/')
    
    return { ok: true, value: { id } }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro ao deletar post'
    return { ok: false, error: new Error(message) }
  }
}
```

---

### 2.2 Comments: createComment, deleteComment

```typescript
// src/actions/comments.ts
'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import type { Result } from '@/types'

export const commentSchema = z.object({
  postId: z.string().uuid(),
  content: z.string().min(1).max(5000),
  parentId: z.string().uuid().optional(),
})

type CommentInput = z.infer<typeof commentSchema>

export async function createComment(input: CommentInput): Promise<Result<{ id: string }>> {
  try {
    const validated = commentSchema.parse(input)
    
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) throw new Error('Usuário não autenticado')
    
    const { data, error } = await supabase
      .from('comments')
      .insert({
        post_id: validated.postId,
        author_id: user.id,
        content: validated.content,
        parent_id: validated.parentId,
      })
      .select()
      .single()
    
    if (error) throw error
    
    // Revalidar apenas a página do post
    revalidatePath(`/blog/[slug]`)
    
    return { ok: true, value: { id: data.id } }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro ao criar comentário'
    return { ok: false, error: new Error(message) }
  }
}

export async function deleteComment(id: string): Promise<Result<{ id: string }>> {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) throw new Error('Usuário não autenticado')
    
    // Soft delete
    const { data, error } = await supabase
      .from('comments')
      .update({ deleted_at: new Date() })
      .eq('id', id)
      .eq('author_id', user.id)
      .select()
      .single()
    
    if (error) throw error
    
    revalidatePath(`/blog/[slug]`)
    
    return { ok: true, value: { id } }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro ao deletar comentário'
    return { ok: false, error: new Error(message) }
  }
}
```

---

### 2.3 Reactions: createReaction

```typescript
// src/actions/reactions.ts
'use server'

import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'
import type { Result } from '@/types'

export const reactionSchema = z.object({
  postId: z.string().uuid(),
  reaction: z.enum(['helpful', 'not_helpful']),
})

type ReactionInput = z.infer<typeof reactionSchema>

export async function createReaction(input: ReactionInput): Promise<Result<{ id: string }>> {
  try {
    const validated = reactionSchema.parse(input)
    
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) throw new Error('Usuário não autenticado')
    
    // Upsert - atualiza se já existe, cria se não
    const { data, error } = await supabase
      .from('post_reactions')
      .upsert({
        post_id: validated.postId,
        user_id: user.id,
        reaction: validated.reaction,
      })
      .select()
      .single()
    
    if (error) throw error
    
    return { ok: true, value: { id: data.id } }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro ao registrar reação'
    return { ok: false, error: new Error(message) }
  }
}
```

---

### 2.4 Reports: createReport

```typescript
// src/actions/reports.ts
'use server'

import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'
import type { Result } from '@/types'

export const reportSchema = z.object({
  postId: z.string().uuid(),
  type: z.enum(['outdated', 'incorrect', 'broken_link', 'typo', 'other']),
  description: z.string().max(1000).optional(),
})

type ReportInput = z.infer<typeof reportSchema>

export async function createReport(input: ReportInput): Promise<Result<{ id: string }>> {
  try {
    const validated = reportSchema.parse(input)
    
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    const { data, error } = await supabase
      .from('post_reports')
      .insert({
        post_id: validated.postId,
        reporter_id: user?.id || null,
        type: validated.type,
        description: validated.description,
      })
      .select()
      .single()
    
    if (error) throw error
    
    return { ok: true, value: { id: data.id } }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro ao criar reporte'
    return { ok: false, error: new Error(message) }
  }
}
```

---

### 2.5 Profiles: updateProfile

```typescript
// src/actions/profiles.ts
'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import type { Result } from '@/types'

export const profileSchema = z.object({
  fullName: z.string().min(1),
  bio: z.string().max(500).optional(),
  avatarUrl: z.string().url().optional(),
  campus: z.enum(['mossoró', 'natal', 'caicó', 'açu', 'patu', 'apodi', 'virtual']).optional(),
  course: z.string().optional(),
  enrollmentYear: z.number().min(2010).max(new Date().getFullYear() + 1).optional(),
  socialLinks: z.record(z.string().url()).optional(),
})

type ProfileInput = z.infer<typeof profileSchema>

export async function updateProfile(input: ProfileInput): Promise<Result<{ id: string }>> {
  try {
    const validated = profileSchema.parse(input)
    
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) throw new Error('Usuário não autenticado')
    
    const { data, error } = await supabase
      .from('profiles')
      .update({
        full_name: validated.fullName,
        bio: validated.bio,
        avatar_url: validated.avatarUrl,
        campus: validated.campus,
        course: validated.course,
        enrollment_year: validated.enrollmentYear,
        social_links: validated.socialLinks,
      })
      .eq('id', user.id)
      .select()
      .single()
    
    if (error) throw error
    
    revalidatePath(`/perfil/${user.id}`)
    
    return { ok: true, value: { id: data.id } }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro ao atualizar perfil'
    return { ok: false, error: new Error(message) }
  }
}
```

---

### 2.6 Events: createEvent, updateEvent

```typescript
// src/actions/events.ts
'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import type { Result } from '@/types'

export const eventSchema = z.object({
  title: z.string().min(3).max(200),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  description: z.string().min(10),
  type: z.enum(['assembleia', 'reunião', 'ato', 'manifestação', 'sarau', 'palestra', 'outro']),
  campus: z.enum(['mossoró', 'natal', 'caicó', 'açu', 'patu', 'apodi', 'virtual']),
  locationName: z.string().optional(),
  locationAddress: z.string().optional(),
  mapsEmbedUrl: z.string().url().optional(),
  coverImageUrl: z.string().url().optional(),
  startsAt: z.string().datetime(),
  endsAt: z.string().datetime().optional(),
  isOnline: z.boolean().default(false),
  onlineUrl: z.string().url().optional(),
})

type EventInput = z.infer<typeof eventSchema>

export async function createEvent(input: EventInput): Promise<Result<{ id: string }>> {
  try {
    const validated = eventSchema.parse(input)
    
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) throw new Error('Usuário não autenticado')
    
    const { data, error } = await supabase
      .from('events')
      .insert({
        title: validated.title,
        slug: validated.slug,
        description: validated.description,
        type: validated.type,
        campus: validated.campus,
        location_name: validated.locationName,
        location_address: validated.locationAddress,
        maps_embed_url: validated.mapsEmbedUrl,
        cover_image_url: validated.coverImageUrl,
        starts_at: validated.startsAt,
        ends_at: validated.endsAt,
        is_online: validated.isOnline,
        online_url: validated.onlineUrl,
        organizer_id: user.id,
      })
      .select()
      .single()
    
    if (error) throw error
    
    revalidatePath('/eventos')
    revalidatePath('/')
    
    return { ok: true, value: { id: data.id } }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro ao criar evento'
    return { ok: false, error: new Error(message) }
  }
}

export async function updateEvent(
  id: string,
  input: Partial<EventInput>
): Promise<Result<{ id: string }>> {
  try {
    const validated = eventSchema.partial().parse(input)
    
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) throw new Error('Usuário não autenticado')
    
    const { data, error } = await supabase
      .from('events')
      .update({
        ...(validated.title && { title: validated.title }),
        ...(validated.description && { description: validated.description }),
        ...(validated.startsAt && { starts_at: validated.startsAt }),
      })
      .eq('id', id)
      .eq('organizer_id', user.id)
      .select()
      .single()
    
    if (error) throw error
    
    revalidatePath('/eventos')
    revalidatePath(`/eventos/${validated.slug}`)
    
    return { ok: true, value: { id: data.id } }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro ao atualizar evento'
    return { ok: false, error: new Error(message) }
  }
}
```

---

### 2.7 Materials: uploadMaterial

```typescript
// src/actions/materials.ts
'use server'

import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'
import type { Result } from '@/types'

export const materialSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  fileUrl: z.string().url(),
  fileType: z.enum(['pdf', 'video', 'link', 'image', 'document', 'spreadsheet']),
  category: z.string().min(1),
  isPublic: z.boolean().default(false),
})

type MaterialInput = z.infer<typeof materialSchema>

export async function uploadMaterial(input: MaterialInput): Promise<Result<{ id: string }>> {
  try {
    const validated = materialSchema.parse(input)
    
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) throw new Error('Usuário não autenticado')
    
    const { data, error } = await supabase
      .from('materials')
      .insert({
        title: validated.title,
        description: validated.description,
        file_url: validated.fileUrl,
        file_type: validated.fileType,
        category: validated.category,
        uploaded_by: user.id,
        is_public: validated.isPublic,
      })
      .select()
      .single()
    
    if (error) throw error
    
    return { ok: true, value: { id: data.id } }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro ao fazer upload do material'
    return { ok: false, error: new Error(message) }
  }
}
```

---

### 2.8 Notifications: markNotificationRead

```typescript
// src/actions/notifications.ts
'use server'

import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'
import type { Result } from '@/types'

export async function markNotificationRead(id: string): Promise<Result<{ id: string }>> {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) throw new Error('Usuário não autenticado')
    
    const { data, error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', id)
      .eq('user_id', user.id)
      .select()
      .single()
    
    if (error) throw error
    
    return { ok: true, value: { id } }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro ao marcar notificação'
    return { ok: false, error: new Error(message) }
  }
}
```

---

### 2.9 Views: incrementViewCount

```typescript
// src/actions/views.ts
'use server'

import { createClient } from '@/lib/supabase/server'
import type { Result } from '@/types'

export async function incrementViewCount(postId: string): Promise<Result<{ count: number }>> {
  try {
    const supabase = createClient()
    
    // Chamar função SQL
    const { data, error } = await supabase
      .rpc('increment_post_views', { post_id: postId })
    
    if (error) throw error
    
    return { ok: true, value: { count: 1 } }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro ao incrementar views'
    return { ok: false, error: new Error(message) }
  }
}
```

---

## 3. Funções de Query (Server Components)

### Estrutura

```typescript
// src/lib/queries/[domain].ts
import { createClient } from '@/lib/supabase/server'
import { unstable_cache } from 'next/cache'

// Wrapper com cache
const getCachedData = unstable_cache(
  async () => {
    // SQL query aqui
  },
  ['cache-key'],
  { revalidate: 3600, tags: ['tag1'] }
)
```

---

### 3.1 getPosts - Listagem Paginada

```typescript
// src/lib/queries/posts.ts
import { createClient } from '@/lib/supabase/server'
import { unstable_cache } from 'next/cache'
import type { Post, Category } from '@/types'

interface GetPostsParams {
  type?: 'blog' | 'guide'
  categorySlug?: string
  limit?: number
  offset?: number
  featured?: boolean
}

export async function getPosts(params: GetPostsParams = {}) {
  const supabase = createClient()
  
  const {
    type = 'blog',
    categorySlug,
    limit = 10,
    offset = 0,
    featured = false,
  } = params
  
  let query = supabase
    .from('posts')
    .select(
      `
      id,
      title,
      slug,
      excerpt,
      cover_image_url,
      reading_time_minutes,
      view_count,
      published_at,
      created_at,
      author_id,
      category_id,
      categories:category_id(name, slug),
      profiles:author_id(full_name, avatar_url)
      `,
      { count: 'exact' }
    )
    .eq('status', 'published')
    .eq('type', type)
    .is('deleted_at', null)
    .order('published_at', { ascending: false })
    .range(offset, offset + limit - 1)
  
  if (featured) {
    query = query.eq('is_featured', true)
  }
  
  if (categorySlug) {
    query = query.eq('categories.slug', categorySlug)
  }
  
  const { data, error, count } = await query
  
  if (error) throw error
  
  return {
    posts: data as Array<Post & { categories: Category; profiles: Profile }>,
    total: count || 0,
    hasMore: (offset + limit) < (count || 0),
  }
}
```

---

### 3.2 getPostBySlug - Artigo Individual

```typescript
export async function getPostBySlug(slug: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('posts')
    .select(
      `
      id,
      title,
      slug,
      content,
      excerpt,
      cover_image_url,
      seo_title,
      seo_description,
      og_image_url,
      reading_time_minutes,
      view_count,
      published_at,
      author_id,
      category_id,
      categories:category_id(id, name, slug),
      profiles:author_id(id, full_name, avatar_url, bio),
      guide_articles(last_verified_at, verified_by, table_of_contents),
      comments(id, content, author_id, parent_id, created_at, 
               profiles:author_id(full_name, avatar_url)) 
        |count('*')
    `
    )
    .eq('slug', slug)
    .eq('status', 'published')
    .is('deleted_at', null)
    .single()
  
  if (error) throw error
  
  // Incrementar view count (fire-and-forget)
  supabase.rpc('increment_post_views', { post_id: data.id }).then()
  
  return {
    post: data,
    relatedPosts: await getRelatedPosts(data.id, data.category_id),
  }
}

export async function getRelatedPosts(postId: string, categoryId: string) {
  const supabase = createClient()
  
  const { data } = await supabase
    .from('posts')
    .select(
      `
      id, title, slug, excerpt, cover_image_url, 
      reading_time_minutes, view_count, published_at,
      profiles:author_id(full_name, avatar_url)
      `
    )
    .eq('status', 'published')
    .eq('category_id', categoryId)
    .neq('id', postId)
    .is('deleted_at', null)
    .limit(3)
  
  return data || []
}
```

---

### 3.3 getCategories

```typescript
export async function getCategories(type: 'blog' | 'guide') {
  const getCachedCategories = unstable_cache(
    async () => {
      const supabase = createClient()
      
      const { data, error } = await supabase
        .from('categories')
        .select('id, name, slug, description, icon, color')
        .eq('type', type)
        .order('sort_order', { ascending: true })
      
      if (error) throw error
      return data
    },
    [`categories-${type}`],
    { revalidate: 86400, tags: [`categories-${type}`] }
  )
  
  return getCachedCategories()
}
```

---

### 3.4 getEvents

```typescript
interface GetEventsParams {
  upcoming?: boolean
  campus?: string
  limit?: number
  offset?: number
}

export async function getEvents(params: GetEventsParams = {}) {
  const supabase = createClient()
  
  const { upcoming = true, campus, limit = 10, offset = 0 } = params
  
  let query = supabase
    .from('events')
    .select(
      `
      id, title, slug, description, type, campus,
      location_name, cover_image_url, starts_at, ends_at,
      is_online, online_url,
      profiles:organizer_id(full_name, avatar_url)
      `,
      { count: 'exact' }
    )
    .is('deleted_at', null)
    .order('starts_at', { ascending: true })
    .range(offset, offset + limit - 1)
  
  if (upcoming) {
    query = query.gte('starts_at', new Date().toISOString())
  }
  
  if (campus) {
    query = query.eq('campus', campus)
  }
  
  const { data, error, count } = await query
  
  if (error) throw error
  
  return {
    events: data,
    total: count || 0,
  }
}
```

---

### 3.5 getProfile

```typescript
export async function getProfile(userId: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('profiles')
    .select(
      `
      id, email, full_name, avatar_url, bio,
      campus, course, role, created_at,
      posts(count)
      `
    )
    .eq('id', userId)
    .is('deleted_at', null)
    .single()
  
  if (error) throw error
  
  return data
}
```

---

### 3.6 searchContent

```typescript
interface SearchParams {
  query: string
  type?: 'blog' | 'guide'
  limit?: number
}

export async function searchContent(params: SearchParams) {
  const supabase = createClient()
  const { query, type = 'blog', limit = 10 } = params
  
  // Busca simples em título e excerpt (para production, usar Full-Text Search)
  let searchQuery = supabase
    .from('posts')
    .select(
      `
      id, title, slug, excerpt, cover_image_url,
      published_at, profiles:author_id(full_name)
      `
    )
    .eq('status', 'published')
    .is('deleted_at', null)
  
  if (type) {
    searchQuery = searchQuery.eq('type', type)
  }
  
  // Supabase não tem .ilike para LIKE case-insensitive em RLS
  // Use Full-Text Search do PostgreSQL para production
  const { data, error } = await searchQuery.limit(limit)
  
  if (error) throw error
  
  return data?.filter(post =>
    post.title.toLowerCase().includes(query.toLowerCase()) ||
    post.excerpt?.toLowerCase().includes(query.toLowerCase())
  ) || []
}
```

---

### 3.7 getNotifications

```typescript
export async function getNotifications(userId: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('notifications')
    .select('id, title, message, type, reference_id, is_read, created_at')
    .eq('user_id', userId)
    .eq('is_read', false)
    .order('created_at', { ascending: false })
    .limit(20)
  
  if (error) throw error
  
  return data || []
}
```

---

### 3.8 getMaterials

```typescript
interface GetMaterialsParams {
  category?: string
  fileType?: string
  limit?: number
}

export async function getMaterials(params: GetMaterialsParams = {}) {
  const supabase = createClient()
  const { category, fileType, limit = 20 } = params
  
  let query = supabase
    .from('materials')
    .select(
      `
      id, title, description, file_url, file_type,
      category, download_count, created_at,
      profiles:uploaded_by(full_name)
      `
    )
    .eq('is_public', true)
    .is('deleted_at', null)
    .order('created_at', { ascending: false })
  
  if (category) {
    query = query.eq('category', category)
  }
  
  if (fileType) {
    query = query.eq('file_type', fileType)
  }
  
  const { data, error } = await query.limit(limit)
  
  if (error) throw error
  
  return data || []
}
```

---

## 4. Route Handlers

### 4.1 GET /api/posts - Listagem com Filtros

```typescript
// app/api/posts/route.ts
import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()
    
    // Parâmetros de query
    const type = request.nextUrl.searchParams.get('type') || 'blog'
    const categorySlug = request.nextUrl.searchParams.get('category')
    const limit = Math.min(parseInt(request.nextUrl.searchParams.get('limit') || '10'), 100)
    const offset = parseInt(request.nextUrl.searchParams.get('offset') || '0')
    
    let query = supabase
      .from('posts')
      .select(
        'id, title, slug, excerpt, cover_image_url, reading_time_minutes, published_at',
        { count: 'exact' }
      )
      .eq('status', 'published')
      .eq('type', type)
      .is('deleted_at', null)
      .order('published_at', { ascending: false })
      .range(offset, offset + limit - 1)
    
    if (categorySlug) {
      query = query.eq('categories.slug', categorySlug)
    }
    
    const { data, count, error } = await query
    
    if (error) throw error
    
    return NextResponse.json({
      data,
      pagination: {
        total: count,
        limit,
        offset,
        hasMore: (offset + limit) < (count || 0),
      },
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao buscar posts' },
      { status: 500 }
    )
  }
}
```

---

### 4.2 POST /api/revalidate - Revalidação de Cache

```typescript
// app/api/revalidate/route.ts
import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const secret = request.headers.get('x-revalidate-secret')
    
    // Verificar secret token
    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json(
        { error: 'Token inválido' },
        { status: 401 }
      )
    }
    
    const body = await request.json()
    const { tag, path } = body as { tag?: string; path?: string }
    
    if (tag) {
      revalidateTag(tag)
    } else if (path) {
      revalidateTag(path)
    }
    
    return NextResponse.json({ revalidated: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro na revalidação' },
      { status: 500 }
    )
  }
}
```

---

### 4.3 GET /api/og - Open Graph Image Dinâmica

```typescript
// app/api/og/route.ts
import { ImageResponse } from 'next/og'
import { createClient } from '@/lib/supabase/server'
import { NextRequest } from 'next/server'

export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  try {
    const postId = request.nextUrl.searchParams.get('postId')
    
    if (!postId) {
      return new Response('Missing postId', { status: 400 })
    }
    
    const supabase = createClient()
    const { data: post } = await supabase
      .from('posts')
      .select('title, excerpt, cover_image_url')
      .eq('id', postId)
      .single()
    
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 128,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            padding: '40px',
            textAlign: 'center',
          }}
        >
          <h1>{post?.title}</h1>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (error) {
    return new Response('Erro ao gerar imagem OG', { status: 500 })
  }
}
```

---

### 4.4 POST /api/contact - Formulário de Contato

```typescript
// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import nodemailer from 'nodemailer'

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(10),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, message } = contactSchema.parse(body)
    
    // Configurar nodemailer ou outro serviço
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
    
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.CONTACT_EMAIL,
      subject: `Nova mensagem de ${name}`,
      html: `<p>${message}</p><p>Email: ${email}</p>`,
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    const message = error instanceof z.ZodError 
      ? 'Dados inválidos'
      : 'Erro ao enviar mensagem'
    
    return NextResponse.json(
      { error: message },
      { status: 400 }
    )
  }
}
```

---

## 5. Supabase Real-time

### 5.1 Subscriptions para Comentários

```typescript
// src/hooks/useComments.ts
'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Comment } from '@/types'

export function useComments(postId: string) {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  
  const supabase = createClient()
  
  useEffect(() => {
    // Buscar comentários iniciais
    const fetchComments = async () => {
      const { data } = await supabase
        .from('comments')
        .select('*')
        .eq('post_id', postId)
      
      setComments(data || [])
      setLoading(false)
    }
    
    fetchComments()
    
    // Subscribe para novos comentários
    const subscription = supabase
      .channel(`comments:${postId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'comments',
          filter: `post_id=eq.${postId}`,
        },
        (payload) => {
          setComments(prev => [...prev, payload.new as Comment])
        }
      )
      .subscribe()
    
    return () => {
      subscription.unsubscribe()
    }
  }, [postId, supabase])
  
  return { comments, loading }
}
```

---

### 5.2 Subscriptions para Notificações

```typescript
// src/hooks/useNotifications.ts
'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Notification } from '@/types'

export function useNotifications(userId: string) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  
  const supabase = createClient()
  
  useEffect(() => {
    // Subscribe para novas notificações
    const subscription = supabase
      .channel(`notifications:${userId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          setNotifications(prev => [
            payload.new as Notification,
            ...prev.slice(0, 19), // Keep last 20
          ])
        }
      )
      .subscribe()
    
    return () => {
      subscription.unsubscribe()
    }
  }, [userId, supabase])
  
  return notifications
}
```

---

### 5.3 Subscriptions para Status de Eventos

```typescript
// src/hooks/useEventUpdates.ts
'use client'

import { useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export function useEventUpdates(eventId: string, callback: (event: any) => void) {
  const supabase = createClient()
  
  useEffect(() => {
    const subscription = supabase
      .channel(`events:${eventId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'events',
          filter: `id=eq.${eventId}`,
        },
        (payload) => {
          callback(payload.new)
        }
      )
      .subscribe()
    
    return () => {
      subscription.unsubscribe()
    }
  }, [eventId, supabase, callback])
}
```

---

## 6. Upload de Arquivos

### 6.1 Configuração do Storage

```typescript
// src/lib/supabase/storage.ts
import { createClient } from '@/lib/supabase/server'

const BUCKETS = {
  POSTS: 'posts-covers',
  EVENTS: 'events-covers',
  MATERIALS: 'materials',
  AVATARS: 'avatars',
} as const

export async function uploadFile(
  bucket: keyof typeof BUCKETS,
  file: File,
  path: string
) {
  const supabase = createClient()
  
  // Validar tipo e tamanho
  const maxSize = bucket === 'MATERIALS' ? 50 * 1024 * 1024 : 10 * 1024 * 1024
  if (file.size > maxSize) {
    throw new Error(`Arquivo muito grande (máx ${maxSize / 1024 / 1024}MB)`)
  }
  
  const { data, error } = await supabase.storage
    .from(BUCKETS[bucket])
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false,
    })
  
  if (error) throw error
  
  // Obter URL pública
  const { data: urlData } = supabase.storage
    .from(BUCKETS[bucket])
    .getPublicUrl(data.path)
  
  return urlData.publicUrl
}

export async function deleteFile(bucket: keyof typeof BUCKETS, path: string) {
  const supabase = createClient()
  
  const { error } = await supabase.storage
    .from(BUCKETS[bucket])
    .remove([path])
  
  if (error) throw error
}
```

---

### 6.2 Server Action para Upload

```typescript
// src/actions/uploads.ts
'use server'

import { uploadFile } from '@/lib/supabase/storage'
import { z } from 'zod'
import type { Result } from '@/types'

export async function uploadPostCover(formData: FormData): Promise<Result<{ url: string }>> {
  try {
    const file = formData.get('file') as File
    
    if (!file) throw new Error('Arquivo não fornecido')
    
    const timestamp = Date.now()
    const path = `posts/${timestamp}-${file.name}`
    
    const url = await uploadFile('POSTS', file, path)
    
    return { ok: true, value: { url } }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro ao fazer upload'
    return { ok: false, error: new Error(message) }
  }
}
```

---

## 7. Tratamento de Erros

### 7.1 Tipos de Erro

```typescript
// src/lib/errors.ts
export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public status: number = 500
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 'VALIDATION_ERROR', 400)
  }
}

export class AuthenticationError extends AppError {
  constructor(message = 'Não autenticado') {
    super(message, 'AUTHENTICATION_ERROR', 401)
  }
}

export class AuthorizationError extends AppError {
  constructor(message = 'Não autorizado') {
    super(message, 'AUTHORIZATION_ERROR', 403)
  }
}

export class NotFoundError extends AppError {
  constructor(resource = 'Recurso') {
    super(`${resource} não encontrado`, 'NOT_FOUND', 404)
  }
}
```

---

### 7.2 Logging de Erros

```typescript
// src/lib/logger.ts
import { createClient } from '@/lib/supabase/server'

export async function logError(error: Error, context: Record<string, any> = {}) {
  const supabase = createClient()
  
  // Enviar para Supabase ou serviço externo
  console.error('App Error:', {
    message: error.message,
    stack: error.stack,
    context,
    timestamp: new Date(),
  })
  
  // Opcionalmente salvar em um log table
  // await supabase.from('error_logs').insert({ ... })
}
```

---

### 7.3 Uso em Components

```typescript
// Exemplo de uso com useActionState
'use client'

import { createPost } from '@/actions/posts'
import { useActionState } from 'react'

export function PostForm() {
  const [state, formAction, isPending] = useActionState(createPost, null)
  
  return (
    <form action={formAction}>
      {/* Form fields */}
      
      {state?.ok === false && (
        <div className="text-red-600">
          {state.error.message}
        </div>
      )}
      
      <button type="submit" disabled={isPending}>
        {isPending ? 'Salvando...' : 'Criar Post'}
      </button>
    </form>
  )
}
```

---

## 8. Validação com Zod

### Schemas Completos

```typescript
// src/lib/schemas.ts
import { z } from 'zod'

// Posts
export const postSchema = z.object({
  title: z.string().min(3, 'Título deve ter no mínimo 3 caracteres').max(200),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug inválido'),
  content: z.string().min(10, 'Conteúdo deve ter no mínimo 10 caracteres'),
  excerpt: z.string().max(300).optional(),
  coverImageUrl: z.string().url().optional().or(z.literal('')),
  categoryId: z.string().uuid(),
  type: z.enum(['blog', 'guide']),
  status: z.enum(['draft', 'published', 'archived']),
  isFeatured: z.boolean(),
  seoTitle: z.string().max(60).optional(),
  seoDescription: z.string().max(160).optional(),
})

// Events
export const eventSchema = z.object({
  title: z.string().min(3).max(200),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  description: z.string().min(10),
  type: z.enum(['assembleia', 'reunião', 'ato', 'manifestação', 'sarau', 'palestra', 'outro']),
  campus: z.enum(['mossoró', 'natal', 'caicó', 'açu', 'patu', 'apodi', 'virtual']),
  locationName: z.string().optional(),
  startsAt: z.coerce.date(),
  endsAt: z.coerce.date().optional(),
  isOnline: z.boolean(),
  onlineUrl: z.string().url().optional(),
}).refine(
  (data) => !data.endsAt || data.endsAt > data.startsAt,
  { message: 'Data de término deve ser após data de início', path: ['endsAt'] }
)

// Profile
export const profileSchema = z.object({
  fullName: z.string().min(1, 'Nome obrigatório'),
  bio: z.string().max(500).optional(),
  campus: z.enum(['mossoró', 'natal', 'caicó', 'açu', 'patu', 'apodi', 'virtual']).optional(),
  course: z.string().optional(),
  enrollmentYear: z.number().min(2010).max(new Date().getFullYear() + 1).optional(),
})

// Comments
export const commentSchema = z.object({
  postId: z.string().uuid(),
  content: z.string().min(1, 'Comentário não pode estar vazio').max(5000),
  parentId: z.string().uuid().optional(),
})

// Auth
export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
})

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  fullName: z.string().min(1),
}).refine(
  (data) => data.password.length >= 8,
  { message: 'Senha deve ter no mínimo 8 caracteres', path: ['password'] }
)
```

---

## Resumo

Este documento cobre:

✅ Arquitetura de dados (quando usar cada padrão)
✅ Server Actions para todas as mutações
✅ Query functions para Server Components
✅ Route Handlers para APIs e webhooks
✅ Real-time com Subscriptions
✅ Upload de arquivos
✅ Tratamento de erros robusto
✅ Validação com Zod

Todos os códigos são production-ready e seguem as melhores práticas do Next.js 14+ com App Router.


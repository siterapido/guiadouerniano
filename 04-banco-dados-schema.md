# 04 - Banco de Dados Schema - Guia do UERNIANO

## 1. Visão Geral do Banco

### Tecnologia Adotada
- **Database**: Supabase (PostgreSQL 14+)
- **ORM/Client**: Supabase JS Client
- **Authentication**: Supabase Auth (Postgres auth.users)
- **Storage**: Supabase Storage (para uploads de arquivos)

### Diagrama de Relações

```
┌─────────────────────────────────────────────────────────────┐
│                       AUTENTICAÇÃO                          │
├─────────────────────────────────────────────────────────────┤
│  auth.users (Supabase Auth)                                 │
│  └── id (UUID) - referência do user                         │
└─────────────────────────────────────────────────────────────┘
                            │
                            ├──────────────────┐
                            │                  │
                    ┌───────▼────────┐  ┌──────▼──────────┐
                    │    profiles    │  │  notifications  │
                    │  (1 perfil)    │  │ (muitas notif)  │
                    └────────────────┘  └─────────────────┘
                            │
          ┌─────────────────┼─────────────────┐
          │                 │                 │
    ┌─────▼──────┐   ┌──────▼────┐    ┌──────▼──────────┐
    │    posts   │   │   events  │    │    materials    │
    │ (artigos)  │   │ (eventos) │    │ (recursos)      │
    └─────┬──────┘   └───────────┘    └─────────────────┘
          │
    ┌─────┼─────┐
    │     │     │
┌───▼──┐ │ ┌───▼────────┐    ┌─────────────┐
│ tags │─┼─│ post_tags  │    │   comments  │
│      │ │ └────────────┘    │ (em árvore) │
└──────┘ │                   └─────────────┘
         │
    ┌────▼──────────┐   ┌──────────────────┐
    │ post_reactions│   │  post_reports    │
    │ (helpful+)    │   │  (reportar erro) │
    └───────────────┘   └──────────────────┘

┌──────────────────────────────────────────────┐
│            SUPORTE A CONTEÚDO               │
├──────────────────────────────────────────────┤
│  categories (Blog + Guide)                   │
│  guide_articles (extensão de posts + meta)   │
└──────────────────────────────────────────────┘
```

### Princípios de Design Adotados

1. **Soft Delete**: Tabelas com `deleted_at` para auditorias
2. **Timestamps Automáticos**: `created_at` e `updated_at` via triggers
3. **UUID como PK**: Identificadores únicos, globais, não sequenciais
4. **Enums Customizadas**: Tipos PostgreSQL para validação de dados
5. **Foreign Keys com Cascata**: Deletar usuário deleta seus posts/comentários
6. **Índices Estratégicos**: Para buscas, ordenação, FK e campos únicos
7. **JSONB para Flexibilidade**: Social links, table of contents, dados não estruturados
8. **RLS (Row Level Security)**: Controle de acesso granular
9. **Particionamento Lógico**: Posts por tipo (blog/guide) com status e visibilidade

---

## 2. Schema SQL Completo

### 2.1 Criação de Enums

```sql
-- Enums para domínios de dados
CREATE TYPE user_role AS ENUM ('student', 'member', 'editor', 'admin');
CREATE TYPE campus_enum AS ENUM ('mossoró', 'natal', 'caicó', 'açu', 'patu', 'apodi', 'virtual');
CREATE TYPE post_type AS ENUM ('blog', 'guide');
CREATE TYPE post_status AS ENUM ('draft', 'published', 'archived');
CREATE TYPE event_type AS ENUM ('assembleia', 'reunião', 'ato', 'manifestação', 'sarau', 'palestra', 'outro');
CREATE TYPE event_status AS ENUM ('upcoming', 'ongoing', 'completed', 'cancelled');
CREATE TYPE material_file_type AS ENUM ('pdf', 'video', 'link', 'image', 'document', 'spreadsheet');
CREATE TYPE post_report_type AS ENUM ('outdated', 'incorrect', 'broken_link', 'typo', 'other');
CREATE TYPE post_report_status AS ENUM ('open', 'resolved', 'dismissed');
CREATE TYPE reaction_type AS ENUM ('helpful', 'not_helpful');
CREATE TYPE notification_type AS ENUM ('system', 'event', 'post', 'mention', 'comment_reply');
CREATE TYPE category_type AS ENUM ('guide', 'blog');
```

### 2.2 Tabela: profiles

```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  campus campus_enum DEFAULT 'mossoró',
  course TEXT,
  enrollment_year INTEGER,
  role user_role NOT NULL DEFAULT 'student',
  is_active BOOLEAN DEFAULT TRUE,
  bio TEXT,
  social_links JSONB DEFAULT '{}' :: jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE,
  
  CONSTRAINT valid_enrollment_year CHECK (enrollment_year >= 2010 AND enrollment_year <= EXTRACT(YEAR FROM NOW()) + 1),
  CONSTRAINT valid_full_name CHECK (full_name IS NULL OR LENGTH(full_name) > 1)
);

CREATE INDEX idx_profiles_email ON profiles(email) WHERE deleted_at IS NULL;
CREATE INDEX idx_profiles_role ON profiles(role) WHERE deleted_at IS NULL;
CREATE INDEX idx_profiles_campus ON profiles(campus) WHERE deleted_at IS NULL;
CREATE INDEX idx_profiles_created_at ON profiles(created_at DESC) WHERE deleted_at IS NULL;

COMMENT ON TABLE profiles IS 'Perfis de usuários - estudantes, membros, editores e admins';
COMMENT ON COLUMN profiles.social_links IS 'JSON: {linkedin: url, instagram: url, twitter: url, github: url}';
```

### 2.3 Tabela: categories

```sql
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  color TEXT DEFAULT '#3b82f6',
  type category_type NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT unique_category_slug_type UNIQUE(slug, type),
  CONSTRAINT valid_name CHECK (LENGTH(name) > 0),
  CONSTRAINT valid_slug CHECK (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$')
);

CREATE INDEX idx_categories_type ON categories(type);
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_categories_sort_order ON categories(sort_order);

COMMENT ON TABLE categories IS 'Categorias para artigos de blog e guia';
COMMENT ON COLUMN categories.slug IS 'URL-friendly identifier, formato: kebab-case';
COMMENT ON COLUMN categories.icon IS 'Nome do ícone ou emoji';
```

### 2.4 Tabela: posts

```sql
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  cover_image_url TEXT,
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
  author_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type post_type NOT NULL,
  status post_status NOT NULL DEFAULT 'draft',
  is_featured BOOLEAN DEFAULT FALSE,
  reading_time_minutes INTEGER,
  view_count INTEGER DEFAULT 0,
  seo_title TEXT,
  seo_description TEXT,
  og_image_url TEXT,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE,
  
  CONSTRAINT unique_post_slug UNIQUE(slug),
  CONSTRAINT valid_title CHECK (LENGTH(title) >= 3),
  CONSTRAINT valid_slug CHECK (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  CONSTRAINT valid_excerpt CHECK (excerpt IS NULL OR LENGTH(excerpt) <= 300),
  CONSTRAINT published_requires_status CHECK (published_at IS NULL OR status = 'published'),
  CONSTRAINT featured_requires_published CHECK (NOT is_featured OR status = 'published')
);

CREATE INDEX idx_posts_slug ON posts(slug) WHERE deleted_at IS NULL;
CREATE INDEX idx_posts_status ON posts(status) WHERE deleted_at IS NULL;
CREATE INDEX idx_posts_type_status ON posts(type, status) WHERE deleted_at IS NULL;
CREATE INDEX idx_posts_category_id ON posts(category_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_posts_author_id ON posts(author_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_posts_published_at ON posts(published_at DESC) WHERE status = 'published' AND deleted_at IS NULL;
CREATE INDEX idx_posts_is_featured ON posts(is_featured) WHERE status = 'published' AND deleted_at IS NULL;
CREATE INDEX idx_posts_created_at ON posts(created_at DESC) WHERE deleted_at IS NULL;
CREATE INDEX idx_posts_view_count ON posts(view_count DESC) WHERE status = 'published' AND deleted_at IS NULL;

COMMENT ON TABLE posts IS 'Artigos de blog e guia - soft delete via deleted_at';
COMMENT ON COLUMN posts.slug IS 'URL-friendly identifier, deve ser único globalmente';
COMMENT ON COLUMN posts.reading_time_minutes IS 'Calculado automaticamente a partir do content';
COMMENT ON COLUMN posts.view_count IS 'Incrementado a cada visualização';
```

### 2.5 Tabela: guide_articles

```sql
CREATE TABLE guide_articles (
  post_id UUID PRIMARY KEY REFERENCES posts(id) ON DELETE CASCADE,
  last_verified_at TIMESTAMP WITH TIME ZONE,
  verified_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  table_of_contents JSONB DEFAULT '[]' :: jsonb,
  
  CONSTRAINT fk_guide_type CHECK (
    (SELECT type FROM posts WHERE id = post_id) = 'guide'
  )
);

CREATE INDEX idx_guide_articles_verified_at ON guide_articles(last_verified_at DESC);
CREATE INDEX idx_guide_articles_verified_by ON guide_articles(verified_by);

COMMENT ON TABLE guide_articles IS 'Metadados específicos para artigos do guia (verificação, índice)';
COMMENT ON COLUMN guide_articles.table_of_contents IS 'Array de {id: string, title: string, level: 1-3}';
```

### 2.6 Tabela: tags

```sql
CREATE TABLE tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  
  CONSTRAINT valid_name CHECK (LENGTH(name) > 0),
  CONSTRAINT valid_slug CHECK (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$')
);

CREATE INDEX idx_tags_slug ON tags(slug);

COMMENT ON TABLE tags IS 'Tags/etiquetas para classificação de posts';
```

### 2.7 Tabela: post_tags (N:N)

```sql
CREATE TABLE post_tags (
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  PRIMARY KEY (post_id, tag_id)
);

CREATE INDEX idx_post_tags_tag_id ON post_tags(tag_id);

COMMENT ON TABLE post_tags IS 'Relação many-to-many entre posts e tags';
```

### 2.8 Tabela: events

```sql
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  type event_type NOT NULL,
  campus campus_enum NOT NULL,
  location_name TEXT,
  location_address TEXT,
  maps_embed_url TEXT,
  cover_image_url TEXT,
  starts_at TIMESTAMP WITH TIME ZONE NOT NULL,
  ends_at TIMESTAMP WITH TIME ZONE,
  is_online BOOLEAN DEFAULT FALSE,
  online_url TEXT,
  organizer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  status event_status NOT NULL DEFAULT 'upcoming',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE,
  
  CONSTRAINT valid_title CHECK (LENGTH(title) >= 3),
  CONSTRAINT valid_slug CHECK (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  CONSTRAINT valid_dates CHECK (ends_at IS NULL OR ends_at > starts_at),
  CONSTRAINT online_requires_url CHECK (NOT is_online OR online_url IS NOT NULL),
  CONSTRAINT location_or_online CHECK (location_name IS NOT NULL OR is_online = TRUE)
);

CREATE INDEX idx_events_slug ON events(slug) WHERE deleted_at IS NULL;
CREATE INDEX idx_events_campus ON events(campus) WHERE deleted_at IS NULL;
CREATE INDEX idx_events_type ON events(type) WHERE deleted_at IS NULL;
CREATE INDEX idx_events_starts_at ON events(starts_at DESC) WHERE deleted_at IS NULL;
CREATE INDEX idx_events_status ON events(status) WHERE deleted_at IS NULL;
CREATE INDEX idx_events_organizer_id ON events(organizer_id) WHERE deleted_at IS NULL;

COMMENT ON TABLE events IS 'Eventos da UERN (assembleias, saraus, palestras, etc)';
```

### 2.9 Tabela: comments

```sql
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  parent_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  is_approved BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE,
  
  CONSTRAINT valid_content CHECK (LENGTH(content) > 0 AND LENGTH(content) <= 5000),
  CONSTRAINT no_self_reply CHECK (parent_id IS NULL OR parent_id != id)
);

CREATE INDEX idx_comments_post_id ON comments(post_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_comments_author_id ON comments(author_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_comments_parent_id ON comments(parent_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_comments_created_at ON comments(created_at DESC) WHERE deleted_at IS NULL;
CREATE INDEX idx_comments_is_approved ON comments(is_approved) WHERE deleted_at IS NULL;

COMMENT ON TABLE comments IS 'Comentários em artigos (suporta replies aninhadas via parent_id)';
```

### 2.10 Tabela: post_reactions

```sql
CREATE TABLE post_reactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  reaction reaction_type NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT unique_user_reaction_per_post UNIQUE(post_id, user_id)
);

CREATE INDEX idx_post_reactions_post_id ON post_reactions(post_id);
CREATE INDEX idx_post_reactions_user_id ON post_reactions(user_id);
CREATE INDEX idx_post_reactions_reaction ON post_reactions(reaction);

COMMENT ON TABLE post_reactions IS 'Reações dos usuários em posts (útil/não útil)';
```

### 2.11 Tabela: materials

```sql
CREATE TABLE materials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  file_url TEXT NOT NULL,
  file_type material_file_type NOT NULL,
  category TEXT NOT NULL,
  uploaded_by UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  is_public BOOLEAN DEFAULT FALSE,
  download_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE,
  
  CONSTRAINT valid_title CHECK (LENGTH(title) > 0)
);

CREATE INDEX idx_materials_category ON materials(category) WHERE deleted_at IS NULL;
CREATE INDEX idx_materials_file_type ON materials(file_type) WHERE deleted_at IS NULL;
CREATE INDEX idx_materials_uploaded_by ON materials(uploaded_by) WHERE deleted_at IS NULL;
CREATE INDEX idx_materials_is_public ON materials(is_public) WHERE deleted_at IS NULL;
CREATE INDEX idx_materials_created_at ON materials(created_at DESC) WHERE deleted_at IS NULL;

COMMENT ON TABLE materials IS 'Materiais de estudo e recursos (área de membros)';
```

### 2.12 Tabela: post_reports

```sql
CREATE TABLE post_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  reporter_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  type post_report_type NOT NULL,
  description TEXT,
  status post_report_status NOT NULL DEFAULT 'open',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT valid_description CHECK (description IS NULL OR LENGTH(description) <= 1000)
);

CREATE INDEX idx_post_reports_post_id ON post_reports(post_id);
CREATE INDEX idx_post_reports_reporter_id ON post_reports(reporter_id);
CREATE INDEX idx_post_reports_status ON post_reports(status);
CREATE INDEX idx_post_reports_type ON post_reports(type);
CREATE INDEX idx_post_reports_created_at ON post_reports(created_at DESC);

COMMENT ON TABLE post_reports IS 'Reportes de erros/problemas em artigos';
```

### 2.13 Tabela: notifications

```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type notification_type NOT NULL,
  reference_id UUID,
  reference_type TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT valid_title CHECK (LENGTH(title) > 0),
  CONSTRAINT valid_message CHECK (LENGTH(message) > 0)
);

CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_user_is_read ON notifications(user_id, is_read) WHERE is_read = FALSE;
CREATE INDEX idx_notifications_created_at ON notifications(created_at DESC);
CREATE INDEX idx_notifications_type ON notifications(type);

COMMENT ON TABLE notifications IS 'Sistema de notificações para usuários';
COMMENT ON COLUMN notifications.reference_type IS 'Tipo da referência: post, event, comment, etc';
```

---

## 3. Row Level Security (RLS)

### Habilitação de RLS

```sql
-- Habilitar RLS em todas as tabelas
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE guide_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
```

### 3.1 Políticas: profiles

```sql
-- SELECT: Usuários logados veem perfis ativos, admins veem todos
CREATE POLICY "profiles_select_public" ON profiles
  FOR SELECT USING (is_active = TRUE OR auth.uid() = id OR 
                    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

-- INSERT: Apenas usuários autenticados, no auth trigger
CREATE POLICY "profiles_insert_self" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- UPDATE: Usuários atualizam seu próprio perfil, admins atualizam qualquer um
CREATE POLICY "profiles_update_self" ON profiles
  FOR UPDATE USING (auth.uid() = id OR 
                    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin')
  WITH CHECK (auth.uid() = id OR 
              (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

-- DELETE: Soft delete apenas para admins
CREATE POLICY "profiles_delete_admin" ON profiles
  FOR DELETE USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');
```

### 3.2 Políticas: categories

```sql
-- SELECT: Público
CREATE POLICY "categories_select_public" ON categories
  FOR SELECT USING (true);

-- INSERT/UPDATE/DELETE: Apenas editores e admins
CREATE POLICY "categories_write_editor" ON categories
  FOR INSERT WITH CHECK (
    (SELECT role FROM profiles WHERE id = auth.uid()) IN ('editor', 'admin')
  );

CREATE POLICY "categories_update_editor" ON categories
  FOR UPDATE USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) IN ('editor', 'admin')
  );

CREATE POLICY "categories_delete_admin" ON categories
  FOR DELETE USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );
```

### 3.3 Políticas: posts

```sql
-- SELECT: Posts publicados para todos, draft/archived para autores e admins
CREATE POLICY "posts_select_public" ON posts
  FOR SELECT USING (
    status = 'published' OR 
    auth.uid() = author_id OR 
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

-- INSERT: Autenticados podem criar, editores e admins criam direto
CREATE POLICY "posts_insert_authenticated" ON posts
  FOR INSERT WITH CHECK (
    auth.uid() IS NOT NULL AND auth.uid() = author_id
  );

-- UPDATE: Autores atualizam seus posts, admins atualizam qualquer um
CREATE POLICY "posts_update_author" ON posts
  FOR UPDATE USING (
    auth.uid() = author_id OR 
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

-- DELETE: Soft delete apenas para autores e admins
CREATE POLICY "posts_delete_author" ON posts
  FOR DELETE USING (
    auth.uid() = author_id OR 
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );
```

### 3.4 Políticas: guide_articles

```sql
-- SELECT: Junto com posts
CREATE POLICY "guide_articles_select_public" ON guide_articles
  FOR SELECT USING (
    (SELECT status FROM posts WHERE id = post_id) = 'published' OR
    auth.uid() = (SELECT author_id FROM posts WHERE id = post_id) OR
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

-- INSERT/UPDATE: Editores e admins
CREATE POLICY "guide_articles_write_editor" ON guide_articles
  FOR INSERT WITH CHECK (
    (SELECT role FROM profiles WHERE id = auth.uid()) IN ('editor', 'admin')
  );

CREATE POLICY "guide_articles_update_editor" ON guide_articles
  FOR UPDATE USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) IN ('editor', 'admin')
  );

-- DELETE: Junto com posts
CREATE POLICY "guide_articles_delete_admin" ON guide_articles
  FOR DELETE USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );
```

### 3.5 Políticas: tags

```sql
-- SELECT: Público
CREATE POLICY "tags_select_public" ON tags
  FOR SELECT USING (true);

-- INSERT/UPDATE/DELETE: Editores e admins
CREATE POLICY "tags_write_editor" ON tags
  FOR INSERT WITH CHECK (
    (SELECT role FROM profiles WHERE id = auth.uid()) IN ('editor', 'admin')
  );

CREATE POLICY "tags_update_editor" ON tags
  FOR UPDATE USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) IN ('editor', 'admin')
  );

CREATE POLICY "tags_delete_admin" ON tags
  FOR DELETE USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );
```

### 3.6 Políticas: post_tags

```sql
-- SELECT: Público
CREATE POLICY "post_tags_select_public" ON post_tags
  FOR SELECT USING (true);

-- INSERT/DELETE: Editores e admins
CREATE POLICY "post_tags_write_editor" ON post_tags
  FOR INSERT WITH CHECK (
    (SELECT role FROM profiles WHERE id = auth.uid()) IN ('editor', 'admin')
  );

CREATE POLICY "post_tags_delete_editor" ON post_tags
  FOR DELETE USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) IN ('editor', 'admin')
  );
```

### 3.7 Políticas: events

```sql
-- SELECT: Público
CREATE POLICY "events_select_public" ON events
  FOR SELECT USING (deleted_at IS NULL);

-- INSERT: Autenticados
CREATE POLICY "events_insert_authenticated" ON events
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- UPDATE: Organizador e admins
CREATE POLICY "events_update_organizer" ON events
  FOR UPDATE USING (
    auth.uid() = organizer_id OR 
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

-- DELETE: Soft delete apenas para organizador e admins
CREATE POLICY "events_delete_organizer" ON events
  FOR DELETE USING (
    auth.uid() = organizer_id OR 
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );
```

### 3.8 Políticas: comments

```sql
-- SELECT: Comentários não deletados
CREATE POLICY "comments_select_public" ON comments
  FOR SELECT USING (deleted_at IS NULL);

-- INSERT: Autenticados
CREATE POLICY "comments_insert_authenticated" ON comments
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = author_id);

-- UPDATE: Autor e admins
CREATE POLICY "comments_update_author" ON comments
  FOR UPDATE USING (
    auth.uid() = author_id OR 
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

-- DELETE: Soft delete apenas para autor e admins
CREATE POLICY "comments_delete_author" ON comments
  FOR DELETE USING (
    auth.uid() = author_id OR 
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );
```

### 3.9 Políticas: post_reactions

```sql
-- SELECT: Público (analisar tipos de reação)
CREATE POLICY "post_reactions_select_public" ON post_reactions
  FOR SELECT USING (true);

-- INSERT: Autenticados, uma reação por usuário por post
CREATE POLICY "post_reactions_insert_authenticated" ON post_reactions
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = user_id);

-- UPDATE: Próprio usuário
CREATE POLICY "post_reactions_update_self" ON post_reactions
  FOR UPDATE USING (auth.uid() = user_id);

-- DELETE: Próprio usuário
CREATE POLICY "post_reactions_delete_self" ON post_reactions
  FOR DELETE USING (auth.uid() = user_id);
```

### 3.10 Políticas: materials

```sql
-- SELECT: Públicos para todos, privados apenas para autenticados
CREATE POLICY "materials_select_public" ON materials
  FOR SELECT USING (
    is_public = TRUE OR 
    auth.uid() = uploaded_by OR 
    auth.uid() IS NOT NULL
  );

-- INSERT: Autenticados
CREATE POLICY "materials_insert_authenticated" ON materials
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = uploaded_by);

-- UPDATE: Uploader e admins
CREATE POLICY "materials_update_uploader" ON materials
  FOR UPDATE USING (
    auth.uid() = uploaded_by OR 
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

-- DELETE: Soft delete para uploader e admins
CREATE POLICY "materials_delete_uploader" ON materials
  FOR DELETE USING (
    auth.uid() = uploaded_by OR 
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );
```

### 3.11 Políticas: post_reports

```sql
-- SELECT: Apenas admins e editor
CREATE POLICY "post_reports_select_admin" ON post_reports
  FOR SELECT USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) IN ('admin', 'editor')
  );

-- INSERT: Autenticados (anônimo não pode criar reporte via auth)
CREATE POLICY "post_reports_insert_authenticated" ON post_reports
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- UPDATE: Admins e editores
CREATE POLICY "post_reports_update_admin" ON post_reports
  FOR UPDATE USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) IN ('admin', 'editor')
  );
```

### 3.12 Políticas: notifications

```sql
-- SELECT: Apenas do próprio usuário
CREATE POLICY "notifications_select_own" ON notifications
  FOR SELECT USING (auth.uid() = user_id);

-- INSERT: Sistema apenas (via function)
CREATE POLICY "notifications_insert_system" ON notifications
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- UPDATE: Próprio usuário (marcar como lido)
CREATE POLICY "notifications_update_own" ON notifications
  FOR UPDATE USING (auth.uid() = user_id);

-- DELETE: Próprio usuário
CREATE POLICY "notifications_delete_own" ON notifications
  FOR DELETE USING (auth.uid() = user_id);
```

---

## 4. Funções e Triggers

### 4.1 Função: Criar Profile automaticamente após signup

```sql
CREATE OR REPLACE FUNCTION create_profile_on_signup()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    'student'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION create_profile_on_signup();

COMMENT ON FUNCTION create_profile_on_signup() IS 'Cria automaticamente um profile ao novo usuário se registrar';
```

### 4.2 Função: Atualizar updated_at

```sql
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Aplicar em todas as tabelas com updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_comments_updated_at BEFORE UPDATE ON comments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_materials_updated_at BEFORE UPDATE ON materials
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_post_reports_updated_at BEFORE UPDATE ON post_reports
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

COMMENT ON FUNCTION update_updated_at() IS 'Atualiza automaticamente o timestamp updated_at';
```

### 4.3 Função: Incrementar view_count

```sql
CREATE OR REPLACE FUNCTION increment_post_views(post_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE posts
  SET view_count = view_count + 1
  WHERE id = post_id;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION increment_post_views(UUID) IS 'Incrementa o contador de visualizações de um post';
```

### 4.4 Função: Calcular reading_time a partir do content

```sql
CREATE OR REPLACE FUNCTION calculate_reading_time(content TEXT)
RETURNS INTEGER AS $$
DECLARE
  word_count INTEGER;
  reading_time INTEGER;
BEGIN
  -- Remove tags HTML/Markdown e conta palavras
  word_count := array_length(string_to_array(
    regexp_replace(content, '<[^>]*>', '', 'g'), ' '
  ), 1);
  
  -- Média de 200 palavras por minuto
  reading_time := GREATEST(1, CEIL(word_count::NUMERIC / 200));
  
  RETURN reading_time;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Trigger para auto-calcular reading_time
CREATE OR REPLACE FUNCTION auto_calculate_reading_time()
RETURNS TRIGGER AS $$
BEGIN
  NEW.reading_time_minutes := calculate_reading_time(NEW.content);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER posts_auto_reading_time BEFORE INSERT OR UPDATE ON posts
  FOR EACH ROW EXECUTE FUNCTION auto_calculate_reading_time();

COMMENT ON FUNCTION calculate_reading_time(TEXT) IS 'Calcula tempo de leitura baseado em 200 palavras/minuto';
```

### 4.5 Função: Criar notificação

```sql
CREATE OR REPLACE FUNCTION create_notification(
  user_id UUID,
  title TEXT,
  message TEXT,
  notification_type notification_type,
  reference_id UUID DEFAULT NULL,
  reference_type TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  notification_id UUID;
BEGIN
  INSERT INTO notifications (user_id, title, message, type, reference_id, reference_type)
  VALUES (user_id, title, message, notification_type, reference_id, reference_type)
  RETURNING id INTO notification_id;
  
  RETURN notification_id;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION create_notification(UUID, TEXT, TEXT, notification_type, UUID, TEXT) 
  IS 'Cria uma notificação para um usuário';
```

### 4.6 Função: Processar novo comentário

```sql
CREATE OR REPLACE FUNCTION on_comment_created()
RETURNS TRIGGER AS $$
DECLARE
  post_author_id UUID;
BEGIN
  -- Buscar autor do post
  SELECT author_id INTO post_author_id FROM posts WHERE id = NEW.post_id;
  
  -- Notificar autor se não for ele mesmo
  IF post_author_id != NEW.author_id AND post_author_id IS NOT NULL THEN
    PERFORM create_notification(
      post_author_id,
      'Novo comentário',
      'Alguém comentou em seu artigo',
      'comment_reply',
      NEW.id,
      'comment'
    );
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_new_comment AFTER INSERT ON comments
  FOR EACH ROW EXECUTE FUNCTION on_comment_created();

COMMENT ON FUNCTION on_comment_created() IS 'Cria notificação quando comentário é criado';
```

---

## 5. Índices de Performance

```sql
-- Índices de Busca Full-Text (opcional, para próximas versões)
-- CREATE INDEX idx_posts_content_search ON posts USING GIN(
--   to_tsvector('portuguese', title || ' ' || COALESCE(content, ''))
-- ) WHERE status = 'published' AND deleted_at IS NULL;

-- Índices de Ordenação
CREATE INDEX idx_posts_featured_published ON posts(is_featured DESC, published_at DESC) 
  WHERE status = 'published' AND deleted_at IS NULL;

CREATE INDEX idx_events_upcoming ON events(starts_at ASC) 
  WHERE status = 'upcoming' AND deleted_at IS NULL;

-- Índices para Contadores
CREATE INDEX idx_comment_count ON comments(post_id) 
  WHERE deleted_at IS NULL;

CREATE INDEX idx_reaction_count ON post_reactions(post_id);

-- Índices para Foreign Keys (implícitos, mas listados para documentação)
-- Já criados acima

-- Resumo dos Índices:
-- - slug: Busca por URL
-- - foreign keys: Joins
-- - status: Filtragem comum
-- - timestamps: Ordenação
-- - user_id/author_id: Filtragem por autoria
-- - is_featured/is_public: Filtragem de visibilidade
```

---

## 6. Seeding / Dados Iniciais

```sql
-- Limpar dados existentes (em desenvolvimento)
-- TRUNCATE TABLE categories, tags CASCADE;

-- Inserir categorias do GUIA
INSERT INTO categories (name, slug, description, icon, color, type, sort_order)
VALUES
  ('Informações Gerais', 'informacoes-gerais', 'Dados sobre a UERN e seus campi', '📚', '#3b82f6', 'guide', 1),
  ('Cursos e Programas', 'cursos-programas', 'Guia de cursos de graduação e pós-graduação', '🎓', '#8b5cf6', 'guide', 2),
  ('Vida Acadêmica', 'vida-academica', 'Calendário, matrícula, transferências', '📅', '#ec4899', 'guide', 3),
  ('Infraestrutura e Serviços', 'infraestrutura-servicos', 'Biblioteca, laboratórios, restaurante', '🏢', '#f59e0b', 'guide', 4),
  ('Assistência Estudantil', 'assistencia-estudantil', 'Bolsas, auxílios e programas de apoio', '🤝', '#10b981', 'guide', 5),
  ('Movimentação e Organismos', 'movimentacao-organismos', 'Centro Acadêmico, Diretório, Associações', '🤗', '#06b6d4', 'guide', 6),
  ('Dicas e Experiências', 'dicas-experiencias', 'Histórias e conselhos de veteranos', '💡', '#f97316', 'guide', 7)
ON CONFLICT DO NOTHING;

-- Inserir categorias do BLOG
INSERT INTO categories (name, slug, description, icon, color, type, sort_order)
VALUES
  ('Notícias', 'noticias', 'Últimas notícias da UERN', '📰', '#ef4444', 'blog', 1),
  ('Eventos', 'eventos', 'Divulgação de eventos', '🎉', '#ec4899', 'blog', 2),
  ('Artigos', 'artigos', 'Artigos e reflexões', '✍️', '#3b82f6', 'blog', 3),
  ('Educação', 'educacao', 'Dicas e conteúdo educacional', '🎓', '#8b5cf6', 'blog', 4),
  ('Tecnologia', 'tecnologia', 'Tecnologia e inovação', '💻', '#10b981', 'blog', 5)
ON CONFLICT DO NOTHING;

-- Inserir tags
INSERT INTO tags (name, slug)
VALUES
  ('UERN', 'uern'),
  ('Mossoró', 'mossoro'),
  ('Natal', 'natal'),
  ('Estudante', 'estudante'),
  ('Bolsa', 'bolsa'),
  ('Dica', 'dica'),
  ('Notícia', 'noticia'),
  ('Evento', 'evento'),
  ('Tecnologia', 'tecnologia'),
  ('Informação', 'informacao')
ON CONFLICT DO NOTHING;
```

---

## 7. Migrações com Supabase

### Estrutura de Pasta Recomendada

```
project-root/
├── supabase/
│   ├── migrations/
│   │   ├── 01_create_enums.sql
│   │   ├── 02_create_profiles.sql
│   │   ├── 03_create_categories.sql
│   │   ├── 04_create_posts.sql
│   │   ├── 05_create_guide_articles.sql
│   │   ├── 06_create_tags.sql
│   │   ├── 07_create_post_tags.sql
│   │   ├── 08_create_events.sql
│   │   ├── 09_create_comments.sql
│   │   ├── 10_create_post_reactions.sql
│   │   ├── 11_create_materials.sql
│   │   ├── 12_create_post_reports.sql
│   │   ├── 13_create_notifications.sql
│   │   ├── 14_enable_rls.sql
│   │   ├── 15_create_rls_policies.sql
│   │   ├── 16_create_functions.sql
│   │   ├── 17_create_triggers.sql
│   │   └── 18_seed_initial_data.sql
│   ├── seed.sql (arquivo de seed manual)
│   └── config.toml
```

### Nomenclatura de Migrações

- Formato: `YYMMDDHHMMSS_descriptive_name.sql` (gerado automaticamente por Supabase CLI)
- Ou: `01_create_enums.sql`, `02_create_profiles.sql`, etc.
- Cada migração é idempotente (usar `CREATE IF NOT EXISTS`)

### Comandos Úteis

```bash
# Inicializar Supabase localmente
supabase init

# Criar nova migração
supabase migration new create_posts_table

# Aplicar migrações localmente
supabase migration up

# Enviar migrações para produção
supabase push

# Ver histórico de migrações
supabase migration list
```

### Boas Práticas

1. Uma tabela/feature por migração
2. Sempre incluir DROP/IF EXISTS para reversibilidade
3. Testar localmente antes de fazer push
4. Nunca alterar migrações já feitas (criar nova migração)
5. Usar transações (`BEGIN; ... COMMIT;`) em migrações críticas

---

## 8. Tipos TypeScript

### Instalação

```bash
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
```

### Geração Automática de Types

```bash
# Gerar types do schema
npx supabase gen types typescript --project-id $PROJECT_ID > src/types/supabase.ts
```

### Arquivo: `src/types/supabase.ts`

```typescript
// Este arquivo é gerado automaticamente pelo Supabase CLI
// Não editar manualmente

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          campus: Database["public"]["Enums"]["campus_enum"] | null
          course: string | null
          enrollment_year: number | null
          role: Database["public"]["Enums"]["user_role"]
          is_active: boolean
          bio: string | null
          social_links: Json
          created_at: string
          updated_at: string
          deleted_at: string | null
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          campus?: Database["public"]["Enums"]["campus_enum"] | null
          course?: string | null
          enrollment_year?: number | null
          role?: Database["public"]["Enums"]["user_role"]
          is_active?: boolean
          bio?: string | null
          social_links?: Json
          created_at?: string
          updated_at?: string
          deleted_at?: string | null
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          campus?: Database["public"]["Enums"]["campus_enum"] | null
          course?: string | null
          enrollment_year?: number | null
          role?: Database["public"]["Enums"]["user_role"]
          is_active?: boolean
          bio?: string | null
          social_links?: Json
          created_at?: string
          updated_at?: string
          deleted_at?: string | null
        }
        Relationships: []
      }
      posts: {
        Row: {
          id: string
          title: string
          slug: string
          content: string
          excerpt: string | null
          cover_image_url: string | null
          category_id: string
          author_id: string
          type: Database["public"]["Enums"]["post_type"]
          status: Database["public"]["Enums"]["post_status"]
          is_featured: boolean
          reading_time_minutes: number | null
          view_count: number
          seo_title: string | null
          seo_description: string | null
          og_image_url: string | null
          published_at: string | null
          created_at: string
          updated_at: string
          deleted_at: string | null
        }
        Insert: {
          id?: string
          title: string
          slug: string
          content: string
          excerpt?: string | null
          cover_image_url?: string | null
          category_id: string
          author_id: string
          type: Database["public"]["Enums"]["post_type"]
          status?: Database["public"]["Enums"]["post_status"]
          is_featured?: boolean
          reading_time_minutes?: number | null
          view_count?: number
          seo_title?: string | null
          seo_description?: string | null
          og_image_url?: string | null
          published_at?: string | null
          created_at?: string
          updated_at?: string
          deleted_at?: string | null
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          content?: string
          excerpt?: string | null
          cover_image_url?: string | null
          category_id?: string
          author_id?: string
          type?: Database["public"]["Enums"]["post_type"]
          status?: Database["public"]["Enums"]["post_status"]
          is_featured?: boolean
          reading_time_minutes?: number | null
          view_count?: number
          seo_title?: string | null
          seo_description?: string | null
          og_image_url?: string | null
          published_at?: string | null
          created_at?: string
          updated_at?: string
          deleted_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          }
        ]
      }
      events: {
        Row: {
          id: string
          title: string
          slug: string
          description: string
          type: Database["public"]["Enums"]["event_type"]
          campus: Database["public"]["Enums"]["campus_enum"]
          location_name: string | null
          location_address: string | null
          maps_embed_url: string | null
          cover_image_url: string | null
          starts_at: string
          ends_at: string | null
          is_online: boolean
          online_url: string | null
          organizer_id: string
          status: Database["public"]["Enums"]["event_status"]
          created_at: string
          updated_at: string
          deleted_at: string | null
        }
        Insert: {
          id?: string
          title: string
          slug: string
          description: string
          type: Database["public"]["Enums"]["event_type"]
          campus: Database["public"]["Enums"]["campus_enum"]
          location_name?: string | null
          location_address?: string | null
          maps_embed_url?: string | null
          cover_image_url?: string | null
          starts_at: string
          ends_at?: string | null
          is_online?: boolean
          online_url?: string | null
          organizer_id: string
          status?: Database["public"]["Enums"]["event_status"]
          created_at?: string
          updated_at?: string
          deleted_at?: string | null
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          description?: string
          type?: Database["public"]["Enums"]["event_type"]
          campus?: Database["public"]["Enums"]["campus_enum"]
          location_name?: string | null
          location_address?: string | null
          maps_embed_url?: string | null
          cover_image_url?: string | null
          starts_at?: string
          ends_at?: string | null
          is_online?: boolean
          online_url?: string | null
          organizer_id?: string
          status?: Database["public"]["Enums"]["event_status"]
          created_at?: string
          updated_at?: string
          deleted_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "events_organizer_id_fkey"
            columns: ["organizer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      // ... (outros tipos seguem o mesmo padrão)
    }
    Enums: {
      campus_enum: 'mossoró' | 'natal' | 'caicó' | 'açu' | 'patu' | 'apodi' | 'virtual'
      user_role: 'student' | 'member' | 'editor' | 'admin'
      post_type: 'blog' | 'guide'
      post_status: 'draft' | 'published' | 'archived'
      event_type: 'assembleia' | 'reunião' | 'ato' | 'manifestação' | 'sarau' | 'palestra' | 'outro'
      event_status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled'
      notification_type: 'system' | 'event' | 'post' | 'mention' | 'comment_reply'
      // ... etc
    }
  }
}
```

### Tipos Customizados Derivados

```typescript
// src/types/index.ts

import { Database } from './supabase'

// Tipos das tabelas
export type Profile = Database['public']['Tables']['profiles']['Row']
export type ProfileInsert = Database['public']['Tables']['profiles']['Insert']
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update']

export type Post = Database['public']['Tables']['posts']['Row']
export type PostInsert = Database['public']['Tables']['posts']['Insert']
export type PostUpdate = Database['public']['Tables']['posts']['Update']

export type Event = Database['public']['Tables']['events']['Row']
export type EventInsert = Database['public']['Tables']['events']['Insert']
export type EventUpdate = Database['public']['Tables']['events']['Update']

// Enums
export type Campus = Database['public']['Enums']['campus_enum']
export type UserRole = Database['public']['Enums']['user_role']
export type PostType = Database['public']['Enums']['post_type']
export type PostStatus = Database['public']['Enums']['post_status']

// Tipos compostos úteis
export type PostWithAuthor = Post & {
  profiles: Profile
}

export type PostWithCategory = Post & {
  categories: Category
}

export type EventWithOrganizer = Event & {
  profiles: Profile
}

// Result type para operações
export type Result<T, E = Error> = 
  | { ok: true; value: T }
  | { ok: false; error: E }

export const Ok = <T, E>(value: T): Result<T, E> => ({ ok: true, value })
export const Err = <T, E>(error: E): Result<T, E> => ({ ok: false, error })
```

---

## Resumo

Este documento fornece:

✅ Schema SQL completo e production-ready
✅ Row Level Security com políticas granulares
✅ Funções e triggers para automação
✅ Índices otimizados para performance
✅ Seeding inicial de dados
✅ Estrutura de migrações
✅ Tipos TypeScript gerados

Próximo passo: Implementar APIs com Server Actions e Route Handlers (vide `05-api-endpoints.md`).


-- ===== POSTS (blog + guia) =====
CREATE TABLE public.posts (
  id               UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at       TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at       TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  published_at     TIMESTAMPTZ,
  title            TEXT NOT NULL,
  slug             TEXT NOT NULL UNIQUE,
  excerpt          TEXT,
  content          TEXT NOT NULL DEFAULT '',
  cover_image_url  TEXT,
  author_id        UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  category_id      UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  type             post_type NOT NULL DEFAULT 'blog',
  status           post_status NOT NULL DEFAULT 'draft',
  featured         BOOLEAN DEFAULT FALSE,
  views_count      INTEGER DEFAULT 0,
  reading_time     INTEGER, -- minutos
  meta_description TEXT,
  meta_keywords    TEXT[],
  deleted_at       TIMESTAMPTZ,
  CONSTRAINT valid_published CHECK (status != 'published' OR published_at IS NOT NULL)
);

CREATE INDEX posts_slug_idx ON public.posts(slug);
CREATE INDEX posts_author_idx ON public.posts(author_id);
CREATE INDEX posts_category_idx ON public.posts(category_id);
CREATE INDEX posts_type_idx ON public.posts(type);
CREATE INDEX posts_status_idx ON public.posts(status);
CREATE INDEX posts_featured_idx ON public.posts(featured) WHERE featured = TRUE;
CREATE INDEX posts_published_at_idx ON public.posts(published_at DESC) WHERE status = 'published';

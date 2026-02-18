-- ===== CATEGORIES =====
CREATE TABLE public.categories (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at  TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  name        TEXT NOT NULL,
  slug        TEXT NOT NULL UNIQUE,
  description TEXT,
  icon        TEXT,
  color       TEXT,
  post_type   post_type NOT NULL DEFAULT 'blog',
  order_index INTEGER DEFAULT 0,
  is_active   BOOLEAN DEFAULT TRUE
);

CREATE INDEX categories_slug_idx ON public.categories(slug);
CREATE INDEX categories_type_idx ON public.categories(post_type);

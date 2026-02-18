-- ===== TAGS =====
CREATE TABLE public.tags (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  name       TEXT NOT NULL,
  slug       TEXT NOT NULL UNIQUE
);

-- Junction table N:N
CREATE TABLE public.post_tags (
  post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE,
  tag_id  UUID REFERENCES public.tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

CREATE INDEX post_tags_post_idx ON public.post_tags(post_id);
CREATE INDEX post_tags_tag_idx ON public.post_tags(tag_id);

-- ===== COMMENTS =====
CREATE TABLE public.comments (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at  TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at  TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  post_id     UUID REFERENCES public.posts(id) ON DELETE CASCADE NOT NULL,
  author_id   UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  parent_id   UUID REFERENCES public.comments(id) ON DELETE CASCADE, -- replies
  content     TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT TRUE,
  deleted_at  TIMESTAMPTZ
);

CREATE INDEX comments_post_idx ON public.comments(post_id);
CREATE INDEX comments_author_idx ON public.comments(author_id);
CREATE INDEX comments_parent_idx ON public.comments(parent_id);

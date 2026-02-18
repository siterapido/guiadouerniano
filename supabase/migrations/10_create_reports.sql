-- ===== REPORTS =====
CREATE TABLE public.post_reports (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at  TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  post_id     UUID REFERENCES public.posts(id) ON DELETE CASCADE NOT NULL,
  reporter_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  reason      report_reason NOT NULL DEFAULT 'other',
  description TEXT,
  is_resolved BOOLEAN DEFAULT FALSE,
  UNIQUE (post_id, reporter_id)
);

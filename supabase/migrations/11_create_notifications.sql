-- ===== NOTIFICATIONS =====
CREATE TABLE public.notifications (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  user_id    UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  type       TEXT NOT NULL,
  title      TEXT NOT NULL,
  body       TEXT,
  link       TEXT,
  is_read    BOOLEAN DEFAULT FALSE
);

CREATE INDEX notifications_user_idx ON public.notifications(user_id);
CREATE INDEX notifications_read_idx ON public.notifications(user_id, is_read) WHERE is_read = FALSE;

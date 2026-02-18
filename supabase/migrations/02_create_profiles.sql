-- ===== PROFILES =====
CREATE TABLE public.profiles (
  id           UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  created_at   TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at   TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  name         TEXT,
  bio          TEXT,
  avatar_url   TEXT,
  campus       campus_enum,
  course       TEXT,
  role         user_role NOT NULL DEFAULT 'student',
  email_notifications BOOLEAN DEFAULT TRUE,
  newsletter_subscribed BOOLEAN DEFAULT FALSE,
  is_active    BOOLEAN DEFAULT TRUE,
  deleted_at   TIMESTAMPTZ
);

CREATE INDEX profiles_role_idx ON public.profiles(role);
CREATE INDEX profiles_campus_idx ON public.profiles(campus);

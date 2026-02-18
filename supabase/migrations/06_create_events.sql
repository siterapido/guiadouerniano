-- ===== EVENTS =====
CREATE TABLE public.events (
  id               UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at       TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at       TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  title            TEXT NOT NULL,
  slug             TEXT NOT NULL UNIQUE,
  description      TEXT,
  content          TEXT,
  cover_image_url  TEXT,
  starts_at        TIMESTAMPTZ NOT NULL,
  ends_at          TIMESTAMPTZ NOT NULL,
  location         TEXT,
  location_url     TEXT,
  campus           campus_enum,
  type             event_type NOT NULL DEFAULT 'encontro',
  status           event_status NOT NULL DEFAULT 'upcoming',
  organizer_id     UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  max_attendees    INTEGER,
  stream_url       TEXT,
  is_public        BOOLEAN DEFAULT TRUE,
  meta_description TEXT,
  deleted_at       TIMESTAMPTZ,
  CONSTRAINT valid_dates CHECK (ends_at > starts_at)
);

CREATE INDEX events_slug_idx ON public.events(slug);
CREATE INDEX events_starts_at_idx ON public.events(starts_at);
CREATE INDEX events_status_idx ON public.events(status);
CREATE INDEX events_campus_idx ON public.events(campus);

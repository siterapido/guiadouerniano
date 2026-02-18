-- ===== MATERIALS (área de membros) =====
CREATE TABLE public.materials (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at      TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at      TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  title           TEXT NOT NULL,
  description     TEXT,
  file_url        TEXT NOT NULL,
  file_type       material_type NOT NULL DEFAULT 'pdf',
  file_size       BIGINT, -- bytes
  category        TEXT,
  uploaded_by     UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  is_public       BOOLEAN DEFAULT FALSE, -- FALSE = só membros
  downloads_count INTEGER DEFAULT 0,
  deleted_at      TIMESTAMPTZ
);

CREATE INDEX materials_type_idx ON public.materials(file_type);
CREATE INDEX materials_public_idx ON public.materials(is_public);

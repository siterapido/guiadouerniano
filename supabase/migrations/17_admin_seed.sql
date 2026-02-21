-- ===== ADMIN PROFILE SEED =====
-- Creates the admin profile row. The actual Supabase Auth user must be created
-- via the dashboard or scripts/create-admin.ts.

INSERT INTO public.profiles (id, name, email, role, email_notifications, is_active)
VALUES (
  '00000000-0000-0000-0000-000000000099',
  'Administrador Correnteza',
  'admin@correnteza.org',
  'admin',
  true,
  true
)
ON CONFLICT (id) DO NOTHING;

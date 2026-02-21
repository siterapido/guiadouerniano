/**
 * create-admin.ts — one-time script to create the admin Supabase Auth user
 *
 * Usage:
 *   ADMIN_PASSWORD=your_password npx tsx scripts/create-admin.ts
 *
 * This creates the Auth user for admin@correnteza.org and links it to the
 * profile row inserted by migration 17_admin_seed.sql.
 *
 * Requires env vars:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 *   ADMIN_PASSWORD
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const adminPassword = process.env.ADMIN_PASSWORD;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

if (!adminPassword) {
  console.error('Missing ADMIN_PASSWORD');
  process.exit(1);
}

const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function main() {
  const ADMIN_EMAIL = 'admin@correnteza.org';
  const ADMIN_NAME = 'Administrador Correnteza';

  console.log(`Creating auth user for ${ADMIN_EMAIL}...`);

  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email: ADMIN_EMAIL,
    password: adminPassword,
    email_confirm: true,
    user_metadata: { name: ADMIN_NAME },
  });

  if (error) {
    console.error('Error creating auth user:', error.message);
    process.exit(1);
  }

  const userId = data.user.id;
  console.log(`Auth user created: ${userId}`);

  // Upsert profile with role=admin using the real auth user ID
  const { error: profileError } = await supabaseAdmin
    .from('profiles')
    .upsert({
      id: userId,
      name: ADMIN_NAME,
      email: ADMIN_EMAIL,
      role: 'admin',
      email_notifications: true,
      is_active: true,
    })
    .eq('id', userId);

  if (profileError) {
    console.error('Error upserting profile:', profileError.message);
    process.exit(1);
  }

  console.log('✓ Admin profile created/updated with role=admin');
  console.log(`\nLogin credentials:\n  Email: ${ADMIN_EMAIL}\n  Password: (as set in ADMIN_PASSWORD)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

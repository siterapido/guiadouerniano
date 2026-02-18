'use client';

import { useAuthStore } from '@/stores/auth';
import type { UserRole } from '@/types';

export function usePermissions() {
  const profile = useAuthStore((s) => s.profile);
  const role = profile?.role ?? null;

  function hasRole(requiredRole: UserRole): boolean {
    if (!role) return false;
    const hierarchy: UserRole[] = ['student', 'member', 'editor', 'admin'];
    const userLevel = hierarchy.indexOf(role);
    const requiredLevel = hierarchy.indexOf(requiredRole);
    return userLevel >= requiredLevel;
  }

  return {
    role,
    isAuthenticated: !!profile,
    isMember: hasRole('member'),
    isEditor: hasRole('editor'),
    isAdmin: hasRole('admin'),
    canEdit: hasRole('editor'),
    canAdmin: hasRole('admin'),
    canComment: !!profile, // any logged-in user
    hasRole,
  };
}

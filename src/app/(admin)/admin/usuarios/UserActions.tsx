'use client';

import { useTransition } from 'react';
import { updateUserRole, deactivateUser, reactivateUser } from '@/lib/actions/admin';
import type { AdminUser } from '@/lib/queries/admin/getAdminUsers';
import type { UserRole } from '@/types';

const roles: UserRole[] = ['student', 'member', 'editor', 'admin'];

const roleLabels: Record<UserRole, string> = {
  student: 'Estudante',
  member: 'Membro',
  editor: 'Editor',
  admin: 'Admin',
};

interface UserActionsProps {
  user: AdminUser;
}

export function UserActions({ user }: UserActionsProps) {
  const [isPending, startTransition] = useTransition();

  const handleRoleChange = (newRole: string) => {
    startTransition(async () => {
      await updateUserRole(user.id, newRole as UserRole);
    });
  };

  const handleToggleActive = () => {
    startTransition(async () => {
      if (user.is_active) {
        await deactivateUser(user.id);
      } else {
        await reactivateUser(user.id);
      }
    });
  };

  return (
    <div className="flex items-center gap-2">
      <select
        value={user.role}
        disabled={isPending}
        onChange={(e) => handleRoleChange(e.target.value)}
        className="h-8 px-2 text-xs rounded border border-neutro-200 bg-white text-neutro-900 focus:outline-none focus:border-azul-correnteza disabled:opacity-50"
        aria-label={`Papel de ${user.name ?? user.email}`}
      >
        {roles.map((r) => (
          <option key={r} value={r}>
            {roleLabels[r]}
          </option>
        ))}
      </select>
      <button
        onClick={handleToggleActive}
        disabled={isPending}
        className={`text-xs font-medium px-2 py-1 rounded transition-colors disabled:opacity-50 ${
          user.is_active
            ? 'text-vermelho-luta hover:bg-red-50'
            : 'text-sucesso hover:bg-green-50'
        }`}
        aria-label={user.is_active ? 'Desativar usuário' : 'Reativar usuário'}
      >
        {user.is_active ? 'Desativar' : 'Reativar'}
      </button>
    </div>
  );
}

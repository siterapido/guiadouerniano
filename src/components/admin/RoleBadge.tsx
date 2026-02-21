import { Badge } from '@/components/ui/Badge';
import type { UserRole } from '@/types';

const roleConfig: Record<UserRole, { label: string; variant: 'urgente' | 'orange' | 'primary' | 'outline' }> = {
  admin: { label: 'Admin', variant: 'urgente' },
  editor: { label: 'Editor', variant: 'orange' },
  member: { label: 'Membro', variant: 'primary' },
  student: { label: 'Estudante', variant: 'outline' },
};

interface RoleBadgeProps {
  role: UserRole;
}

export function RoleBadge({ role }: RoleBadgeProps) {
  const config = roleConfig[role] ?? { label: role, variant: 'outline' as const };
  return <Badge variant={config.variant}>{config.label}</Badge>;
}

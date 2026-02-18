import Image from 'next/image';
import { cn } from '@/lib/utils/cn';
import { Badge } from '@/components/ui/Badge';
import type { Profile } from '@/types';

interface MemberCardProps {
  profile: Profile;
  className?: string;
}

const roleLabels: Record<string, string> = {
  student: 'Estudante',
  member: 'Membro',
  editor: 'Editor',
  admin: 'Admin',
};

const roleVariants: Record<string, 'outline' | 'primary' | 'success' | 'warning' | 'danger'> = {
  student: 'outline',
  member: 'primary',
  editor: 'success',
  admin: 'danger',
};

export function MemberCard({ profile, className }: MemberCardProps) {
  const role = profile.role ?? 'student';
  const label = roleLabels[role] ?? role;
  const variant = roleVariants[role] ?? 'outline';

  return (
    <div className={cn('bg-white rounded-xl border border-[--neutro-200] p-4 flex items-center gap-3', className)}>
      <div className="relative w-12 h-12 rounded-full overflow-hidden bg-[--azul-correnteza] flex-shrink-0">
        {profile.avatar_url ? (
          <Image
            src={profile.avatar_url}
            alt={`Foto de ${profile.name}`}
            fill
            className="object-cover"
            sizes="48px"
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg">
            {(profile.name ?? '?').charAt(0).toUpperCase()}
          </span>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-[--neutro-900] truncate">{profile.name}</p>
        {profile.campus && (
          <p className="text-sm text-[--neutro-600] truncate">{profile.campus}</p>
        )}
      </div>
      <Badge variant={variant}>{label}</Badge>
    </div>
  );
}

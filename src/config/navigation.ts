export const bottomNavItems = [
  {
    id: 'home' as const,
    label: 'Início',
    href: '/',
    icon: 'Home',
  },
  {
    id: 'busca' as const,
    label: 'Explorar',
    href: '/busca',
    icon: 'Search',
  },
  {
    id: 'guia' as const,
    label: 'Guia',
    href: '/guia',
    icon: 'BookOpen',
  },
  {
    id: 'movimento' as const,
    label: 'Movimento',
    href: '/blog',
    icon: 'Megaphone',
  },
  {
    id: 'perfil' as const,
    label: 'Perfil',
    href: '/membros',
    icon: 'User',
  },
] as const;

export type BottomNavItem = (typeof bottomNavItems)[number];
export type BottomNavId = BottomNavItem['id'];

export const guideCategories = [
  { name: 'Matrícula e Documentos', slug: 'matricula', icon: 'FileText', color: '#1A5FB4' },
  { name: 'Serviços Acadêmicos', slug: 'servicos', icon: 'GraduationCap', color: '#2870D4' },
  { name: 'Restaurante Universitário', slug: 'ru', icon: 'Utensils', color: '#1A7F37' },
  { name: 'Assistência Estudantil', slug: 'assistencia', icon: 'Heart', color: '#E63946' },
  { name: 'Órgãos Colegiados', slug: 'orgaos', icon: 'Users', color: '#9A6700' },
  { name: 'Campi e Endereços', slug: 'campi', icon: 'MapPin', color: '#0969DA' },
  { name: 'Calendário Acadêmico', slug: 'calendario', icon: 'Calendar', color: '#F4732A' },
  { name: 'Movimento Estudantil', slug: 'movimento-estudantil', icon: 'Megaphone', color: '#003087' },
] as const;

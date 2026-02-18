export const siteConfig = {
  name: 'Guia do UERNIANO',
  shortName: 'Guia UERN',
  description:
    'Portal central para estudantes da Universidade do Estado do Rio Grande do Norte. Informações acadêmicas, movimento estudantil e comunidade.',
  url: process.env.NEXT_PUBLIC_APP_URL || 'https://guiadouerniano.com.br',
  ogImage: '/og-default.jpg',
  creator: 'Movimento Correnteza',
  keywords: [
    'UERN',
    'universidade',
    'estudantes',
    'movimento estudantil',
    'Correnteza',
    'guia universitário',
    'Mossoró',
    'Rio Grande do Norte',
  ],
  links: {
    instagram: 'https://instagram.com/correntezauern',
    twitter: 'https://twitter.com/correntezauern',
    github: 'https://github.com/correnteza-uern',
    email: 'contato@guiadouerniano.com.br',
  },
  nav: {
    main: [
      { title: 'Início', href: '/' },
      { title: 'Guia', href: '/guia' },
      { title: 'Blog', href: '/blog' },
      { title: 'Eventos', href: '/eventos' },
      { title: 'Movimento', href: '/movimento' },
      { title: 'Sobre', href: '/sobre' },
    ],
  },
} as const;

export type SiteConfig = typeof siteConfig;

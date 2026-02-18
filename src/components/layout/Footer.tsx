import Link from 'next/link';
import { Instagram, Github, Mail } from 'lucide-react';
import { siteConfig } from '@/config/site';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-neutro-950 text-neutro-400 mt-auto" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Marca */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-1 mb-3">
              <span className="font-display font-bold text-white text-xl">Guia do</span>
              <span className="font-display font-extrabold text-azul-brilhante text-xl">UERNIANO</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              Portal central para estudantes da UERN. Criado com ❤️ pelo Movimento Correnteza.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a href={siteConfig.links.instagram} aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-white/10 transition-colors text-neutro-400 hover:text-white">
                <Instagram className="w-5 h-5" />
              </a>
              <a href={siteConfig.links.github} aria-label="GitHub" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-white/10 transition-colors text-neutro-400 hover:text-white">
                <Github className="w-5 h-5" />
              </a>
              <a href={`mailto:${siteConfig.links.email}`} aria-label="Email" className="p-2 rounded-full hover:bg-white/10 transition-colors text-neutro-400 hover:text-white">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <nav aria-label="Links do rodapé">
            <h3 className="text-white font-semibold text-sm mb-3">Portal</h3>
            <ul className="space-y-2">
              {[
                { label: 'Início', href: '/' },
                { label: 'Guia da UERN', href: '/guia' },
                { label: 'Blog', href: '/blog' },
                { label: 'Eventos', href: '/eventos' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors no-underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Sobre o movimento">
            <h3 className="text-white font-semibold text-sm mb-3">Movimento</h3>
            <ul className="space-y-2">
              {[
                { label: 'Sobre', href: '/sobre' },
                { label: 'O Correnteza', href: '/movimento' },
                { label: 'Área de Membros', href: '/membros' },
                { label: 'Contato', href: `mailto:${siteConfig.links.email}` },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors no-underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 pt-6 border-t border-neutro-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {year} Guia do UERNIANO. Movimento Correnteza × UERN.</p>
          <p>Feito com código livre para estudantes livres.</p>
        </div>
      </div>
    </footer>
  );
}

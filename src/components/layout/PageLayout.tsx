import { BottomNavBar } from './BottomNavBar';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface PageLayoutProps {
  children: React.ReactNode;
  showFooter?: boolean;
  isAuthenticated?: boolean;
  userName?: string | null;
  userAvatar?: string | null;
}

export function PageLayout({
  children,
  showFooter = true,
  isAuthenticated,
  userName,
  userAvatar,
}: PageLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isAuthenticated={isAuthenticated} userName={userName} userAvatar={userAvatar} />
      <main id="main-content" className="flex-1 pb-20 md:pb-0">
        {children}
      </main>
      {showFooter && <Footer />}
      <div className="md:hidden">
        <BottomNavBar />
      </div>
    </div>
  );
}

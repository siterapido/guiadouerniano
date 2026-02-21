'use client';

import { useState } from 'react';
import { AdminSidebar } from './AdminSidebar';
import { AdminTopBar } from './AdminTopBar';

interface AdminShellProps {
  children: React.ReactNode;
  breadcrumb?: string;
  userName: string | null;
  userAvatar: string | null | undefined;
  pendingComments?: number;
  openReports?: number;
}

export function AdminShell({
  children,
  breadcrumb,
  userName,
  userAvatar,
  pendingComments,
  openReports,
}: AdminShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-neutro-100">
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        pendingComments={pendingComments}
        openReports={openReports}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminTopBar
          onMenuOpen={() => setSidebarOpen(true)}
          breadcrumb={breadcrumb}
          userName={userName}
          userAvatar={userAvatar}
        />
        <main className="flex-1 p-4 md:p-6 max-w-7xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}

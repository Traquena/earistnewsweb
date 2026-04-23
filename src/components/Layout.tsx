/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
  hideLayout?: boolean;
}

export default function Layout({ children, hideLayout = false }: LayoutProps) {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  // Hide header and footer for admin pages - they use AdminNavbar instead
  if (isAdminPage || hideLayout) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}

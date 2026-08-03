'use client';

import React, { useState } from 'react';
import { RoleProvider, useRole } from '@/context/RoleContext';
import { Sidebar } from '@/components/Sidebar';
import { OrdinaryUserDashboard } from '@/components/dashboards/OrdinaryUserDashboard';
import { SuperUserDashboard } from '@/components/dashboards/SuperUserDashboard';
import { AdminDashboard } from '@/components/dashboards/AdminDashboard';
import { ChatInterface } from '@/components/ChatInterface';
import { WalletsView } from '@/components/views/WalletsView';
import { TransactionsView } from '@/components/views/TransactionsView';
import { FinancialProfileView } from '@/components/views/FinancialProfileView';

const WalletsViewComponent = WalletsView;
const TransactionsViewComponent = TransactionsView;

function AppContent() {
  const [activeNav, setActiveNav] = useState('dashboard');
  const { role } = useRole();

  const renderContent = () => {
    // Dashboard
    if (activeNav === 'dashboard') {
      if (role === 'admin') return <AdminDashboard />;
      if (role === 'super-user') return <SuperUserDashboard />;
      return <OrdinaryUserDashboard />;
    }

    // Chat
    if (activeNav === 'chat') {
      return (
        <div className="h-full">
          <ChatInterface />
        </div>
      );
    }

    // Role-specific sections
    if (role === 'user') {
      switch (activeNav) {
        case 'wallets':
          return <WalletsViewComponent />;
        case 'transactions':
          return <TransactionsViewComponent />;
        default:
          return <OrdinaryUserDashboard />;
      }
    }

    if (role === 'super-user') {
      switch (activeNav) {
        case 'profile':
          return <FinancialProfileView />;
        case 'roadmap':
          return <SuperUserDashboard />;
        case 'scenarios':
          return <SuperUserDashboard />;
        default:
          return <SuperUserDashboard />;
      }
    }

    if (role === 'admin') {
      switch (activeNav) {
        case 'users':
        case 'overview':
          return <AdminDashboard />;
        default:
          return <AdminDashboard />;
      }
    }

    return <OrdinaryUserDashboard />;
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar activeNav={activeNav} onNavChange={setActiveNav} />

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 overflow-auto">
        <div className="p-4 md:p-6 lg:p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <RoleProvider>
      <AppContent />
    </RoleProvider>
  );
}

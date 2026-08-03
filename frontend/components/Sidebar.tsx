'use client';

import React from 'react';
import { useRole } from '@/context/RoleContext';
import {
  BarChart3,
  Wallet,
  MessageCircle,
  Users,
  Settings,
  LogOut,
  Shield,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavItem {
  label: string;
  icon: React.ReactNode;
  id: string;
}

export function Sidebar({
  activeNav,
  onNavChange,
}: {
  activeNav: string;
  onNavChange: (id: string) => void;
}) {
  const { role, setRole } = useRole();
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);

  const getNavItems = (): NavItem[] => {
    const baseItems = [{ label: 'Dashboard', icon: <BarChart3 size={20} />, id: 'dashboard' }];

    if (role === 'user') {
      return [
        ...baseItems,
        { label: 'Wallets', icon: <Wallet size={20} />, id: 'wallets' },
        { label: 'Transactions', icon: <BarChart3 size={20} />, id: 'transactions' },
        { label: 'AI Assistant', icon: <MessageCircle size={20} />, id: 'chat' },
      ];
    }

    if (role === 'super-user') {
      return [
        ...baseItems,
        { label: 'Financial Profile', icon: <Settings size={20} />, id: 'profile' },
        { label: 'Roadmap', icon: <BarChart3 size={20} />, id: 'roadmap' },
        { label: 'Scenarios', icon: <BarChart3 size={20} />, id: 'scenarios' },
        { label: 'AI Assistant', icon: <MessageCircle size={20} />, id: 'chat' },
      ];
    }

    if (role === 'admin') {
      return [
        ...baseItems,
        { label: 'User Management', icon: <Users size={20} />, id: 'users' },
        { label: 'System Overview', icon: <Shield size={20} />, id: 'overview' },
      ];
    }

    return baseItems;
  };

  const navItems = getNavItems();

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-50 w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isMobileOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileOpen(false)}
        ></div>
      )}

      <aside
        className={`flex flex-col h-screen w-64 bg-sidebar border-r border-sidebar-border p-6 fixed left-0 top-0 z-40 transition-transform duration-300 lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold">F</span>
            </div>
            <h1 className="text-xl font-bold text-sidebar-foreground">FinanceAI</h1>
          </div>
        </div>

        {/* Role Indicator */}
        <div className="mb-6 p-3 bg-sidebar-accent/10 rounded-lg border border-sidebar-accent/20">
          <p className="text-xs font-semibold text-sidebar-foreground uppercase tracking-wide mb-1">
            Current Role
          </p>
          <p className="text-sm font-semibold text-sidebar-primary capitalize">
            {role === 'super-user' ? 'Super User (PMF)' : role === 'admin' ? 'Admin' : 'Ordinary User'}
          </p>
        </div>

        {/* Navigation */}
      <nav className="flex-1">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => {
                  onNavChange(item.id);
                  setIsMobileOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeNav === item.id
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent/10'
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

        {/* Role Switcher & Actions */}
        <div className="space-y-3 pt-6 border-t border-sidebar-border">
          <p className="text-xs font-semibold text-sidebar-foreground/60 uppercase px-4 mb-3">
            Switch Role
          </p>
          <Button
            variant={role === 'user' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setRole('user')}
            className="w-full justify-start"
          >
            User
          </Button>
          <Button
            variant={role === 'super-user' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setRole('super-user')}
            className="w-full justify-start"
          >
            Super User
          </Button>
          <Button
            variant={role === 'admin' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setRole('admin')}
            className="w-full justify-start"
          >
            Admin
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-destructive hover:text-destructive"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
        </Button>
      </div>
    </aside>
    </>
  );
}

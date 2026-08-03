'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, ChevronDown, ChevronUp } from 'lucide-react';

const guides = [
  {
    role: 'Ordinary User',
    description: 'Manage daily finances with expense tracking and wallets',
    features: [
      'View spending trends with interactive charts',
      'Manage Normal, Emergency, and Cashback wallets',
      'Add and track transactions with categories',
      'Get AI-powered spending insights',
      'Simulate budget changes to see impact',
    ],
  },
  {
    role: 'Super User (PMF)',
    description: 'Plan your financial future with AI-generated roadmaps',
    features: [
      'Set up financial profile (income, debt, goals)',
      'Check investment eligibility status',
      'View phase-based financial roadmap',
      'Simulate income/savings scenarios',
      'Track progress towards financial goals',
    ],
  },
  {
    role: 'Super Admin',
    description: 'Manage users and monitor platform metrics',
    features: [
      'View all registered users',
      'Approve or reject Super User requests',
      'Monitor platform health metrics',
      'View AI-generated system summaries',
      'Manage user roles and permissions',
    ],
  },
];

export function QuickStartGuide() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [showGuide, setShowGuide] = useState(true);

  if (!showGuide) return null;

  return (
    <div className="fixed bottom-6 right-6 max-w-sm z-30">
      <Card className="p-4 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-foreground text-sm">Quick Start Guide</h3>
          <button
            onClick={() => setShowGuide(false)}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <div className="space-y-2 text-sm">
          {guides.map((guide, idx) => (
            <div key={idx} className="border border-border rounded-lg overflow-hidden">
              <button
                onClick={() => setExpanded(expanded === idx ? null : idx)}
                className="w-full flex items-center justify-between p-3 hover:bg-muted/30 transition-colors"
              >
                <div className="text-left">
                  <p className="font-semibold text-foreground">{guide.role}</p>
                  <p className="text-xs text-muted-foreground">{guide.description}</p>
                </div>
                {expanded === idx ? (
                  <ChevronUp size={16} className="text-muted-foreground flex-shrink-0 ml-2" />
                ) : (
                  <ChevronDown size={16} className="text-muted-foreground flex-shrink-0 ml-2" />
                )}
              </button>

              {expanded === idx && (
                <div className="bg-muted/30 border-t border-border p-3 space-y-2">
                  {guide.features.map((feature, fidx) => (
                    <div key={fidx} className="flex items-start gap-2">
                      <span className="text-primary font-bold mt-0.5">•</span>
                      <span className="text-muted-foreground text-xs">{feature}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="text-xs text-muted-foreground mt-4 text-center">
          Use the role switcher in the sidebar to explore different user experiences
        </p>
      </Card>
    </div>
  );
}

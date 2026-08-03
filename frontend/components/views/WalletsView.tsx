'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { AlertCircle, TrendingUp, Zap } from 'lucide-react';

const normalWalletData = [
  { date: 'Jan 1', balance: 6000 },
  { date: 'Jan 5', balance: 5500 },
  { date: 'Jan 10', balance: 7200 },
  { date: 'Jan 15', balance: 8100 },
  { date: 'Jan 20', balance: 8000 },
  { date: 'Jan 25', balance: 8450 },
];

const cashbackGrowthData = [
  { month: 'Nov', growth: 85 },
  { month: 'Dec', growth: 105 },
  { month: 'Jan', growth: 127.5 },
];

export function WalletsView() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Wallets Management</h1>
        <p className="text-muted-foreground mt-1">Manage your multiple wallets and track growth</p>
      </div>

      {/* Wallet Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Normal Wallet */}
        <Card className="p-6 border-l-4 border-l-primary">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-muted-foreground text-sm font-medium">Normal Wallet</p>
              <p className="text-3xl font-bold text-foreground mt-2">$8,450.00</p>
            </div>
            <Zap size={24} className="text-primary/30" />
          </div>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Monthly Budget</span>
              <span className="text-foreground font-semibold">$10,000</span>
            </div>
            <div className="w-full bg-border rounded-full h-2">
              <div className="bg-primary h-2 rounded-full" style={{ width: '84.5%' }}></div>
            </div>
          </div>
          <Button className="w-full" size="sm">
            Transfer Funds
          </Button>
        </Card>

        {/* Emergency Fund */}
        <Card className="p-6 border-l-4 border-l-destructive">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-muted-foreground text-sm font-medium">Emergency Fund</p>
              <p className="text-3xl font-bold text-foreground mt-2">$3,200.00</p>
            </div>
            <AlertCircle size={24} className="text-destructive/30" />
          </div>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Target Coverage</span>
              <span className="text-foreground font-semibold">6 Months</span>
            </div>
            <div className="w-full bg-border rounded-full h-2">
              <div className="bg-destructive h-2 rounded-full" style={{ width: '53%' }}></div>
            </div>
          </div>
          <Button className="w-full" variant="destructive" size="sm">
            Emergency Withdraw
          </Button>
        </Card>

        {/* Cashback Wallet */}
        <Card className="p-6 border-l-4 border-l-accent">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-muted-foreground text-sm font-medium">Cashback Wallet</p>
              <p className="text-3xl font-bold text-foreground mt-2">$127.50</p>
            </div>
            <TrendingUp size={24} className="text-accent/30" />
          </div>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Monthly Addition</span>
              <span className="text-foreground font-semibold">+$22.50</span>
            </div>
            <div className="text-xs text-accent font-semibold mt-2">Auto-compounding enabled</div>
          </div>
          <Button className="w-full" size="sm" variant="secondary">
            View Details
          </Button>
        </Card>
      </div>

      {/* Normal Wallet Activity */}
      <Card className="p-6">
        <h2 className="text-lg font-bold text-foreground mb-4">Normal Wallet Balance Trend</h2>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={normalWalletData}>
            <defs>
              <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis stroke="var(--color-muted-foreground)" />
            <YAxis stroke="var(--color-muted-foreground)" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--color-card)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
              }}
            />
            <Area
              type="monotone"
              dataKey="balance"
              stroke="var(--color-primary)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorBalance)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      {/* Cashback Growth */}
      <Card className="p-6">
        <h2 className="text-lg font-bold text-foreground mb-4">Cashback Wallet Growth</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={cashbackGrowthData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis stroke="var(--color-muted-foreground)" />
            <YAxis stroke="var(--color-muted-foreground)" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--color-card)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
              }}
            />
            <Line
              type="monotone"
              dataKey="growth"
              stroke="var(--color-accent)"
              strokeWidth={3}
              dot={{ fill: 'var(--color-accent)', r: 5 }}
              name="Cashback Balance"
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}

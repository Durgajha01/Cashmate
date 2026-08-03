'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import {
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { TrendingUp, AlertCircle, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const expenseData = [
  { month: 'Jan', spending: 2400 },
  { month: 'Feb', spending: 2210 },
  { month: 'Mar', spending: 2290 },
  { month: 'Apr', spending: 2000 },
  { month: 'May', spending: 2181 },
  { month: 'Jun', spending: 2500 },
];

const categoryData = [
  { name: 'Food', value: 400 },
  { name: 'Transport', value: 300 },
  { name: 'Entertainment', value: 200 },
  { name: 'Utilities', value: 250 },
  { name: 'Shopping', value: 350 },
];

const COLORS = ['#4f7eff', '#21d8a4', '#ffa84d', '#ff6b6b', '#845ef7'];

const transactions = [
  { id: 1, date: '2024-01-15', type: 'debit', amount: 45.99, note: 'Grocery Shopping' },
  { id: 2, date: '2024-01-14', type: 'credit', amount: 2000, note: 'Salary Deposit' },
  { id: 3, date: '2024-01-13', type: 'debit', amount: 120, note: 'Gas' },
  { id: 4, date: '2024-01-12', type: 'debit', amount: 65.5, note: 'Restaurant' },
];

export function OrdinaryUserDashboard() {
  const [showTransactionForm, setShowTransactionForm] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Welcome Back, User</h1>
        <p className="text-muted-foreground mt-1 text-sm md:text-base">Here's your financial overview for this month</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="p-6">
          <p className="text-muted-foreground text-sm font-medium">Total Monthly Spending</p>
          <p className="text-3xl font-bold text-foreground mt-2">$2,500</p>
          <div className="flex items-center gap-2 mt-3 text-destructive">
            <TrendingUp size={16} />
            <span className="text-sm font-medium">+5.2% from last month</span>
          </div>
        </Card>

        <Card className="p-6">
          <p className="text-muted-foreground text-sm font-medium">Available Balance</p>
          <p className="text-3xl font-bold text-foreground mt-2">$8,450</p>
          <div className="flex items-center gap-2 mt-3 text-muted-foreground">
            <span className="text-sm font-medium">In Normal Wallet</span>
          </div>
        </Card>

        <Card className="p-6">
          <p className="text-muted-foreground text-sm font-medium">Cashback Earned</p>
          <p className="text-3xl font-bold text-accent mt-2">$127.50</p>
          <div className="flex items-center gap-2 mt-3 text-secondary">
            <span className="text-sm font-medium">Auto-accumulated</span>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Spending Trend */}
        <Card className="p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Month-over-Month Spending</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={expenseData}>
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
              <Legend />
              <Line
                type="monotone"
                dataKey="spending"
                stroke="var(--color-primary)"
                strokeWidth={3}
                dot={{ fill: 'var(--color-primary)', r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Category Breakdown */}
        <Card className="p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Spending by Category</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: $${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Wallets Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Normal Wallet */}
        <Card className="p-6 border-l-4 border-l-primary">
          <h3 className="text-lg font-bold text-foreground mb-4">Normal Wallet</h3>
          <p className="text-3xl font-bold text-foreground mb-2">$8,450.00</p>
          <p className="text-sm text-muted-foreground mb-4">Active wallet for daily transactions</p>
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">Recent Transactions</p>
            <div className="text-sm text-foreground">+$2000 (Salary)</div>
            <div className="text-sm text-destructive">-$450 (Expenses)</div>
          </div>
        </Card>

        {/* Emergency Fund */}
        <Card className="p-6 border-l-4 border-l-destructive">
          <h3 className="text-lg font-bold text-foreground mb-4">Emergency Fund</h3>
          <p className="text-3xl font-bold text-foreground mb-2">$3,200.00</p>
          <p className="text-sm text-muted-foreground mb-4">For unexpected expenses</p>
          <Button className="w-full" variant="destructive" size="sm">
            <AlertCircle size={16} />
            Withdraw (with warning)
          </Button>
        </Card>

        {/* Cashback Wallet */}
        <Card className="p-6 border-l-4 border-l-accent">
          <h3 className="text-lg font-bold text-foreground mb-4">Cashback Wallet</h3>
          <p className="text-3xl font-bold text-foreground mb-2">$127.50</p>
          <p className="text-sm text-muted-foreground mb-2">Auto-accumulated rewards</p>
          <div className="mb-3 p-2 bg-accent/10 rounded text-xs text-foreground">
            <span className="font-semibold">Growth:</span> +$12.50 this month
          </div>
          <Button className="w-full" size="sm" variant="secondary">
            View Growth
          </Button>
        </Card>
      </div>

      {/* Transactions */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-foreground">Recent Transactions</h2>
          <Button
            size="sm"
            onClick={() => setShowTransactionForm(!showTransactionForm)}
            className="gap-2"
          >
            <Plus size={16} />
            Add Transaction
          </Button>
        </div>

        {showTransactionForm && (
          <div className="mb-6 p-4 bg-muted/30 rounded-lg border border-border">
            <h3 className="font-semibold text-foreground mb-4">Manual Transaction Entry</h3>
            <div className="space-y-3">
              <input
                type="number"
                placeholder="Amount ($)"
                className="w-full px-3 py-2 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              />
              <div className="flex gap-2">
                <button className="flex-1 px-3 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-600 rounded-lg font-medium transition-colors">
                  Credit (+)
                </button>
                <button className="flex-1 px-3 py-2 bg-destructive/20 hover:bg-destructive/30 text-destructive rounded-lg font-medium transition-colors">
                  Debit (-)
                </button>
              </div>
              <input
                type="text"
                placeholder="Short note (e.g., Grocery Shopping)"
                className="w-full px-3 py-2 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              />
              <Button className="w-full">Record Transaction</Button>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-muted-foreground font-semibold">Date</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-semibold">Type</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-semibold">Amount</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-semibold">Note</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                  <td className="py-3 px-4 text-foreground">{tx.date}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        tx.type === 'credit'
                          ? 'bg-green-500/20 text-green-600'
                          : 'bg-red-500/20 text-red-600'
                      }`}
                    >
                      {tx.type.toUpperCase()}
                    </span>
                  </td>
                  <td className={`py-3 px-4 font-semibold ${tx.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                    {tx.type === 'credit' ? '+' : '-'}${tx.amount}
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">{tx.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

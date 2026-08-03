'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, Filter, Download, Plus } from 'lucide-react';

const allTransactions = [
  { id: 1, date: '2024-01-25', type: 'debit', amount: 45.99, note: 'Grocery Shopping', category: 'Food' },
  { id: 2, date: '2024-01-24', type: 'credit', amount: 2000, note: 'Salary Deposit', category: 'Income' },
  { id: 3, date: '2024-01-23', type: 'debit', amount: 120, note: 'Gas Station', category: 'Transport' },
  { id: 4, date: '2024-01-22', type: 'debit', amount: 65.5, note: 'Restaurant Dinner', category: 'Food' },
  { id: 5, date: '2024-01-21', type: 'debit', amount: 150, note: 'Movie Tickets', category: 'Entertainment' },
  { id: 6, date: '2024-01-20', type: 'debit', amount: 89.99, note: 'Online Shopping', category: 'Shopping' },
  { id: 7, date: '2024-01-19', type: 'debit', amount: 250, note: 'Utilities Payment', category: 'Bills' },
  { id: 8, date: '2024-01-18', type: 'credit', amount: 500, note: 'Freelance Project', category: 'Income' },
  { id: 9, date: '2024-01-17', type: 'debit', amount: 75, note: 'Gym Membership', category: 'Health' },
  { id: 10, date: '2024-01-16', type: 'debit', amount: 42.3, note: 'Coffee & Snacks', category: 'Food' },
];

const categoryStats = [
  { name: 'Food', spent: 450.78, percentage: 18 },
  { name: 'Transport', spent: 320, percentage: 13 },
  { name: 'Entertainment', spent: 150, percentage: 6 },
  { name: 'Shopping', spent: 89.99, percentage: 4 },
  { name: 'Bills', spent: 250, percentage: 10 },
  { name: 'Other', spent: 300, percentage: 12 },
];

export function TransactionsView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [showAddForm, setShowAddForm] = useState(false);

  const filteredTransactions = allTransactions.filter((tx) => {
    const matchesSearch = tx.note.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || tx.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Transaction History</h1>
        <p className="text-muted-foreground mt-1">Track and manage all your transactions</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <p className="text-muted-foreground text-sm font-medium">Total Spent (Jan)</p>
          <p className="text-3xl font-bold text-destructive mt-2">$2,473.76</p>
          <p className="text-xs text-muted-foreground mt-2">10 transactions this month</p>
        </Card>

        <Card className="p-6">
          <p className="text-muted-foreground text-sm font-medium">Total Income (Jan)</p>
          <p className="text-3xl font-bold text-green-600 mt-2">$2,500</p>
          <p className="text-xs text-muted-foreground mt-2">2 income transactions</p>
        </Card>

        <Card className="p-6">
          <p className="text-muted-foreground text-sm font-medium">Monthly Savings</p>
          <p className="text-3xl font-bold text-primary mt-2">$26.24</p>
          <p className="text-xs text-muted-foreground mt-2">This month balance</p>
        </Card>
      </div>

      {/* Category Breakdown */}
      <Card className="p-6">
        <h2 className="text-lg font-bold text-foreground mb-4">Spending by Category</h2>
        <div className="space-y-4">
          {categoryStats.map((cat) => (
            <div key={cat.name}>
              <div className="flex justify-between mb-2">
                <p className="text-sm font-semibold text-foreground">{cat.name}</p>
                <p className="text-sm text-muted-foreground">${cat.spent.toFixed(2)}</p>
              </div>
              <div className="w-full bg-border rounded-full h-3">
                <div
                  className="bg-primary h-3 rounded-full"
                  style={{
                    width: `${Math.min(cat.percentage * 5, 100)}%`,
                    backgroundColor: `var(--color-chart-${(categoryStats.indexOf(cat) % 5) + 1})`,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Filters & Actions */}
      <Card className="p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
          <div className="flex gap-3 flex-1">
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-border rounded-lg bg-card text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none"
            >
              <option value="">All Categories</option>
              {categoryStats.map((cat) => (
                <option key={cat.name} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Filter size={16} />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Download size={16} />
              Export
            </Button>
            <Button
              size="sm"
              className="gap-2"
              onClick={() => setShowAddForm(!showAddForm)}
            >
              <Plus size={16} />
              Add Transaction
            </Button>
          </div>
        </div>

        {/* Add Transaction Form */}
        {showAddForm && (
          <div className="mb-6 p-4 bg-muted/30 rounded-lg border border-border">
            <h3 className="font-semibold text-foreground mb-4">Add New Transaction</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  placeholder="Amount ($)"
                  className="px-3 py-2 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                />
                <input
                  type="date"
                  className="px-3 py-2 border border-border rounded-lg bg-card text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                />
              </div>
              <div className="flex gap-2">
                <button className="flex-1 px-3 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-600 rounded-lg font-medium transition-colors">
                  Credit (+)
                </button>
                <button className="flex-1 px-3 py-2 bg-destructive/20 hover:bg-destructive/30 text-destructive rounded-lg font-medium transition-colors">
                  Debit (-)
                </button>
              </div>
              <select className="w-full px-3 py-2 border border-border rounded-lg bg-card text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none">
                <option>Select Category</option>
                {categoryStats.map((cat) => (
                  <option key={cat.name} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Description"
                className="w-full px-3 py-2 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              />
              <Button className="w-full">Add Transaction</Button>
            </div>
          </div>
        )}

        {/* Transactions Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-muted-foreground font-semibold">Date</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-semibold">Description</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-semibold">Category</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-semibold">Type</th>
                <th className="text-right py-3 px-4 text-muted-foreground font-semibold">Amount</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((tx) => (
                  <tr key={tx.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4 text-foreground">{tx.date}</td>
                    <td className="py-3 px-4 text-foreground font-medium">{tx.note}</td>
                    <td className="py-3 px-4 text-muted-foreground">{tx.category}</td>
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
                    <td
                      className={`py-3 px-4 text-right font-semibold ${
                        tx.type === 'credit' ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {tx.type === 'credit' ? '+' : '-'}${tx.amount.toFixed(2)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-8 px-4 text-center text-muted-foreground">
                    No transactions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

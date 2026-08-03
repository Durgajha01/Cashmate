'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Save, Edit2 } from 'lucide-react';

export function FinancialProfileView() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    monthlyIncome: '5000',
    totalDebt: '12000',
    monthlyExpenses: '2800',
    savingsTarget: '50000',
    savingsDeadline: '2026',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Financial Profile</h1>
          <p className="text-muted-foreground mt-1">Manage your financial information and goals</p>
        </div>
        <Button
          variant={isEditing ? 'default' : 'outline'}
          onClick={() => setIsEditing(!isEditing)}
          className="gap-2"
        >
          <Edit2 size={16} />
          {isEditing ? 'Cancel' : 'Edit'}
        </Button>
      </div>

      {/* Profile Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Monthly Income */}
        <Card className="p-6">
          <label className="text-sm text-muted-foreground font-semibold mb-2 block">
            Monthly Income
          </label>
          {isEditing ? (
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold text-foreground">$</span>
              <input
                type="text"
                name="monthlyIncome"
                value={formData.monthlyIncome}
                onChange={handleInputChange}
                className="flex-1 px-3 py-2 border border-border rounded-lg bg-card text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              />
            </div>
          ) : (
            <p className="text-3xl font-bold text-foreground">${formData.monthlyIncome}</p>
          )}
          <p className="text-xs text-muted-foreground mt-3">Base salary + additional income</p>
        </Card>

        {/* Total Debt */}
        <Card className="p-6">
          <label className="text-sm text-muted-foreground font-semibold mb-2 block">
            Total Debt
          </label>
          {isEditing ? (
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold text-foreground">$</span>
              <input
                type="text"
                name="totalDebt"
                value={formData.totalDebt}
                onChange={handleInputChange}
                className="flex-1 px-3 py-2 border border-border rounded-lg bg-card text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              />
            </div>
          ) : (
            <p className="text-3xl font-bold text-destructive">${formData.totalDebt}</p>
          )}
          <p className="text-xs text-muted-foreground mt-3">Credit cards, loans, student debt</p>
        </Card>

        {/* Monthly Expenses */}
        <Card className="p-6">
          <label className="text-sm text-muted-foreground font-semibold mb-2 block">
            Monthly Expenses
          </label>
          {isEditing ? (
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold text-foreground">$</span>
              <input
                type="text"
                name="monthlyExpenses"
                value={formData.monthlyExpenses}
                onChange={handleInputChange}
                className="flex-1 px-3 py-2 border border-border rounded-lg bg-card text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              />
            </div>
          ) : (
            <p className="text-3xl font-bold text-foreground">${formData.monthlyExpenses}</p>
          )}
          <p className="text-xs text-muted-foreground mt-3">Rent, utilities, food, etc.</p>
        </Card>

        {/* Financial Goals */}
        <Card className="p-6 md:col-span-1">
          <label className="text-sm text-muted-foreground font-semibold mb-2 block">
            Savings Target
          </label>
          {isEditing ? (
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold text-foreground">$</span>
              <input
                type="text"
                name="savingsTarget"
                value={formData.savingsTarget}
                onChange={handleInputChange}
                className="flex-1 px-3 py-2 border border-border rounded-lg bg-card text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              />
            </div>
          ) : (
            <p className="text-3xl font-bold text-accent">${formData.savingsTarget}</p>
          )}
          <p className="text-xs text-muted-foreground mt-3">Long-term financial goal</p>
        </Card>

        {/* Timeline */}
        <Card className="p-6">
          <label className="text-sm text-muted-foreground font-semibold mb-2 block">
            Target Completion Year
          </label>
          {isEditing ? (
            <input
              type="text"
              name="savingsDeadline"
              value={formData.savingsDeadline}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-border rounded-lg bg-card text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none"
            />
          ) : (
            <p className="text-3xl font-bold text-foreground">{formData.savingsDeadline}</p>
          )}
          <p className="text-xs text-muted-foreground mt-3">Expected goal achievement date</p>
        </Card>
      </div>

      {/* Financial Health Summary */}
      <Card className="p-6">
        <h2 className="text-lg font-bold text-foreground mb-6">Financial Health Metrics</h2>

        <div className="space-y-4">
          {/* Debt-to-Income Ratio */}
          <div>
            <div className="flex justify-between mb-2">
              <p className="text-sm font-semibold text-foreground">Debt-to-Income Ratio</p>
              <p className="text-sm font-semibold text-foreground">
                {((Number(formData.totalDebt) / (Number(formData.monthlyIncome) * 12)) * 100).toFixed(1)}%
              </p>
            </div>
            <div className="w-full bg-border rounded-full h-3">
              <div
                className="bg-destructive h-3 rounded-full"
                style={{
                  width: Math.min((Number(formData.totalDebt) / (Number(formData.monthlyIncome) * 12)) * 100, 100) + '%',
                }}
              ></div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Target: Below 36%</p>
          </div>

          {/* Savings Rate */}
          <div>
            <div className="flex justify-between mb-2">
              <p className="text-sm font-semibold text-foreground">Monthly Savings Rate</p>
              <p className="text-sm font-semibold text-foreground">
                {((Number(formData.monthlyIncome) - Number(formData.monthlyExpenses)) / Number(formData.monthlyIncome) * 100).toFixed(1)}%
              </p>
            </div>
            <div className="w-full bg-border rounded-full h-3">
              <div
                className="bg-primary h-3 rounded-full"
                style={{
                  width: Math.max((Number(formData.monthlyIncome) - Number(formData.monthlyExpenses)) / Number(formData.monthlyIncome) * 100, 0) + '%',
                }}
              ></div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Target: Above 20%</p>
          </div>

          {/* Monthly Surplus */}
          <div>
            <div className="flex justify-between mb-2">
              <p className="text-sm font-semibold text-foreground">Monthly Surplus</p>
              <p className="text-sm font-semibold text-green-600">
                ${(Number(formData.monthlyIncome) - Number(formData.monthlyExpenses)).toFixed(0)}
              </p>
            </div>
            <div className="w-full bg-border rounded-full h-3">
              <div
                className="bg-green-600 h-3 rounded-full"
                style={{
                  width: Math.max((Number(formData.monthlyIncome) - Number(formData.monthlyExpenses)) / Number(formData.monthlyIncome) * 100, 0) + '%',
                }}
              ></div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Available for savings and investments</p>
          </div>
        </div>
      </Card>

      {/* Financial Goals Timeline */}
      <Card className="p-6">
        <h2 className="text-lg font-bold text-foreground mb-6">Goals Timeline</h2>

        <div className="space-y-4">
          <div className="border-l-4 border-l-primary pl-4 py-3">
            <h3 className="font-semibold text-foreground">Phase 1: Stabilization</h3>
            <p className="text-sm text-muted-foreground mt-1">Build emergency fund and establish spending discipline</p>
            <p className="text-xs text-muted-foreground mt-2">Timeline: Months 1-3</p>
          </div>

          <div className="border-l-4 border-l-accent pl-4 py-3">
            <h3 className="font-semibold text-foreground">Phase 2: Debt Clearance</h3>
            <p className="text-sm text-muted-foreground mt-1">Focus on eliminating high-interest debt</p>
            <p className="text-xs text-muted-foreground mt-2">Timeline: Months 4-8</p>
          </div>

          <div className="border-l-4 border-l-secondary pl-4 py-3">
            <h3 className="font-semibold text-foreground">Phase 3: Investment Growth</h3>
            <p className="text-sm text-muted-foreground mt-1">Begin strategic investing towards long-term goals</p>
            <p className="text-xs text-muted-foreground mt-2">Timeline: Months 9+</p>
          </div>
        </div>
      </Card>

      {/* Save Button */}
      {isEditing && (
        <div className="flex gap-3">
          <Button
            onClick={handleSave}
            className="gap-2 flex-1"
          >
            <Save size={16} />
            Save Changes
          </Button>
          <Button
            variant="outline"
            onClick={() => setIsEditing(false)}
            className="flex-1"
          >
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
}

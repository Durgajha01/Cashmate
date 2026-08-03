'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CheckCircle, AlertCircle, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const roadmapData = [
  { phase: 'Month 1-3', stabilization: 80, name: 'Stabilization' },
  { phase: 'Month 4-6', debtClearance: 60, name: 'Debt Clearance' },
  { phase: 'Month 7-12', investment: 40, name: 'Transition to Investment' },
];

export function SuperUserDashboard() {
  const [showScenarioSliders, setShowScenarioSliders] = useState(false);
  const [incomeSimulation, setIncomeSimulation] = useState(0);
  const [savingsSimulation, setSavingsSimulation] = useState(0);

  const eligibilityStatus = 'allowed';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Financial Roadmap</h1>
        <p className="text-muted-foreground mt-1">Your personalized path to financial stability and wealth</p>
      </div>

      {/* Financial Profile Section */}
      <Card className="p-6">
        <h2 className="text-lg font-bold text-foreground mb-6">Financial Profile</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-muted/30 rounded-lg border border-border">
            <p className="text-xs text-muted-foreground font-semibold mb-1">Monthly Income</p>
            <p className="text-2xl font-bold text-foreground">$5,000</p>
            <p className="text-xs text-muted-foreground mt-2">Base salary + freelance</p>
          </div>

          <div className="p-4 bg-muted/30 rounded-lg border border-border">
            <p className="text-xs text-muted-foreground font-semibold mb-1">Total Debt</p>
            <p className="text-2xl font-bold text-destructive">$12,000</p>
            <p className="text-xs text-muted-foreground mt-2">Credit card + student loans</p>
          </div>

          <div className="p-4 bg-muted/30 rounded-lg border border-border">
            <p className="text-xs text-muted-foreground font-semibold mb-1">Monthly Expenses</p>
            <p className="text-2xl font-bold text-foreground">$2,800</p>
            <p className="text-xs text-muted-foreground mt-2">Including savings</p>
          </div>

          <div className="p-4 bg-muted/30 rounded-lg border border-border">
            <p className="text-xs text-muted-foreground font-semibold mb-1">Financial Goals</p>
            <p className="text-2xl font-bold text-accent">$50,000</p>
            <p className="text-xs text-muted-foreground mt-2">By 2026</p>
          </div>
        </div>
      </Card>

      {/* Eligibility Status */}
      <Card className="p-6">
        <h2 className="text-lg font-bold text-foreground mb-6">Investment Eligibility Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Allowed Badge */}
          <div className={`p-6 rounded-lg border-2 transition-all ${eligibilityStatus === 'allowed' ? 'border-accent bg-accent/10' : 'border-muted bg-muted/30 opacity-50'}`}>
            <div className="flex items-center gap-3 mb-3">
              <CheckCircle
                size={24}
                className={eligibilityStatus === 'allowed' ? 'text-accent' : 'text-muted-foreground'}
              />
              <h3 className="font-bold text-foreground">Allowed</h3>
            </div>
            <p className="text-sm text-muted-foreground">You are eligible to start investing. Your debt-to-income ratio is within healthy limits.</p>
          </div>

          {/* Limited Badge */}
          <div className={`p-6 rounded-lg border-2 transition-all ${eligibilityStatus === 'limited' ? 'border-secondary bg-secondary/10' : 'border-muted bg-muted/30 opacity-50'}`}>
            <div className="flex items-center gap-3 mb-3">
              <AlertCircle
                size={24}
                className={eligibilityStatus === 'limited' ? 'text-secondary' : 'text-muted-foreground'}
              />
              <h3 className="font-bold text-foreground">Limited</h3>
            </div>
            <p className="text-sm text-muted-foreground">You can invest with restrictions. Focus on clearing high-interest debt first.</p>
          </div>

          {/* Blocked Badge */}
          <div className={`p-6 rounded-lg border-2 transition-all ${eligibilityStatus === 'blocked' ? 'border-destructive bg-destructive/10' : 'border-muted bg-muted/30 opacity-50'}`}>
            <div className="flex items-center gap-3 mb-3">
              <Lock
                size={24}
                className={eligibilityStatus === 'blocked' ? 'text-destructive' : 'text-muted-foreground'}
              />
              <h3 className="font-bold text-foreground">Blocked</h3>
            </div>
            <p className="text-sm text-muted-foreground">Investment is blocked. Prioritize debt clearance and emergency fund.</p>
          </div>
        </div>
      </Card>

      {/* Financial Roadmap */}
      <Card className="p-6">
        <h2 className="text-lg font-bold text-foreground mb-6">Your Financial Roadmap</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Three-phase journey to financial freedom: stabilize, clear debt, then invest strategically.
        </p>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={roadmapData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="phase" stroke="var(--color-muted-foreground)" />
            <YAxis stroke="var(--color-muted-foreground)" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--color-card)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
              }}
            />
            <Bar dataKey="stabilization" fill="var(--color-primary)" name="Stabilization" />
            <Bar dataKey="debtClearance" fill="var(--color-accent)" name="Debt Clearance" />
            <Bar dataKey="investment" fill="var(--color-secondary)" name="Investment" />
          </BarChart>
        </ResponsiveContainer>

        {/* Milestone Timeline */}
        <div className="mt-8 space-y-4">
          <h3 className="font-semibold text-foreground">Phase Details</h3>

          <div className="border-l-4 border-l-primary pl-4 py-3">
            <h4 className="font-semibold text-foreground mb-1">Phase 1: Stabilization (Months 1-3)</h4>
            <p className="text-sm text-muted-foreground mb-2">Build 3-month emergency fund and establish budget discipline</p>
            <p className="text-xs text-primary font-semibold">Target: $8,400 emergency fund</p>
          </div>

          <div className="border-l-4 border-l-accent pl-4 py-3">
            <h4 className="font-semibold text-foreground mb-1">Phase 2: Debt Clearance (Months 4-6)</h4>
            <p className="text-sm text-muted-foreground mb-2">Focus on high-interest debt elimination</p>
            <p className="text-xs text-accent font-semibold">Target: Clear $5,000 of debt</p>
          </div>

          <div className="border-l-4 border-l-secondary pl-4 py-3">
            <h4 className="font-semibold text-foreground mb-1">Phase 3: Investment Transition (Months 7-12)</h4>
            <p className="text-sm text-muted-foreground mb-2">Begin strategic investing towards long-term goals</p>
            <p className="text-xs text-secondary font-semibold">Target: Achieve $50,000 investment goal</p>
          </div>
        </div>
      </Card>

      {/* Scenario Preview */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-foreground">Scenario Preview</h2>
            <p className="text-sm text-muted-foreground">Simulate changes to see impact on your roadmap</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => setShowScenarioSliders(!showScenarioSliders)}>
            {showScenarioSliders ? 'Hide' : 'Show'} Sliders
          </Button>
        </div>

        {showScenarioSliders && (
          <div className="space-y-6 p-4 bg-muted/30 rounded-lg border border-border">
            <div>
              <label className="text-sm font-semibold text-foreground block mb-2">
                Income Increase: {incomeSimulation > 0 ? '+' : ''} {incomeSimulation}%
              </label>
              <input
                type="range"
                min="-30"
                max="50"
                value={incomeSimulation}
                onChange={(e) => setIncomeSimulation(Number(e.target.value))}
                className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <p className="text-xs text-muted-foreground mt-2">
                Simulated income: ${(5000 * (1 + incomeSimulation / 100)).toFixed(0)}/month
              </p>
            </div>

            <div>
              <label className="text-sm font-semibold text-foreground block mb-2">
                Savings Rate: {savingsSimulation > 0 ? '+' : ''} {savingsSimulation}%
              </label>
              <input
                type="range"
                min="-25"
                max="40"
                value={savingsSimulation}
                onChange={(e) => setSavingsSimulation(Number(e.target.value))}
                className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-accent"
              />
              <p className="text-xs text-muted-foreground mt-2">
                Simulated monthly savings: ${(2200 * (1 + savingsSimulation / 100)).toFixed(0)}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 p-4 bg-card rounded-lg border border-border">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Debt Clearance</p>
                <p className="text-xl font-bold text-accent">Month 5</p>
                <p className="text-xs text-muted-foreground">Earlier by 1 month</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Goal Achievement</p>
                <p className="text-xl font-bold text-secondary">2025</p>
                <p className="text-xs text-muted-foreground">1 year faster</p>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

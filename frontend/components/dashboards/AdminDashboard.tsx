'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Clock, Users, TrendingUp, BarChart3 } from 'lucide-react';

const pendingUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    requestedRole: 'super-user',
    appliedDate: '2024-01-15',
    status: 'pending',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    requestedRole: 'super-user',
    appliedDate: '2024-01-14',
    status: 'pending',
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike@example.com',
    requestedRole: 'super-user',
    appliedDate: '2024-01-13',
    status: 'pending',
  },
];

const allUsers = [
  { id: 1, name: 'Alice Brown', email: 'alice@example.com', role: 'user', joinDate: '2023-12-01' },
  { id: 2, name: 'Bob Wilson', email: 'bob@example.com', role: 'super-user', joinDate: '2023-11-15' },
  { id: 3, name: 'Carol White', email: 'carol@example.com', role: 'user', joinDate: '2023-10-20' },
  { id: 4, name: 'David Lee', email: 'david@example.com', role: 'user', joinDate: '2023-09-10' },
  { id: 5, name: 'Emma Davis', email: 'emma@example.com', role: 'super-user', joinDate: '2023-08-05' },
];

export function AdminDashboard() {
  const [approvedUsers, setApprovedUsers] = useState<string[]>([]);
  const [rejectedUsers, setRejectedUsers] = useState<string[]>([]);

  const handleApprove = (userId: string) => {
    setApprovedUsers([...approvedUsers, userId]);
  };

  const handleReject = (userId: string) => {
    setRejectedUsers([...rejectedUsers, userId]);
  };

  const pendingCount = pendingUsers.length - approvedUsers.length - rejectedUsers.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">Manage users and monitor platform metrics</p>
      </div>

      {/* System Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm font-medium">Total Users</p>
              <p className="text-3xl font-bold text-foreground mt-2">1,247</p>
              <p className="text-xs text-muted-foreground mt-2">+12% this month</p>
            </div>
            <Users size={32} className="text-primary/30" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm font-medium">Super Users</p>
              <p className="text-3xl font-bold text-foreground mt-2">156</p>
              <p className="text-xs text-muted-foreground mt-2">12.5% conversion</p>
            </div>
            <TrendingUp size={32} className="text-accent/30" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm font-medium">Pending Approvals</p>
              <p className="text-3xl font-bold text-secondary mt-2">{pendingCount}</p>
              <p className="text-xs text-muted-foreground mt-2">Awaiting action</p>
            </div>
            <Clock size={32} className="text-secondary/30" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm font-medium">Platform Health</p>
              <p className="text-3xl font-bold text-foreground mt-2">98.5%</p>
              <p className="text-xs text-muted-foreground mt-2">System uptime</p>
            </div>
            <BarChart3 size={32} className="text-primary/30" />
          </div>
        </Card>
      </div>

      {/* User Approval Section */}
      <Card className="p-6">
        <h2 className="text-lg font-bold text-foreground mb-6">Super User Approval Requests</h2>

        {pendingCount === 0 && approvedUsers.length > 0 ? (
          <div className="p-6 bg-accent/10 rounded-lg border border-accent/20 text-center">
            <CheckCircle size={32} className="mx-auto text-accent mb-3" />
            <p className="text-foreground font-semibold">All requests processed!</p>
            <p className="text-sm text-muted-foreground mt-1">You have reviewed all pending approvals.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-muted-foreground font-semibold">Name</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-semibold">Email</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-semibold">Requested Role</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-semibold">Applied Date</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingUsers.map((user) => {
                  const isApproved = approvedUsers.includes(user.id.toString());
                  const isRejected = rejectedUsers.includes(user.id.toString());
                  const processed = isApproved || isRejected;

                  if (processed) return null;

                  return (
                    <tr key={user.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                      <td className="py-3 px-4 text-foreground font-medium">{user.name}</td>
                      <td className="py-3 px-4 text-muted-foreground">{user.email}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-primary/20 text-primary rounded text-xs font-semibold">
                          {user.requestedRole === 'super-user' ? 'Super User (PMF)' : user.requestedRole}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">{user.appliedDate}</td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="gap-1 bg-green-600 hover:bg-green-700"
                            onClick={() => handleApprove(user.id.toString())}
                          >
                            <CheckCircle size={14} />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            className="gap-1"
                            onClick={() => handleReject(user.id.toString())}
                          >
                            <XCircle size={14} />
                            Reject
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {approvedUsers.length > 0 && (
              <div className="mt-6 p-4 bg-accent/10 rounded-lg border border-accent/20">
                <p className="text-sm text-foreground font-semibold mb-2">Approved Requests:</p>
                <ul className="space-y-1">
                  {pendingUsers
                    .filter((u) => approvedUsers.includes(u.id.toString()))
                    .map((user) => (
                      <li key={user.id} className="text-sm text-muted-foreground flex items-center gap-2">
                        <CheckCircle size={14} className="text-accent" />
                        {user.name} - Approved
                      </li>
                    ))}
                </ul>
              </div>
            )}

            {rejectedUsers.length > 0 && (
              <div className="mt-3 p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                <p className="text-sm text-foreground font-semibold mb-2">Rejected Requests:</p>
                <ul className="space-y-1">
                  {pendingUsers
                    .filter((u) => rejectedUsers.includes(u.id.toString()))
                    .map((user) => (
                      <li key={user.id} className="text-sm text-muted-foreground flex items-center gap-2">
                        <XCircle size={14} className="text-destructive" />
                        {user.name} - Rejected
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </Card>

      {/* User Management */}
      <Card className="p-6">
        <h2 className="text-lg font-bold text-foreground mb-6">All Users</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-muted-foreground font-semibold">Name</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-semibold">Email</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-semibold">Role</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-semibold">Join Date</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map((user) => (
                <tr key={user.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                  <td className="py-3 px-4 text-foreground font-medium">{user.name}</td>
                  <td className="py-3 px-4 text-muted-foreground">{user.email}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        user.role === 'super-user'
                          ? 'bg-accent/20 text-accent'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {user.role === 'super-user' ? 'Super User (PMF)' : 'Ordinary User'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">{user.joinDate}</td>
                  <td className="py-3 px-4">
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* AI Output Summary */}
      <Card className="p-6">
        <h2 className="text-lg font-bold text-foreground mb-4">AI System Summary (Read-Only)</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted/30 rounded-lg border border-border">
            <h3 className="font-semibold text-foreground mb-3">ChatBot Insights Generated</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full" />
                1,247 spending insights provided
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-accent rounded-full" />
                856 financial recommendations
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-secondary rounded-full" />
                342 roadmap optimizations
              </li>
            </ul>
          </div>

          <div className="p-4 bg-muted/30 rounded-lg border border-border">
            <h3 className="font-semibold text-foreground mb-3">System Performance</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center justify-between">
                <span>Avg Response Time</span>
                <span className="font-semibold text-foreground">230ms</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Model Accuracy</span>
                <span className="font-semibold text-foreground">94.2%</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Requests/Hour</span>
                <span className="font-semibold text-foreground">2,541</span>
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}

"use client"; // Required for Recharts

import { useEffect, useState } from "react";
import { getDashboardStats } from "@/actions/admin";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Users, BookOpen, Activity } from "lucide-react";

const COLORS = ['#6E0F24', '#D7263D', '#6B6B72', '#2F4E8C']; // Brand colors

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    getDashboardStats().then(setStats);
  }, []);

  if (!stats) return <div className="p-8">Loading dashboard...</div>;

  const pieData = stats.leadsByStatus.map((item: any) => ({
    name: item.status,
    value: item._count.status
  }));

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-display font-bold">Overview</h1>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-4 bg-cherry/10 rounded-full text-cherry"><Users size={24} /></div>
          <div>
            <p className="text-sm text-gray-500">Total Leads</p>
            <p className="text-2xl font-bold">{stats.totalLeads}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-4 bg-cta/10 rounded-full text-cta"><Activity size={24} /></div>
          <div>
            <p className="text-sm text-gray-500">New / Uncontacted</p>
            <p className="text-2xl font-bold">{stats.newLeads}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-4 bg-gray-100 rounded-full text-gray-600"><BookOpen size={24} /></div>
          <div>
            <p className="text-sm text-gray-500">Active Courses</p>
            <p className="text-2xl font-bold">{stats.totalCourses}</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold mb-6">Lead Status Distribution</h2>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                {pieData.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
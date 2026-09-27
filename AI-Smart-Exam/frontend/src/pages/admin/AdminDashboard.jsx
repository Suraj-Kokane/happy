import React from 'react';
import { Users, FileText, CheckSquare, BarChart2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const StatCard = ({ icon: Icon, title, value, color }) => (
  <div className="glass-card p-6 flex items-center space-x-4">
    <div className={`p-4 rounded-xl ${color}`}>
      <Icon size={24} className="text-white" />
    </div>
    <div>
      <p className="text-textSecondary text-sm font-medium">{title}</p>
      <h3 className="text-2xl font-bold text-white">{value}</h3>
    </div>
  </div>
);

const AdminDashboard = () => {
  const chartData = [
    { name: 'Python Exam', participants: 45, passed: 38 },
    { name: 'C++ Exam', participants: 30, passed: 20 },
    { name: 'Java Exam', participants: 55, passed: 48 },
  ];

  return (
    <div className="space-y-8 animate-[fadeIn_0.3s_ease-out]">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-textSecondary">Overview of system metrics and exams</p>
        </div>
        <button className="btn-primary">Create New Exam</button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={Users} title="Total Students" value="1,245" color="bg-blue-500/80 shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
        <StatCard icon={FileText} title="Total Exams" value="24" color="bg-purple-500/80 shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
        <StatCard icon={CheckSquare} title="Total Submissions" value="8,942" color="bg-accent/80 shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
        <StatCard icon={BarChart2} title="Avg Score" value="78%" color="bg-yellow-500/80 shadow-[0_0_15px_rgba(234,179,8,0.5)]" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-bold text-white mb-6">Recent Exam Performance</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" tick={{ fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#171f30', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                />
                <Bar dataKey="participants" fill="#6366f1" radius={[4, 4, 0, 0]} name="Total Participants" />
                <Bar dataKey="passed" fill="#10b981" radius={[4, 4, 0, 0]} name="Passed" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Submissions */}
        <div className="glass-card p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-white">Recent Submissions</h3>
            <button className="text-primary text-sm font-medium hover:text-white transition-colors">View All</button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-textSecondary">
              <thead className="text-xs uppercase bg-white/5 text-textSecondary">
                <tr>
                  <th className="px-4 py-3 rounded-l-lg">Student</th>
                  <th className="px-4 py-3">Exam</th>
                  <th className="px-4 py-3">Score</th>
                  <th className="px-4 py-3 rounded-r-lg">Status</th>
                </tr>
              </thead>
              <tbody>
                {[1,2,3,4,5].map((item) => (
                  <tr key={item} className="border-b border-border/50 hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3 font-medium text-white">Anand Bankar</td>
                    <td className="px-4 py-3">Python Practical</td>
                    <td className="px-4 py-3">8/10</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs font-semibold">Evaluated</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

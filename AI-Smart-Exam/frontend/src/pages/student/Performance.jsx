import React from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import { demoPerformanceData, demoStats } from '../../data/demoData';
import { TrendingUp, Award, Clock, CheckCircle } from 'lucide-react';

const StatCard = ({ icon: Icon, title, value, subtitle }) => (
  <div className="glass-card p-6 flex items-center space-x-4">
    <div className={`p-4 rounded-xl bg-white/5`}>
      <Icon size={24} className="text-primary" />
    </div>
    <div>
      <p className="text-textSecondary text-sm font-medium">{title}</p>
      <h3 className="text-2xl font-bold text-white">{value}</h3>
      {subtitle && <p className="text-xs text-textSecondary mt-1">{subtitle}</p>}
    </div>
  </div>
);

const Performance = () => {
  return (
    <div className="space-y-8 animate-[fadeIn_0.3s_ease-out]">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Performance Analytics</h1>
          <p className="text-textSecondary">Track your progress and coding accuracy</p>
        </div>
        <button className="btn-secondary">Download Report</button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={TrendingUp} title="Average Score" value={`${demoStats.averageScore}%`} subtitle="Top 15% in class" />
        <StatCard icon={Award} title="Highest Score" value="95%" subtitle="Data Structures Exam" />
        <StatCard icon={CheckCircle} title="Test Cases Passed" value="142" subtitle="88% success rate" />
        <StatCard icon={Clock} title="Avg Coding Time" value="18m" subtitle="-2m from average" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Score Progress Chart */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-bold text-white mb-6">Score Progression</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={demoPerformanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" tick={{ fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#171f30', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Accuracy Chart */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-bold text-white mb-6">Subject Accuracy</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { subject: 'Python', score: 85 },
                { subject: 'C++', score: 70 },
                { subject: 'Java', score: 90 },
                { subject: 'Algorithms', score: 75 }
              ]} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                <XAxis dataKey="subject" stroke="#94a3b8" tick={{ fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#171f30', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', cursor: 'default' }}
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                />
                <Bar dataKey="score" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Performance;

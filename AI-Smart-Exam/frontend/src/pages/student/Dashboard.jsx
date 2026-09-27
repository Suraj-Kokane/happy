import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { demoStats, demoExams } from '../../data/demoData';
import { Trophy, BookOpen, Clock, Target, ArrowRight, BarChart2 } from 'lucide-react';

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

const ExamCard = ({ exam, onStart }) => (
  <div className="glass-panel p-6 flex flex-col justify-between group hover:border-primary/50 transition-all">
    <div>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">{exam.title}</h3>
        <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-xs font-semibold border border-accent/20">
          {exam.status}
        </span>
      </div>
      <p className="text-textSecondary text-sm mb-4">{exam.subject}</p>
      
      <div className="grid grid-cols-2 gap-4 mb-6 text-sm text-textSecondary">
        <div className="flex items-center space-x-2">
          <Clock size={16} />
          <span>{exam.duration} Mins</span>
        </div>
        <div className="flex items-center space-x-2">
          <BookOpen size={16} />
          <span>{exam.questionsCount} Questions</span>
        </div>
        <div className="flex items-center space-x-2">
          <Target size={16} />
          <span>{exam.totalMarks} Marks</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-0.5 rounded text-xs ${exam.difficulty === 'Hard' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
            {exam.difficulty}
          </span>
        </div>
      </div>
    </div>
    
    <button onClick={() => onStart(exam.id)} className="w-full btn-primary flex items-center justify-center space-x-2">
      <span>Start Exam</span>
      <ArrowRight size={18} />
    </button>
  </div>
);

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="space-y-8 animate-[fadeIn_0.3s_ease-out]">
      {/* Header Profile Section */}
      <div className="glass-card p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px]"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {user?.name.split(' ')[0]} 👋</h1>
          <div className="text-textSecondary space-y-1">
            <p>Name: <span className="text-white">{user?.name}</span></p>
            <p>Student ID: <span className="text-white">{user?.student_id}</span></p>
            <p>Department: <span className="text-white">{user?.department}</span></p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={BookOpen} title="Total Exams" value={`0${demoStats.totalExams}`} color="bg-blue-500/80 shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
        <StatCard icon={Target} title="Completed" value={`0${demoStats.completed}`} color="bg-accent/80 shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
        <StatCard icon={BarChart2} title="Average Score" value={`${demoStats.averageScore}%`} color="bg-primary/80 shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
        <StatCard icon={Trophy} title="Rank" value={`0${demoStats.rank}`} color="bg-yellow-500/80 shadow-[0_0_15px_rgba(234,179,8,0.5)]" />
      </div>

      {/* Available Exams */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Available Exams</h2>
          <button className="text-primary hover:text-white transition-colors text-sm font-medium">View All</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {demoExams.map(exam => (
            <ExamCard key={exam.id} exam={exam} onStart={(id) => navigate(`/exam/${id}`)} />
          ))}
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="glass-card p-6 border-l-4 border-l-primary">
        <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
          <span className="text-primary">✨</span> AI Recommendations
        </h3>
        <p className="text-textSecondary">
          Based on your recent performance, we recommend focusing on <strong className="text-white">edge-case handling</strong> and <strong className="text-white">algorithm optimization</strong>. Try practicing more Data Structure problems.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;

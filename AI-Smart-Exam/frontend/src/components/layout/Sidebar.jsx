import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  FileText, 
  Code, 
  BarChart2, 
  User, 
  Settings, 
  LogOut,
  X
} from 'lucide-react';

const Sidebar = ({ onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const studentLinks = [
    { to: '/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { to: '#', icon: <FileText size={20} />, label: 'Available Exams' },
    { to: '#', icon: <Code size={20} />, label: 'Coding Practice' },
    { to: '#', icon: <FileText size={20} />, label: 'Results' },
    { to: '/performance', icon: <BarChart2 size={20} />, label: 'Performance' },
  ];

  const adminLinks = [
    { to: '/admin/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { to: '#', icon: <FileText size={20} />, label: 'Exam Management' },
    { to: '#', icon: <User size={20} />, label: 'Students' },
    { to: '#', icon: <Code size={20} />, label: 'Submissions' },
  ];

  const links = user?.role === 'admin' ? adminLinks : studentLinks;

  return (
    <div className="h-full flex flex-col bg-[#0f172a] border-r border-border shadow-2xl">
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-6 border-b border-border/50">
        <span className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary truncate">
          AI Smart Exam
        </span>
        <button onClick={onClose} className="lg:hidden text-textSecondary hover:text-white">
          <X size={24} />
        </button>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
        {links.map((link, idx) => (
          <NavLink
            key={idx}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? 'bg-primary/10 text-primary border border-primary/20'
                  : 'text-textSecondary hover:bg-white/5 hover:text-white'
              }`
            }
          >
            {link.icon}
            <span className="font-medium">{link.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-border/50 space-y-2">
        <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-textSecondary hover:bg-white/5 hover:text-white transition-all">
          <User size={20} />
          <span className="font-medium">Profile</span>
        </button>
        <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-textSecondary hover:bg-white/5 hover:text-white transition-all">
          <Settings size={20} />
          <span className="font-medium">Settings</span>
        </button>
        <button 
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

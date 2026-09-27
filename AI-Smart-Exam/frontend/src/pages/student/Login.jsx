import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LogIn, User, Lock } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      const success = login(username, password, role);
      if (success) {
        if (role === 'admin') navigate('/admin/dashboard');
        else navigate('/dashboard');
      } else {
        setError('Invalid credentials or role mismatch.');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background shapes */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 rounded-full blur-[100px]"></div>

      <div className="glass-card w-full max-w-md p-8 relative z-10 animate-[fadeIn_0.5s_ease-out]">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-tr from-primary to-secondary rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-lg shadow-primary/20">
            <LogIn size={32} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-textSecondary">Sign in to your account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="flex gap-4 p-1 bg-white/5 rounded-xl">
            <button
              type="button"
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${role === 'student' ? 'bg-primary text-white shadow-md' : 'text-textSecondary hover:text-white'}`}
              onClick={() => setRole('student')}
            >
              Student
            </button>
            <button
              type="button"
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${role === 'admin' ? 'bg-primary text-white shadow-md' : 'text-textSecondary hover:text-white'}`}
              onClick={() => setRole('admin')}
            >
              Admin
            </button>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl text-sm text-center">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-textSecondary" size={20} />
              <input
                type="text"
                placeholder={role === 'student' ? 'Student ID (STU001)' : 'Username (admin)'}
                className="input-field pl-12"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-textSecondary" size={20} />
              <input
                type="password"
                placeholder="Password"
                className="input-field pl-12"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn-primary py-3 text-lg flex items-center justify-center"
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              'Sign In'
            )}
          </button>
        </form>
        
        <div className="mt-6 text-center text-sm text-textSecondary">
          Demo: STU001 / 1234 (Student) | admin / admin123 (Admin)
        </div>
      </div>
    </div>
  );
};

export default Login;

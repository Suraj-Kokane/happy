import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './pages/student/Login';
import Dashboard from './pages/student/Dashboard';
import ExamDetails from './pages/student/ExamDetails';
import CodingExam from './pages/student/CodingExam';
import ResultPage from './pages/student/ResultPage';
import Performance from './pages/student/Performance';
import AdminDashboard from './pages/admin/AdminDashboard';
import AppLayout from './components/layout/AppLayout';

function PrivateRoute({ children, role }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to={user.role === 'admin' ? '/admin/dashboard' : '/dashboard'} />;
  return children;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        
        {/* Student Routes */}
        <Route path="/dashboard" element={
          <PrivateRoute role="student">
            <AppLayout><Dashboard /></AppLayout>
          </PrivateRoute>
        } />
        <Route path="/exam/:id" element={
          <PrivateRoute role="student">
            <AppLayout><ExamDetails /></AppLayout>
          </PrivateRoute>
        } />
        <Route path="/coding-exam/:id" element={
          <PrivateRoute role="student">
            <CodingExam />
          </PrivateRoute>
        } />
        <Route path="/result/:id" element={
          <PrivateRoute role="student">
            <AppLayout><ResultPage /></AppLayout>
          </PrivateRoute>
        } />
        <Route path="/performance" element={
          <PrivateRoute role="student">
            <AppLayout><Performance /></AppLayout>
          </PrivateRoute>
        } />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={
          <PrivateRoute role="admin">
            <AppLayout><AdminDashboard /></AppLayout>
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;

import React, { createContext, useContext, useState } from 'react';
import { demoUser } from '../data/demoData';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (username, password, role) => {
    // Demo authentication
    const cleanUsername = username.trim().toLowerCase();
    
    if (role === 'student' && cleanUsername === 'stu001' && password === '1234') {
      setUser(demoUser);
      return true;
    } else if (role === 'admin' && cleanUsername === 'admin' && password === 'admin123') {
      setUser({ id: 99, name: 'Admin User', role: 'admin' });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

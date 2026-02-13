import React, { createContext, useState, useContext, useEffect, useMemo, ReactNode } from 'react';
import { users, User } from '../data/users';
import { createSession, removeSession, getSessionUserData } from '../utils/authToken';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  userMunicipio: string | null;
  loading: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sessionData = getSessionUserData();
    if (sessionData) {
      const fullUser = users.find(u => u.username === sessionData.username);
      if (fullUser) {
        setUser(fullUser);
      } else {
        removeSession();
      }
    }
    setLoading(false);
  }, []);

  const login = (username: string, password: string): boolean => {
    const foundUser = users.find(
      u => u.username === username && u.password === password
    );
    if (!foundUser) return false;

    createSession(foundUser.username, foundUser.municipio);
    setUser(foundUser);
    return true;
  };

  const logout = () => {
    setUser(null);
    removeSession();
  };

  const value = useMemo(() => ({
    isAuthenticated: !!user,
    user,
    userMunicipio: user?.municipio ?? null,
    loading,
    login,
    logout,
  }), [user, loading]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

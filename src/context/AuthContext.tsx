import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { users, User } from '../data/users';
import { createSecureSession, removeSecureSession, isSessionValid, getSessionUserData } from '../utils/authToken';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  userRegion: number | null;
  userMunicipio: string | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [userRegion, setUserRegion] = useState<number | null>(null);
  const [userMunicipio, setUserMunicipio] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in using secure session
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Get session data with verification
        if (isSessionValid()) {
          const userData = getSessionUserData();
          
          if (userData) {
            // Find the full user from our users array using the username
            const fullUser = users.find(user => user.username === userData.username);
            
            if (fullUser) {
              setUser(fullUser);
              setIsAuthenticated(true);
              setUserRegion(userData.region.id);
              setUserMunicipio(userData.municipio);
            } else {
              // If user not found in our data (perhaps data changed), clear session
              removeSecureSession();
            }
          }
        }
      } catch (error) {
        console.error('Error checking authentication status:', error);
        // Clear potentially corrupted session
        removeSecureSession();
      } finally {
        // Set loading to false whether we found a user or not
        setLoading(false);
      }
    };
    
    checkAuthStatus();
  }, []);

  const login = (username: string, password: string): boolean => {
    const foundUser = users.find(
      user => user.username === username && user.password === password
    );

    if (foundUser) {
      // Create secure session with all user data
      createSecureSession(
        foundUser.username,
        foundUser.municipio,
        foundUser.region
      );
      
      // Update application state
      setUser(foundUser); // Keep the full user object in memory
      setIsAuthenticated(true);
      setUserRegion(foundUser.region.id);
      setUserMunicipio(foundUser.municipio);
      
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setUserRegion(null);
    setUserMunicipio(null);
    removeSecureSession();
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, userRegion, userMunicipio, loading }}>
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

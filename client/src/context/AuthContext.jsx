import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('gbf_token');
    const savedUser = localStorage.getItem('gbf_user');
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
      // Verify token is still valid
      authService.getMe()
        .then(({ data }) => setUser(data.user))
        .catch(() => logout())
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (credentials) => {
    const { data } = await authService.login(credentials);
    localStorage.setItem('gbf_token', data.token);
    localStorage.setItem('gbf_user', JSON.stringify(data.user));
    setUser(data.user);
    toast.success(`Welcome back, ${data.user.name}! 🎉`);
    return data;
  };

  const register = async (userData) => {
    const { data } = await authService.register(userData);
    localStorage.setItem('gbf_token', data.token);
    localStorage.setItem('gbf_user', JSON.stringify(data.user));
    setUser(data.user);
    toast.success(`Welcome to Gobefikara, ${data.user.name}! 🚀`);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('gbf_token');
    localStorage.removeItem('gbf_user');
    setUser(null);
    toast.success('Logged out successfully');
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('gbf_user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export default AuthContext;

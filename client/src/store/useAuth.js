import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import {
  login as loginThunk,
  register as registerThunk,
  logout as logoutAction,
  updateUser as updateUserAction,
} from './authSlice';

/**
 * Drop-in replacement for the old useAuth() from AuthContext.
 * Reads state directly from Redux — no Context wrapper needed.
 */
const useAuth = () => {
  const { user, loading } = useSelector((s) => s.auth);
  const dispatch = useDispatch();

  const login = async (credentials) => {
    const action = await dispatch(loginThunk(credentials));
    if (loginThunk.rejected.match(action)) {
      const msg = action.payload?.message || action.payload || 'Login failed';
      throw new Error(msg);
    }
    toast.success(`Welcome back, ${action.payload.name}! 🎉`);
    return action;
  };

  const register = async (userData) => {
    const action = await dispatch(registerThunk(userData));
    if (registerThunk.rejected.match(action)) {
      const msg = action.payload?.message || action.payload || 'Registration failed';
      throw new Error(msg);
    }
    toast.success(`Welcome to GoBefikara, ${action.payload.name}! 🚀`);
    return action;
  };

  const logout = () => {
    dispatch(logoutAction());
    toast.success('Logged out successfully');
  };

  const updateUser = (u) => dispatch(updateUserAction(u));

  return {
    user,
    loading,
    login,
    register,
    logout,
    updateUser,
    isAuthenticated: !!user,
  };
};

export default useAuth;

// Compatibility shim: original Context API replaced by Redux Toolkit.
// This file keeps the same `useAuth` and `AuthProvider` exports so existing
// imports in the codebase continue to work while the app uses Redux under the hood.
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import {
  login as loginThunk,
  register as registerThunk,
  getMe as getMeThunk,
  logout as logoutAction,
  updateUser as updateUserAction,
} from "../store/authSlice";

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    // On mount, try to refresh user from server if token exists
    dispatch(getMeThunk()).catch(() => {});
  }, [dispatch]);
  return children;
};

export const useAuth = () => {
  const { user, loading } = useSelector((s) => s.auth);
  const dispatch = useDispatch();

  const login = async (credentials) => {
    try {
      const action = await dispatch(loginThunk(credentials));
      const u = action.payload;
      toast.success(`Welcome back, ${u.name}! 🎉`);
      return action;
    } catch (err) {
      throw err;
    }
  };

  const register = async (userData) => {
    try {
      const action = await dispatch(registerThunk(userData));
      const u = action.payload;
      toast.success(`Welcome to Gobefikara, ${u.name}! 🚀`);
      return action;
    } catch (err) {
      throw err;
    }
  };

  const logout = () => {
    dispatch(logoutAction());
    toast.success("Logged out successfully");
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

export default null;

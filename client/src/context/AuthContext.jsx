// AuthContext has been removed. Import useAuth from '../store/useAuth' instead.
// This file is kept only to avoid broken imports during migration.
export { default as useAuth } from '../store/useAuth';
export const AuthProvider = ({ children }) => children;
export default null;

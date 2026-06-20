import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import useAuth from '../../store/useAuth';
import toast from 'react-hot-toast';

const LoginForm = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form);
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass" style={{ padding: '2.5rem', maxWidth: '440px', width: '100%', margin: '0 auto' }}>

      <h2 style={{ fontFamily: 'Outfit', fontSize: '1.75rem', fontWeight: 800, color: '#fff', marginBottom: '0.4rem' }}>Welcome Back 👋</h2>

      <p style={{ color: '#9CA3AF', fontSize: '0.9rem', marginBottom: '2rem' }}>Sign in to continue your adventure</p>

      <form onSubmit={handleSubmit}>

        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{ display: 'block', color: '#CBD5E1', fontSize: '0.85rem', fontWeight: 500, marginBottom: '0.5rem' }}>Email</label>
          <input id="login-email" type="email" name="email" placeholder="you@example.com" required className="input-field" value={form.email} onChange={handleChange} />
        </div>


        <div style={{ marginBottom: '1.75rem' }}>
          <label style={{ display: 'block', color: '#CBD5E1', fontSize: '0.85rem', fontWeight: 500, marginBottom: '0.5rem' }}>Password</label>
          <input id="login-password" type="password" name="password" placeholder="••••••••" required className="input-field" value={form.password} onChange={handleChange} />
        </div>


        <button id="login-submit" type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', padding: '0.9rem' }}>
          {loading ? '⏳ Signing in...' : '🚀 Sign In'}
        </button>
      </form>

      <p style={{ textAlign: 'center', color: '#6B7280', fontSize: '0.875rem', marginTop: '1.5rem' }}>
        Don't have an account?{' '}
        <Link to="/register" style={{ color: '#FF6B35', fontWeight: 600, textDecoration: 'none' }}>
          Join GoBefikara
        </Link>
      </p>
    </motion.div>
  );
};

export default LoginForm;

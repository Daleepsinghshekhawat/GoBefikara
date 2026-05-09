import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const RegisterForm = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', city: '' });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) { toast.error('Password must be at least 6 characters'); return; }
    setLoading(true);
    try {
      await register(form);
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: 'name', label: 'Full Name', type: 'text', placeholder: 'Arjun Sharma', id: 'reg-name' },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com', id: 'reg-email' },
    { name: 'password', label: 'Password', type: 'password', placeholder: '••••••••', id: 'reg-password' },
    { name: 'phone', label: 'Phone (optional)', type: 'tel', placeholder: '+91 98765 43210', id: 'reg-phone', required: false },
    { name: 'city', label: 'City (optional)', type: 'text', placeholder: 'Delhi', id: 'reg-city', required: false },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass" style={{ padding: '2.5rem', maxWidth: '480px', width: '100%', margin: '0 auto' }}>
      <h2 style={{ fontFamily: 'Outfit', fontSize: '1.75rem', fontWeight: 800, color: '#fff', marginBottom: '0.4rem' }}>Start Your Journey 🚀</h2>
      <p style={{ color: '#9CA3AF', fontSize: '0.9rem', marginBottom: '2rem' }}>Create your GoBefikara account for free</p>

      <form onSubmit={handleSubmit}>
        {fields.map((field) => (
          <div key={field.name} style={{ marginBottom: '1.1rem' }}>
            <label style={{ display: 'block', color: '#CBD5E1', fontSize: '0.85rem', fontWeight: 500, marginBottom: '0.4rem' }}>{field.label}</label>
            <input
              id={field.id}
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              required={field.required !== false}
              className="input-field"
              value={form[field.name]}
              onChange={handleChange}
            />
          </div>
        ))}
        <button id="register-submit" type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', padding: '0.9rem', marginTop: '0.5rem' }}>
          {loading ? '⏳ Creating account...' : '✨ Create Account'}
        </button>
      </form>

      <p style={{ textAlign: 'center', color: '#6B7280', fontSize: '0.875rem', marginTop: '1.5rem' }}>
        Already a traveler?{' '}
        <Link to="/login" style={{ color: '#FF6B35', fontWeight: 600, textDecoration: 'none' }}>Sign In</Link>
      </p>
    </motion.div>
  );
};

export default RegisterForm;

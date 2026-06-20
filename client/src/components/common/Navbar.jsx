import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useAuth from '../../store/useAuth';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Trips', href: '/trips' },
  { label: 'Shiv Yatra', href: '/shiv-yatra', special: true },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? 'rgba(15,19,55,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : 'none',
        transition: 'all 0.3s ease',
        padding: '1rem 0',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '10px',
            background: 'linear-gradient(135deg, #FF6B35, #F4C542)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '18px', fontWeight: '900',
          }}>🏔</div>
          <span style={{ fontFamily: 'Outfit', fontSize: '1.5rem', fontWeight: 800, color: '#fff', lineHeight: 1 }}>
            Go<span style={{ color: '#FF6B35' }}>Befikara</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }} className="desktop-nav">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="btn-ghost"
              style={{
                color: pathname === link.href ? '#FF6B35' : '#E5E7EB',
                fontWeight: link.special ? 700 : 500,
                ...(link.special && {
                  background: 'rgba(255,107,53,0.1)',
                  border: '1px solid rgba(255,107,53,0.2)',
                  borderRadius: '9999px',
                  padding: '0.4rem 1rem',
                  fontSize: '0.85rem',
                }),
              }}
            >
              {link.special && '🕉️ '}{link.label}
            </Link>
          ))}
        </div>

        {/* Auth Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="btn-ghost" style={{ color: '#E5E7EB' }}>
                <div style={{
                  width: '32px', height: '32px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, #FF6B35, #F4C542)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '14px', fontWeight: 700, color: '#0F1337',
                }}>
                  {user?.name?.[0]?.toUpperCase()}
                </div>
                {user?.name?.split(' ')[0]}
              </Link>
              <button className="btn-outline" onClick={logout} style={{ padding: '0.4rem 1.2rem', fontSize: '0.85rem' }}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-ghost" style={{ color: '#E5E7EB' }}>Login</Link>
              <Link to="/register" className="btn-primary" style={{ padding: '0.55rem 1.4rem', fontSize: '0.875rem' }}>
                Join Free
              </Link>
            </>
          )}

          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '0.25rem', display: 'none' }}
            id="hamburger-btn"
            aria-label="Toggle menu"
          >
            <div style={{ width: '22px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
              {[0, 1, 2].map((i) => (
                <span key={i} style={{ display: 'block', height: '2px', background: '#FF6B35', borderRadius: '2px', transition: 'all 0.3s', width: i === 1 ? '75%' : '100%' }} />
              ))}
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ background: 'rgba(15,19,55,0.98)', borderTop: '1px solid rgba(255,255,255,0.08)', padding: '1rem 0' }}
          >
            <div className="container">
              {navLinks.map((link) => (
                <Link key={link.href} to={link.href} style={{
                  display: 'block', padding: '0.75rem 0', color: '#E5E7EB',
                  textDecoration: 'none', fontFamily: 'Inter', borderBottom: '1px solid rgba(255,255,255,0.06)',
                  transition: 'color 0.2s',
                }}>
                  {link.special && '🕉️ '}{link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          #hamburger-btn { display: flex !important; }
        }
      `}</style>
    </motion.nav>
  );
};

export default Navbar;

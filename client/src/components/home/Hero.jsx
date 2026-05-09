import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
  const stats = [
    { value: '5000+', label: 'Happy Travelers' },
    { value: '150+', label: 'Trips Available' },
    { value: '20+', label: 'Destinations' },
    { value: '4.9★', label: 'Average Rating' },
  ];

  return (
    <section style={{ minHeight: '100vh', position: 'relative', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
      {/* Animated Background */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(135deg, #0F1337 0%, #1A1F4B 35%, #2D1B69 65%, #1A1F4B 100%)',
      }} />

      {/* Floating Orbs */}
      {[
        { size: 400, top: '-10%', left: '-10%', color: 'rgba(255,107,53,0.12)' },
        { size: 350, bottom: '-15%', right: '-5%', color: 'rgba(139,92,246,0.1)' },
        { size: 200, top: '30%', right: '30%', color: 'rgba(244,197,66,0.08)' },
      ].map((orb, i) => (
        <div key={i} style={{
          position: 'absolute', width: orb.size, height: orb.size, borderRadius: '50%',
          background: `radial-gradient(circle, ${orb.color}, transparent)`,
          top: orb.top, left: orb.left, bottom: orb.bottom, right: orb.right,
          filter: 'blur(60px)', pointerEvents: 'none',
        }} />
      ))}

      {/* Himalaya silhouette */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '40%', opacity: 0.06,
        background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='white' d='M0,250L80,230L160,200L240,170L320,200L400,150L480,100L560,130L640,80L720,60L800,90L880,110L960,150L1040,120L1120,160L1200,200L1280,220L1360,240L1440,250L1440,320L0,320Z'/%3E%3C/svg%3E") center/cover`,
        backgroundRepeat: 'no-repeat',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: '6rem', paddingBottom: '4rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ maxWidth: '800px' }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            style={{ display: 'inline-flex', marginBottom: '1.5rem' }}
          >
            <span className="badge badge-saffron" style={{ fontSize: '0.8rem', padding: '0.4rem 1.2rem' }}>
              🕉️ Jai Bholenath — The Journey Awaits
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            style={{ fontFamily: 'Outfit', fontSize: 'clamp(3rem, 7vw, 5.5rem)', fontWeight: 900, lineHeight: 1.05, marginBottom: '1.5rem', color: '#fff' }}
          >
            Travel{' '}
            <span className="text-gradient">Fearlessly</span>,<br />
            Discover{' '}
            <span style={{ color: '#F4C542' }}>Endlessly</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            style={{ fontSize: '1.2rem', color: '#CBD5E1', lineHeight: 1.8, maxWidth: '580px', marginBottom: '2.5rem' }}
          >
            Trek sacred peaks, join group adventures, walk ancient pilgrim paths — from the Himalayas to Rameshwaram. Your next epic story starts here.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '4rem' }}
          >
            <Link to="/trips" className="btn-primary" style={{ fontSize: '1rem', padding: '0.9rem 2.5rem' }}>
              🏔️ Explore Trips
            </Link>
            <Link to="/shiv-yatra" className="btn-outline" style={{ fontSize: '1rem', padding: '0.9rem 2.5rem' }}>
              🕉️ Shiv Yatra
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + i * 0.1 }}
              >
                <div style={{ fontFamily: 'Outfit', fontSize: '1.8rem', fontWeight: 800, color: '#FF6B35' }}>{stat.value}</div>
                <div style={{ fontSize: '0.8rem', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <span style={{ color: '#9CA3AF', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Scroll</span>
          <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, #FF6B35, transparent)' }} />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

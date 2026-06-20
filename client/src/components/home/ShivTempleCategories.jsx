import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

/* ─── Data ──────────────────────────────────────────────────────────────── */
const SHIV_CATEGORIES = [
  {
    id: 'panch-kedar',
    icon: '🏔️',
    title: 'Panch Kedar',
    subtitle: 'Five Sacred Himalayan Shrines',
    gradient: 'linear-gradient(145deg, #0d2b1a 0%, #0a4a2a 50%, #1a6b3a 100%)',
    glowColor: '#22c55e',
    altitude: '3,600 – 3,900 m',
    season: 'May – Nov',
    difficulty: 'Moderate–Hard',
    diffColor: '#F4C542',
    temples: [
      { name: 'Kedarnath', trek: '16 km', alt: '3,583 m', icon: '🕉️' },
      { name: 'Tungnath', trek: '4 km', alt: '3,680 m', icon: '🕉️' },
      { name: 'Rudranath', trek: '20 km', alt: '3,600 m', icon: '🕉️' },
      { name: 'Madhyamaheshwar', trek: '16 km', alt: '3,497 m', icon: '🕉️' },
      { name: 'Kalpeshwar', trek: '2 km', alt: '2,134 m', icon: '🕉️' },
    ],
    desc: 'The divine circuit of five Himalayan Shiva shrines. Each temple is nestled in breathtaking alpine meadows, dense forests, and snow-capped peaks.',
    tag: '5 Temples · 1 Circuit · ∞ Blessings',
    coverImg: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800',
  },
  {
    id: 'kailash-peaks',
    icon: '❄️',
    title: 'Kailash Sacred Peaks',
    subtitle: 'Extreme Himalayan Shivlings',
    gradient: 'linear-gradient(145deg, #0a1a2e 0%, #0d2d4a 50%, #1a4a6b 100%)',
    glowColor: '#60a5fa',
    altitude: '4,500 – 6,500 m',
    season: 'Jun – Sep',
    difficulty: 'Extreme',
    diffColor: '#EF4444',
    temples: [
      { name: 'Kinner Kailash', trek: '18–24 km', alt: '6,050 m', icon: '⛰️' },
      { name: 'Adi Kailash', trek: '35 km', alt: '6,191 m', icon: '⛰️' },
      { name: 'Manimahesh Kailash', trek: '14 km', alt: '5,650 m', icon: '⛰️' },
      { name: 'Shrikhand Mahadev', trek: '32 km', alt: '5,155 m', icon: '⛰️' },
    ],
    desc: 'Sacred rock Shivlings and celestial peaks that test both body and spirit. These extreme treks are for the devoted adventurer seeking divine heights.',
    tag: 'Sacred Shivlings · Extreme Altitude · Rare Darshan',
    coverImg: 'https://images.unsplash.com/photo-1580311381924-1b8c75c5ab33?w=800',
  },
  {
    id: 'jyotirlinga',
    icon: '🔱',
    title: '12 Jyotirlingas',
    subtitle: 'The Twelve Sacred Flames of Shiva',
    gradient: 'linear-gradient(145deg, #2d1b00 0%, #5a3300 50%, #8b5e00 100%)',
    glowColor: '#f59e0b',
    altitude: 'Plains – 3,500 m',
    season: 'Year Round',
    difficulty: 'Easy–Moderate',
    diffColor: '#10B981',
    temples: [
      { name: 'Somnath', trek: 'Walkable', alt: 'Sea Level', icon: '🕉️' },
      { name: 'Mahakaleshwar', trek: 'Walkable', alt: '494 m', icon: '🕉️' },
      { name: 'Omkareshwar', trek: 'Walkable', alt: '264 m', icon: '🕉️' },
      { name: 'Kashi Vishwanath', trek: 'Walkable', alt: '76 m', icon: '🕉️' },
      { name: 'Kedarnath', trek: '16 km', alt: '3,583 m', icon: '🕉️' },
      { name: 'Trimbakeshwar', trek: 'Walkable', alt: '780 m', icon: '🕉️' },
    ],
    desc: 'India\'s most sacred pilgrimage circuit — 12 divine light manifestations of Shiva scattered across the subcontinent, from coastal Gujarat to Himalayan heights.',
    tag: '12 Lingas · All India Circuit · Supreme Darshan',
    coverImg: 'https://images.unsplash.com/photo-1597040663342-45b6af3d91a5?w=800',
  },
  {
    id: 'forest-hidden',
    icon: '🌿',
    title: 'Hidden Forest Temples',
    subtitle: 'Ancient & Mystical Shiva Shrines',
    gradient: 'linear-gradient(145deg, #0d1f0a 0%, #1a3a10 50%, #2a5a1a 100%)',
    glowColor: '#84cc16',
    altitude: '1,200 – 2,600 m',
    season: 'Mar – Dec',
    difficulty: 'Easy',
    diffColor: '#10B981',
    temples: [
      { name: 'Jageshwar', trek: '2 km', alt: '1,870 m', icon: '🌲' },
      { name: 'Triyuginarayan', trek: '5 km', alt: '1,980 m', icon: '🌲' },
      { name: 'Neelkanth Mahadev', trek: '3 km', alt: '1,675 m', icon: '🌲' },
      { name: 'Kalpeshwar', trek: '2 km', alt: '2,134 m', icon: '🌲' },
    ],
    desc: 'Serene Shiva temples tucked inside cedar forests, jungle meadows and river gorges. Perfect for solo seekers craving peace, mythology and ancient stone architecture.',
    tag: 'Ancient Temples · Cedar Forests · Mystical Vibes',
    coverImg: 'https://images.unsplash.com/photo-1609766418204-94aae0ecfdfc?w=800',
  },
  {
    id: 'amarnath-spiritual',
    icon: '❄️',
    title: 'Amarnath & Ice Shivling',
    subtitle: 'Once-in-a-Lifetime Himalayan Yatra',
    gradient: 'linear-gradient(145deg, #0f0f2e 0%, #1a1a4a 50%, #25256b 100%)',
    glowColor: '#a78bfa',
    altitude: '3,888 m',
    season: 'Jul – Aug',
    difficulty: 'Challenging',
    diffColor: '#FF6B35',
    temples: [
      { name: 'Amarnath Cave', trek: '36–48 km', alt: '3,888 m', icon: '🧊' },
      { name: 'Pahalgam Route', trek: '48 km', alt: '3,888 m', icon: '🧊' },
      { name: 'Baltal Route', trek: '36 km', alt: '3,888 m', icon: '🧊' },
    ],
    desc: 'The legendary ice Shivling cave — home to the eternal flame of Lord Shiva. A seasonal pilgrimage of immense spiritual power through Kashmir\'s most dramatic landscapes.',
    tag: 'Natural Ice Shivling · Seasonal · Epic Scale',
    coverImg: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=800',
  },
  {
    id: 'solo-bhakt',
    icon: '🧭',
    title: 'Solo Shiv Bhakt Trails',
    subtitle: 'Best Spiritual Solo Journeys',
    gradient: 'linear-gradient(145deg, #1a0a2e 0%, #2d1050 50%, #3d1a6e 100%)',
    glowColor: '#c084fc',
    altitude: '500 – 4,000 m',
    season: 'Apr – Nov',
    difficulty: 'Mixed',
    diffColor: '#F4C542',
    temples: [
      { name: 'Tungnath + Chandrashila', trek: '4–8 km', alt: '4,090 m', icon: '🧭' },
      { name: 'Jageshwar Complex', trek: '2 km', alt: '1,870 m', icon: '🧭' },
      { name: 'Triyuginarayan', trek: '5 km', alt: '1,980 m', icon: '🧭' },
      { name: 'Rudranath Temple', trek: '20 km', alt: '3,600 m', icon: '🧭' },
      { name: 'Guptkashi Trails', trek: 'Varies', alt: '1,319 m', icon: '🧭' },
    ],
    desc: 'Curated solo routes combining safe trekking, Shiva temples, hidden spots and deep peace. Ideal for the lone spiritual adventurer seeking transformation.',
    tag: 'Safe Solo · Shiv Energy · Inner Journey',
    coverImg: 'https://images.unsplash.com/photo-1604252607372-7a3beb7fc54a?w=800',
  },
];

/* ─── Difficulty Badge ──────────────────────────────────────────────────── */
const DiffBadge = ({ label, color }) => (
  <span style={{
    padding: '0.2rem 0.7rem', borderRadius: '9999px', fontSize: '0.7rem',
    fontWeight: 700, fontFamily: 'Outfit', letterSpacing: '0.04em',
    background: `${color}22`, color, border: `1px solid ${color}44`,
  }}>
    {label}
  </span>
);

/* ─── Category Card ─────────────────────────────────────────────────────── */
const CategoryCard = ({ cat, index, isActive, onClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.09, duration: 0.5 }}
    whileHover={{ y: -10, scale: 1.02 }}
    onClick={onClick}
    style={{ cursor: 'pointer' }}
  >
    <div style={{
      borderRadius: '1.5rem',
      overflow: 'hidden',
      border: `1px solid ${isActive ? cat.glowColor : 'rgba(255,255,255,0.08)'}`,
      boxShadow: isActive ? `0 0 30px ${cat.glowColor}33, 0 20px 60px rgba(0,0,0,0.5)` : '0 8px 40px rgba(0,0,0,0.4)',
      transition: 'all 0.35s ease',
      background: cat.gradient,
      position: 'relative',
    }}>
      {/* Cover image */}
      <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
        <img
          src={cat.coverImg}
          alt={cat.title}
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            filter: 'brightness(0.45) saturate(1.3)',
            transition: 'transform 0.5s ease',
          }}
          className="shiv-cat-img"
        />
        {/* Gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(to bottom, transparent 30%, ${cat.gradient.split(' ')[3]} 100%)`,
        }} />
        {/* Top badges */}
        <div style={{ position: 'absolute', top: '0.85rem', left: '0.85rem', display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          <span style={{
            padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.7rem',
            fontWeight: 700, fontFamily: 'Outfit', background: 'rgba(0,0,0,0.6)',
            color: cat.glowColor, border: `1px solid ${cat.glowColor}55`, backdropFilter: 'blur(4px)',
          }}>
            {cat.icon} {cat.id === 'panch-kedar' ? 'Panch Kedar' : cat.id === 'kailash-peaks' ? 'Sacred Peaks' : cat.id === 'jyotirlinga' ? 'Jyotirlinga' : cat.id === 'forest-hidden' ? 'Hidden' : cat.id === 'amarnath-spiritual' ? 'Seasonal' : 'Solo'}
          </span>
          <DiffBadge label={cat.difficulty} color={cat.diffColor} />
        </div>
        {/* Icon */}
        <div style={{
          position: 'absolute', bottom: '0.75rem', right: '1rem',
          fontSize: '2.5rem', opacity: 0.9,
          filter: `drop-shadow(0 0 12px ${cat.glowColor})`,
        }}>
          {cat.icon}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '1.25rem 1.25rem 1.5rem' }}>
        <p style={{ color: cat.glowColor, fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.3rem', fontFamily: 'Outfit' }}>
          {cat.subtitle}
        </p>
        <h3 style={{ fontFamily: 'Outfit', fontSize: '1.3rem', fontWeight: 800, color: '#fff', marginBottom: '0.6rem', lineHeight: 1.2 }}>
          {cat.title}
        </h3>
        <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.8rem', lineHeight: 1.6, marginBottom: '1rem' }}>
          {cat.desc}
        </p>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          {[
            { label: 'Altitude', val: cat.altitude },
            { label: 'Season', val: cat.season },
          ].map(s => (
            <div key={s.label}>
              <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>{s.label}</div>
              <div style={{ color: '#fff', fontSize: '0.8rem', fontWeight: 700, fontFamily: 'Outfit' }}>{s.val}</div>
            </div>
          ))}
        </div>

        {/* Temple pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem' }}>
          {cat.temples.slice(0, 4).map(t => (
            <span key={t.name} style={{
              padding: '0.2rem 0.6rem', borderRadius: '0.5rem', fontSize: '0.68rem',
              background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.75)',
              border: '1px solid rgba(255,255,255,0.1)', fontFamily: 'Outfit', fontWeight: 600,
            }}>
              {t.icon} {t.name}
            </span>
          ))}
          {cat.temples.length > 4 && (
            <span style={{
              padding: '0.2rem 0.6rem', borderRadius: '0.5rem', fontSize: '0.68rem',
              background: `${cat.glowColor}15`, color: cat.glowColor,
              border: `1px solid ${cat.glowColor}30`, fontFamily: 'Outfit', fontWeight: 700,
            }}>
              +{cat.temples.length - 4} more
            </span>
          )}
        </div>

        {/* Tag + CTA */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '0.68rem', color: cat.glowColor, fontWeight: 600, fontFamily: 'Outfit' }}>
            ✦ {cat.tag}
          </span>
          <Link
            to={`/trips?type=${cat.id === 'solo-bhakt' ? 'solo' : cat.id === 'jyotirlinga' ? 'spiritual' : 'trekking'}`}
            onClick={e => e.stopPropagation()}
            style={{
              padding: '0.35rem 1rem', borderRadius: '9999px', fontSize: '0.75rem',
              fontWeight: 700, fontFamily: 'Outfit', textDecoration: 'none',
              background: `${cat.glowColor}20`, color: cat.glowColor,
              border: `1px solid ${cat.glowColor}50`, transition: 'all 0.2s',
            }}
          >
            Explore →
          </Link>
        </div>
      </div>
    </div>
  </motion.div>
);

/* ─── Temple Detail Panel ───────────────────────────────────────────────── */
const TemplePanel = ({ cat }) => (
  <motion.div
    key={cat.id}
    initial={{ opacity: 0, height: 0 }}
    animate={{ opacity: 1, height: 'auto' }}
    exit={{ opacity: 0, height: 0 }}
    transition={{ duration: 0.4 }}
    style={{
      borderRadius: '1.5rem', overflow: 'hidden',
      border: `1px solid ${cat.glowColor}44`,
      background: cat.gradient,
      boxShadow: `0 0 40px ${cat.glowColor}22`,
      marginTop: '1.5rem',
    }}
  >
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <span style={{ fontSize: '2rem' }}>{cat.icon}</span>
        <div>
          <h3 style={{ fontFamily: 'Outfit', fontSize: '1.4rem', fontWeight: 800, color: '#fff', margin: 0 }}>{cat.title}</h3>
          <p style={{ color: cat.glowColor, fontSize: '0.8rem', margin: 0, fontWeight: 600 }}>{cat.subtitle}</p>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.75rem' }}>
        {cat.temples.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.07 }}
            style={{
              background: 'rgba(255,255,255,0.05)', borderRadius: '1rem',
              padding: '0.9rem 1rem', border: `1px solid ${cat.glowColor}25`,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}
          >
            <div>
              <div style={{ fontFamily: 'Outfit', fontWeight: 700, color: '#fff', fontSize: '0.88rem' }}>
                {t.icon} {t.name}
              </div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.72rem', marginTop: '0.2rem' }}>
                Alt: {t.alt}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ color: cat.glowColor, fontSize: '0.75rem', fontWeight: 700 }}>{t.trek}</div>
              <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.65rem' }}>trek</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>
);

/* ─── Main Component ────────────────────────────────────────────────────── */
const ShivTempleCategories = () => {
  const [activeId, setActiveId] = useState(null);
  const activeCat = SHIV_CATEGORIES.find(c => c.id === activeId);

  return (
    <section style={{ background: '#080b20', padding: '5rem 0', position: 'relative', overflow: 'hidden' }}>
      {/* Background glow blobs */}
      <div style={{
        position: 'absolute', top: '-100px', left: '10%',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(34,197,94,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-100px', right: '5%',
        width: '600px', height: '600px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(168,85,247,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative' }}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            style={{ display: 'inline-block', fontSize: '3rem', marginBottom: '1rem' }}
          >
            🔱
          </motion.div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.4rem 1.2rem', borderRadius: '9999px', marginBottom: '1rem',
            background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)',
            color: '#f59e0b', fontSize: '0.8rem', fontWeight: 700, fontFamily: 'Outfit', letterSpacing: '0.08em',
          }}>
            ✦ SHIV TEMPLE CIRCUITS ✦
          </div>
          <h2 style={{
            fontFamily: 'Outfit', fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            fontWeight: 900, color: '#fff', lineHeight: 1.15, marginBottom: '1rem',
          }}>
            Sacred Journeys to{' '}
            <span style={{ background: 'linear-gradient(90deg, #22c55e, #86efac)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Shiva's Abodes
            </span>
          </h2>
          <p style={{ color: '#9CA3AF', maxWidth: '560px', margin: '0 auto', lineHeight: 1.7, fontSize: '0.95rem' }}>
            From lush Himalayan meadows at 12,000 ft to ancient cedar forests — choose your divine path to Lord Shiva.
          </p>
        </motion.div>

        {/* Quick filter tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ display: 'flex', gap: '0.6rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3rem' }}
        >
          {[
            { label: '🏔️ All Trekking', color: '#22c55e' },
            { label: '🔱 Jyotirlinga', color: '#f59e0b' },
            { label: '🧭 Solo Trails', color: '#c084fc' },
            { label: '❄️ Seasonal', color: '#60a5fa' },
            { label: '🌿 Hidden Gems', color: '#84cc16' },
          ].map(tab => (
            <Link
              key={tab.label}
              to="/trips"
              style={{
                padding: '0.45rem 1.1rem', borderRadius: '9999px', textDecoration: 'none',
                fontSize: '0.8rem', fontWeight: 700, fontFamily: 'Outfit',
                background: `${tab.color}12`, color: tab.color,
                border: `1px solid ${tab.color}35`, transition: 'all 0.2s',
              }}
            >
              {tab.label}
            </Link>
          ))}
        </motion.div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
          {SHIV_CATEGORIES.map((cat, i) => (
            <CategoryCard
              key={cat.id}
              cat={cat}
              index={i}
              isActive={activeId === cat.id}
              onClick={() => setActiveId(prev => prev === cat.id ? null : cat.id)}
            />
          ))}
        </div>

        {/* Expandable Detail Panel */}
        <AnimatePresence>
          {activeCat && <TemplePanel cat={activeCat} />}
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginTop: '3.5rem' }}
        >
          <p style={{ color: '#6B7280', fontSize: '0.875rem', marginBottom: '1.25rem' }}>
            🕉️ &nbsp;Har Har Mahadev — Begin Your Sacred Journey Today
          </p>
          <Link
            to="/trips"
            style={{
              display: 'inline-block', padding: '0.85rem 2.5rem', borderRadius: '9999px',
              fontFamily: 'Outfit', fontSize: '1rem', fontWeight: 700, textDecoration: 'none',
              background: 'linear-gradient(135deg, #22c55e, #16a34a)',
              color: '#fff', boxShadow: '0 8px 30px rgba(34,197,94,0.3)',
              transition: 'all 0.3s',
            }}
          >
            View All Shiv Treks →
          </Link>
        </motion.div>
      </div>

      <style>{`
        .shiv-cat-img:hover { transform: scale(1.05); }
      `}</style>
    </section>
  );
};

export default ShivTempleCategories;

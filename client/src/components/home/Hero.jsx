import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

/* ── Sacred destinations shown on the right panel ── */
const SACRED_LIST = [
  { icon: '🛕', name: 'KEDARNATH',       sub: 'The Abode of Lord Shiva' },
  { icon: '⛰️', name: 'TUNGNATH',        sub: 'The Highest Shiva Temple' },
  { icon: '🕌', name: 'KASHI VISHWANATH',sub: 'The Eternal Light' },
  { icon: '🛕', name: 'BAIDYANATH',      sub: 'The Healer of Souls' },
  { icon: '✨', name: '& Many More',      sub: 'Sacred Destinations' },
];

/* ── Bottom stats bar ── */
const STATS = [
  { icon: '👤', value: '5000+', label: 'Happy Yatris' },
  { icon: '🏔️', value: '150+',  label: 'Trips Available' },
  { icon: '🛕', value: '20+',   label: 'Sacred Destinations' },
  { icon: '⭐', value: '4.9★',  label: 'Average Rating' },
];

const Hero = () => (
  <section style={{
    minHeight: '100vh',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  }}>

    {/* ── Full-bleed background image ── */}
    <div style={{
      position: 'absolute', inset: 0,
      backgroundImage: `url('https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=1600&auto=format&fit=crop&q=80')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center top',
      filter: 'brightness(0.65)',
      zIndex: 0,
    }} />

    {/* ── Dark gradient overlay (left-heavy so text pops) ── */}
    <div style={{
      position: 'absolute', inset: 0, zIndex: 1,
      background: 'linear-gradient(105deg, rgba(8,8,20,0.78) 0%, rgba(8,8,20,0.55) 45%, rgba(8,8,20,0.15) 75%, rgba(8,8,20,0.05) 100%)',
    }} />

    {/* ── Warm amber glow bottom-left ── */}
    <div style={{
      position: 'absolute', bottom: '10%', left: '-5%',
      width: 500, height: 500, borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(255,107,53,0.18) 0%, transparent 70%)',
      filter: 'blur(60px)', zIndex: 1, pointerEvents: 'none',
    }} />

    {/* ────────────────── MAIN CONTENT ────────────────── */}
    <div style={{
      position: 'relative', zIndex: 2,
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      padding: '0',
    }}>
      <div style={{
        width: '100%', maxWidth: 1280,
        margin: '0 auto',
        padding: '7rem 2rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '2rem',
      }}>

        {/* ── LEFT: Text & CTAs ── */}
        <div style={{ flex: '0 0 auto', maxWidth: 520 }}>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ marginBottom: '1.6rem' }}
          >
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.45rem 1.25rem',
              border: '1px solid rgba(255,107,53,0.5)',
              borderRadius: 9999,
              fontSize: '0.75rem', fontFamily: 'Outfit', fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.08em',
              color: '#FF8C5C',
              background: 'rgba(255,107,53,0.1)',
            }}>
              🕉️ Shiv Yatra — The Divine Journey
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.75 }}
            style={{
              fontFamily: 'Outfit',
              fontSize: 'clamp(2.8rem, 5.5vw, 5rem)',
              fontWeight: 900,
              lineHeight: 1.08,
              color: '#fff',
              marginBottom: '1.5rem',
            }}
          >
            Walk the Path of{' '}<br />
            <span style={{
              background: 'linear-gradient(135deg, #FF6B35, #FF8C5C)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Shiva.</span>{' '}Find Your<br />
            <span style={{
              background: 'linear-gradient(135deg, #F4C542, #FFD97A)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>True</span>{' '}Self.
          </motion.h1>

          {/* Sub-text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            style={{
              fontSize: '1rem',
              color: 'rgba(255,255,255,0.72)',
              lineHeight: 1.75,
              marginBottom: '2.5rem',
              maxWidth: 420,
            }}
          >
            Explore the most sacred Shiv temples across the Himalayas.
            Ancient energy. Eternal peace. Your spiritual awakening begins here.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}
          >
            {/* Primary – solid saffron */}
            <Link to="/shiv-yatra" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.85rem 2rem',
              background: 'linear-gradient(135deg, #FF6B35, #F4C542)',
              color: '#0F1337',
              fontFamily: 'Outfit', fontWeight: 800, fontSize: '0.85rem',
              textTransform: 'uppercase', letterSpacing: '0.06em',
              borderRadius: 9999, textDecoration: 'none',
              transition: 'all 0.3s',
              boxShadow: '0 6px 24px rgba(255,107,53,0.4)',
            }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              🛕 Explore Shiv Yatra
            </Link>
          </motion.div>
        </div>

        {/* ── RIGHT: Sacred Destinations panel ── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.75 }}
          style={{
            flex: '0 0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 0,
            position: 'relative',
          }}
        >
          {SACRED_LIST.map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem', position: 'relative' }}>
              {/* Vertical timeline line + dot */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                {/* Dot */}
                <div style={{
                  width: 34, height: 34, borderRadius: '50%',
                  background: 'rgba(20,16,40,0.7)',
                  border: '1px solid rgba(255,255,255,0.18)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1rem',
                  backdropFilter: 'blur(6px)',
                  flexShrink: 0,
                  zIndex: 1,
                }}>
                  {item.icon}
                </div>
                {/* connector line */}
                {i < SACRED_LIST.length - 1 && (
                  <div style={{
                    width: 1,
                    height: 38,
                    background: 'linear-gradient(to bottom, rgba(255,140,92,0.5), rgba(255,140,92,0.15))',
                  }} />
                )}
              </div>

              {/* Text */}
              <div style={{ paddingTop: '0.45rem', paddingBottom: i < SACRED_LIST.length - 1 ? '0.5rem' : 0 }}>
                <div style={{
                  fontFamily: 'Outfit', fontWeight: 700, fontSize: '0.8rem',
                  color: '#fff', letterSpacing: '0.07em', textTransform: 'uppercase',
                }}>
                  {item.name}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)', marginTop: '0.15rem' }}>
                  {item.sub}
                </div>
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </div>

    {/* ────────────────── STATS BAR ────────────────── */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.85, duration: 0.6 }}
      style={{
        position: 'relative', zIndex: 2,
        background: 'rgba(10,8,25,0.82)',
        backdropFilter: 'blur(16px)',
        borderTop: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        padding: '1.4rem 2rem',
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        gap: '1.5rem',
      }}>
        {STATS.map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
            <span style={{ fontSize: '1.6rem', opacity: 0.85 }}>{s.icon}</span>
            <div>
              <div style={{
                fontFamily: 'Outfit', fontWeight: 800,
                fontSize: '1.5rem', color: '#fff', lineHeight: 1,
              }}>{s.value}</div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', marginTop: '0.2rem' }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>

  </section>
);

export default Hero;

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const stats = [
  { value: 5000, suffix: '+', label: 'Happy Travelers', icon: '😊', color: '#FF6B35' },
  { value: 150, suffix: '+', label: 'Trips Available', icon: '🗺️', color: '#F4C542' },
  { value: 11, suffix: '', label: 'Shiv Yatras', icon: '🕉️', color: '#8B5CF6' },
  { value: 4.9, suffix: '★', label: 'Average Rating', icon: '⭐', color: '#10B981' },
];

const testimonials = [
  { name: 'Arjun Sharma', city: 'Delhi', trip: 'Kedarnath Trek', avatar: '👨‍🦱', text: 'Absolutely life-changing! The Kedarnath trek with GoBefikara was flawlessly organised. The team was supportive throughout. 10/10 would recommend!', rating: 5 },
  { name: 'Priya Patel', city: 'Ahmedabad', trip: '11 Shiv Yatra', avatar: '👩', text: 'The Shiv Yatra package covered all 12 jyotirlingas beautifully. Spiritual, serene, and incredibly well-managed. Truly a divine experience.', rating: 5 },
  { name: 'Rahul Verma', city: 'Mumbai', trip: 'Spiti Valley Group', avatar: '👨', text: 'Met the most amazing people on the Spiti Valley group trip. GoBefikara creates real connections between travelers. Already booked my next trip!', rating: 5 },
];

const CounterNumber = ({ value, suffix, color }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) { setCount(value); clearInterval(timer); }
      else setCount(Number.isInteger(value) ? Math.floor(current) : parseFloat(current.toFixed(1)));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span ref={ref} style={{ fontFamily: 'Outfit', fontSize: '2.8rem', fontWeight: 900, color }}>
      {count}{suffix}
    </span>
  );
};

const StatsAndTestimonials = () => {
  return (
    <>
      {/* Stats */}
      <section className="section-sm" style={{ background: '#080B25' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '2rem' }}>
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{ textAlign: 'center', padding: '2rem 1rem' }}
                className="glass"
              >
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{stat.icon}</div>
                <CounterNumber value={stat.value} suffix={stat.suffix} color={stat.color} />
                <div style={{ color: '#9CA3AF', fontSize: '0.85rem', marginTop: '0.3rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section" style={{ background: '#0F1337' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '3rem' }}
          >
            <span className="badge badge-emerald" style={{ marginBottom: '1rem' }}>Testimonials</span>
            <h2 style={{ fontFamily: 'Outfit', fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', fontWeight: 800, color: '#fff' }}>
              Travelers <span className="text-gradient">Love Us</span>
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="glass"
                style={{ padding: '1.75rem', position: 'relative', overflow: 'hidden' }}
              >
                <div style={{ position: 'absolute', top: '1rem', right: '1.25rem', fontSize: '3rem', opacity: 0.08, fontFamily: 'Georgia', lineHeight: 1 }}>"</div>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                  {[1,2,3,4,5].map(s => <span key={s} style={{ color: '#F4C542', fontSize: '14px' }}>★</span>)}
                </div>
                <p style={{ color: '#CBD5E1', fontSize: '0.9rem', lineHeight: 1.75, marginBottom: '1.25rem', fontStyle: 'italic' }}>"{t.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1rem' }}>
                  <div style={{ fontSize: '2rem' }}>{t.avatar}</div>
                  <div>
                    <div style={{ fontFamily: 'Outfit', fontWeight: 700, color: '#F9FAFB', fontSize: '0.95rem' }}>{t.name}</div>
                    <div style={{ color: '#6B7280', fontSize: '0.78rem' }}>{t.city} · {t.trip}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default StatsAndTestimonials;

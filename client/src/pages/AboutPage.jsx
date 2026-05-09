import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const AboutPage = () => (
  <div style={{ minHeight: '100vh', background: '#0F1337', paddingTop: '4.5rem' }}>
    {/* Hero */}
    <div style={{ background: 'linear-gradient(135deg, #080B25, #1A1F4B)', padding: '4rem 0 3rem', textAlign: 'center' }}>
      <div className="container">
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏔</div>
        <h1 style={{ fontFamily: 'Outfit', fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, color: '#fff', marginBottom: '0.75rem' }}>
          About <span className="text-gradient">GoBefikara</span>
        </h1>
        <p style={{ color: '#9CA3AF', maxWidth: '600px', margin: '0 auto', lineHeight: 1.8, fontSize: '1.05rem' }}>
          Born in the mountains, built for wanderers. We are a community-first travel platform that believes every Indian deserves to explore their incredible country — fearlessly.
        </p>
      </div>
    </div>

    <div className="container section">
      {/* Mission */}
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass" style={{ padding: '2.5rem', marginBottom: '2rem', maxWidth: '800px', margin: '0 auto 2rem' }}>
        <h2 style={{ fontFamily: 'Outfit', fontSize: '1.75rem', fontWeight: 800, color: '#fff', marginBottom: '1rem' }}>Our Mission</h2>
        <p style={{ color: '#CBD5E1', lineHeight: 1.85 }}>
          GoBefikara ("Go Worry-Free") was founded with a simple idea: travel should be accessible, safe, and deeply meaningful. We specialise in trekking expeditions, solo travel, group adventures, and India's ancient spiritual yatras — especially the sacred 11 Shiv Yatra covering all jyotirlingas.
        </p>
      </motion.div>

      {/* Values */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        {[
          { icon: '🛡️', title: 'Safety First', desc: 'All trips are planned with certified guides, first-aid kits, and emergency protocols.' },
          { icon: '🌍', title: 'Sustainable Travel', desc: 'We follow Leave No Trace principles and support local communities.' },
          { icon: '🤝', title: 'Community', desc: 'We connect strangers and turn them into lifelong friends through shared adventures.' },
          { icon: '💰', title: 'Value for Money', desc: 'Premium experiences at honest prices — no hidden costs, ever.' },
        ].map((v, i) => (
          <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            className="glass" style={{ padding: '2rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{v.icon}</div>
            <h3 style={{ fontFamily: 'Outfit', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>{v.title}</h3>
            <p style={{ color: '#9CA3AF', fontSize: '0.875rem', lineHeight: 1.6 }}>{v.desc}</p>
          </motion.div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link to="/trips" className="btn-primary" style={{ fontSize: '1rem', padding: '0.9rem 2.5rem' }}>🏔️ Start Exploring</Link>
      </div>
    </div>
  </div>
);

export default AboutPage;

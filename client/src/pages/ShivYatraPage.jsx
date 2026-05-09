import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SHIV_YATRAS } from '../constants';

const ShivYatraPage = () => {
  return (
    <div style={{ minHeight: '100vh', background: '#0F1337', paddingTop: '4.5rem' }}>
      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #1A0A00 0%, #3D1A00 40%, #7c2d12 70%, #1A0A00 100%)',
        padding: '5rem 0 4rem', position: 'relative', overflow: 'hidden',
      }}>
        {[{ size: 500, top: '-20%', left: '-15%', color: 'rgba(255,107,53,0.15)' }, { size: 350, bottom: '-20%', right: '-10%', color: 'rgba(244,197,66,0.1)' }].map((orb, i) => (
          <div key={i} style={{ position: 'absolute', width: orb.size, height: orb.size, borderRadius: '50%', background: `radial-gradient(circle, ${orb.color}, transparent)`, filter: 'blur(80px)', top: orb.top, left: orb.left, bottom: orb.bottom, right: orb.right, pointerEvents: 'none' }} />
        ))}
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🕉️</div>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            style={{ fontFamily: 'Outfit', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 900, color: '#fff', marginBottom: '0.75rem', lineHeight: 1.1 }}>
            11 <span className="text-gradient">Shiv Yatra</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            style={{ color: '#FCD9B6', fontSize: 'clamp(1rem, 2vw, 1.25rem)', maxWidth: '600px', margin: '0 auto 2rem', lineHeight: 1.7 }}>
            Embark on the sacred pilgrimage to all 12 Jyotirlingas — the divine abodes of Lord Shiva scattered across the subcontinent. A journey of faith, devotion, and transformation.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/trips?type=spiritual" className="btn-primary" style={{ fontSize: '1rem', padding: '0.9rem 2.5rem' }}>
              🙏 Book Package — ₹38,999
            </Link>
            <Link to="/contact" className="btn-outline" style={{ fontSize: '1rem', padding: '0.9rem 2.5rem' }}>
              📞 Enquire Now
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Package Highlights */}
      <section style={{ background: '#080B25', padding: '3rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
            {[
              { icon: '📅', title: '21 Days / 20 Nights', desc: 'Complete pilgrimage package' },
              { icon: '🚌', title: 'AC Transport', desc: 'Comfortable travel throughout' },
              { icon: '🏨', title: 'Premium Stays', desc: '3-star accommodation' },
              { icon: '🍱', title: 'All Meals', desc: 'Sattvic vegetarian food' },
              { icon: '👨‍💼', title: 'Expert Guide', desc: 'Knowledgeable pilgrim guide' },
              { icon: '🙏', title: 'Puja Assistance', desc: 'Special darshan arrangements' },
            ].map((item) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="glass" style={{ padding: '1.5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{item.icon}</div>
                <div style={{ fontFamily: 'Outfit', fontWeight: 700, color: '#fff', marginBottom: '0.3rem' }}>{item.title}</div>
                <div style={{ color: '#9CA3AF', fontSize: '0.82rem' }}>{item.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 11 Jyotirlingas */}
      <section className="section" style={{ background: '#0F1337' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontFamily: 'Outfit', fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', fontWeight: 800, color: '#fff' }}>
              The 11 Sacred <span className="text-gradient">Jyotirlingas</span>
            </h2>
            <p style={{ color: '#9CA3AF', marginTop: '0.75rem' }}>Each a unique divine experience — from the Himalayas to the southern tip of India</p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {SHIV_YATRAS.map((yatra, i) => (
              <motion.div key={yatra.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                style={{
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '1.25rem', overflow: 'hidden', transition: 'all 0.3s',
                }}
                whileHover={{ y: -4, borderColor: 'rgba(255,107,53,0.3)', boxShadow: '0 15px 40px rgba(255,107,53,0.1)' }}
              >
                <div style={{ position: 'relative' }}>
                  <img src={yatra.img} alt={yatra.name} style={{ width: '100%', height: '180px', objectFit: 'cover', filter: 'brightness(0.75)' }}
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent, rgba(15,19,55,0.8))' }} />
                  <div style={{
                    position: 'absolute', top: '1rem', left: '1rem', width: '36px', height: '36px',
                    background: 'linear-gradient(135deg, #FF6B35, #F4C542)', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'Outfit', fontWeight: 900, color: '#0F1337', fontSize: '0.95rem',
                  }}>{yatra.id}</div>
                  <div style={{ position: 'absolute', bottom: '0.75rem', left: '1rem' }}>
                    <span className="badge badge-saffron" style={{ fontSize: '0.7rem' }}>📍 {yatra.state}</span>
                  </div>
                </div>
                <div style={{ padding: '1.25rem' }}>
                  <h3 style={{ fontFamily: 'Outfit', fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '0.25rem' }}>{yatra.name}</h3>
                  <div style={{ color: '#FF8C5C', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.5rem' }}>🕉️ {yatra.temple}</div>
                  <p style={{ color: '#9CA3AF', fontSize: '0.85rem', lineHeight: 1.6 }}>{yatra.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#080B25', padding: '4rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Outfit', fontSize: '2.5rem', fontWeight: 800, color: '#fff', marginBottom: '1rem' }}>
            Begin Your <span className="text-gradient">Spiritual Journey</span>
          </h2>
          <p style={{ color: '#9CA3AF', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
            Join thousands of devotees who have completed the 11 Shiv Yatra with GoBefikara. Next batch starts soon!
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/register" className="btn-primary" style={{ padding: '0.9rem 2.5rem' }}>🙏 Book Your Spot</Link>
            <Link to="/contact" className="btn-outline" style={{ padding: '0.9rem 2.5rem' }}>📞 Talk to Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShivYatraPage;

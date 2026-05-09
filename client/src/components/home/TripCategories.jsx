import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TRIP_TYPES } from '../../constants';

const categoryBgs = {
  trekking: 'linear-gradient(135deg, #064e3b, #10b981)',
  solo: 'linear-gradient(135deg, #1e3a5f, #3b82f6)',
  group: 'linear-gradient(135deg, #3b0764, #8b5cf6)',
  friends: 'linear-gradient(135deg, #78350f, #f59e0b)',
  spiritual: 'linear-gradient(135deg, #7c2d12, #ff6b35)',
};

const categoryStats = {
  trekking: '45+ Trails',
  solo: '30+ Routes',
  group: '25+ Adventures',
  friends: '20+ Packages',
  spiritual: '11 Holy Yatras',
};

const TripCategories = () => {
  return (
    <section className="section" style={{ background: '#0a0d2a' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <span className="badge badge-saffron" style={{ marginBottom: '1rem' }}>Categories</span>
          <h2 style={{ fontFamily: 'Outfit', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#fff', marginBottom: '0.75rem' }}>
            Every Kind of <span className="text-gradient">Adventure</span>
          </h2>
          <p style={{ color: '#9CA3AF', maxWidth: '500px', margin: '0 auto' }}>
            From soul-searching solos to high-energy group treks — find your perfect travel style.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
          {TRIP_TYPES.map((type, i) => (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <Link to={`/trips?type=${type.id}`} style={{ textDecoration: 'none' }}>
                <div style={{
                  background: categoryBgs[type.id],
                  borderRadius: '1.25rem', padding: '2rem 1.5rem',
                  border: '1px solid rgba(255,255,255,0.1)',
                  transition: 'box-shadow 0.3s',
                  position: 'relative', overflow: 'hidden',
                }}>
                  <div style={{
                    position: 'absolute', top: '-20px', right: '-20px',
                    width: '100px', height: '100px', borderRadius: '50%',
                    background: 'rgba(255,255,255,0.08)',
                  }} />
                  <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{type.icon}</div>
                  <h3 style={{ fontFamily: 'Outfit', fontSize: '1.2rem', fontWeight: 700, color: '#fff', marginBottom: '0.4rem' }}>{type.label}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.82rem', marginBottom: '0.75rem', lineHeight: 1.5 }}>{type.description}</p>
                  <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {categoryStats[type.id]}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TripCategories;

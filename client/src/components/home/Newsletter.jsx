import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      toast.success('🎉 Subscribed! Get ready for amazing trip deals!');
      setEmail('');
      setLoading(false);
    }, 1000);
  };

  return (
    <section style={{
      padding: '5rem 0',
      background: 'linear-gradient(135deg, #1a1f4b 0%, #2d1b69 50%, #1a1f4b 100%)',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: '-50%', left: '-20%', width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,107,53,0.12), transparent)',
        filter: 'blur(60px)',
      }} />
      <div style={{
        position: 'absolute', bottom: '-30%', right: '-10%', width: '400px', height: '400px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(139,92,246,0.1), transparent)',
        filter: 'blur(60px)',
      }} />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}
        >
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✉️</div>
          <h2 style={{ fontFamily: 'Outfit', fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 800, color: '#fff', marginBottom: '0.75rem' }}>
            Never Miss an <span className="text-gradient">Adventure</span>
          </h2>
          <p style={{ color: '#CBD5E1', marginBottom: '2rem', lineHeight: 1.7 }}>
            Get exclusive trip alerts, early-bird discounts, and travel tips delivered straight to your inbox. Join 10,000+ explorers!
          </p>
          <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <input
              type="email"
              id="newsletter-email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              style={{ maxWidth: '360px', flex: '1 1 260px' }}
              required
            />
            <button type="submit" className="btn-primary" disabled={loading} style={{ whiteSpace: 'nowrap' }}>
              {loading ? '⏳ Subscribing...' : '🚀 Subscribe Free'}
            </button>
          </form>
          <p style={{ color: '#6B7280', fontSize: '0.78rem', marginTop: '1rem' }}>
            No spam, ever. Unsubscribe anytime. 🔒
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;

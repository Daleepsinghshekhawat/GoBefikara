import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success('Message sent! We\'ll get back to you within 24 hours. 🙏');
      setForm({ name: '', email: '', subject: '', message: '' });
      setLoading(false);
    }, 1200);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0F1337', paddingTop: '4.5rem' }}>
      <div style={{ background: 'linear-gradient(135deg, #080B25, #1A1F4B)', padding: '3.5rem 0 2.5rem', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ fontFamily: 'Outfit', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, color: '#fff', marginBottom: '0.5rem' }}>
            Get In <span className="text-gradient">Touch</span>
          </h1>
          <p style={{ color: '#9CA3AF' }}>Have a question or want to plan a custom trip? We'd love to hear from you.</p>
        </div>
      </div>

      <div className="container section">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem', maxWidth: '960px', margin: '0 auto', alignItems: 'start' }}>
          {/* Info */}
          <div>
            <h2 style={{ fontFamily: 'Outfit', fontSize: '1.5rem', fontWeight: 700, color: '#fff', marginBottom: '1.5rem' }}>Contact Info</h2>
            {[
              ['📍', 'Address', 'GoBefikara Travel LLP\nJaipur, Rajasthan 302001, India'],
              ['📞', 'Phone', '+91 7023674512\n(Mon-Sat, 9am–7pm IST)'],
              ['✉️', 'Email', 'hello@gobefikara.in'],
              ['🕉️', 'Shiv Yatra Enquiries', 'yatra@gobefikara.in'],
            ].map(([icon, label, value]) => (
              <motion.div key={label} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                className="glass" style={{ padding: '1.25rem', marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
                <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>{icon}</span>
                <div>
                  <div style={{ color: '#FF6B35', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>{label}</div>
                  <div style={{ color: '#CBD5E1', fontSize: '0.875rem', whiteSpace: 'pre-line', lineHeight: 1.6 }}>{value}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass" style={{ padding: '2rem' }}>
            <h2 style={{ fontFamily: 'Outfit', fontSize: '1.35rem', fontWeight: 700, color: '#fff', marginBottom: '1.5rem' }}>Send a Message</h2>
            <form onSubmit={handleSubmit}>
              {[
                { name: 'name', label: 'Your Name', type: 'text', placeholder: 'Arjun Sharma', id: 'contact-name' },
                { name: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com', id: 'contact-email' },
                { name: 'subject', label: 'Subject', type: 'text', placeholder: 'Trip enquiry', id: 'contact-subject' },
              ].map(field => (
                <div key={field.name} style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', color: '#CBD5E1', fontSize: '0.82rem', fontWeight: 500, marginBottom: '0.4rem' }}>{field.label}</label>
                  <input id={field.id} type={field.type} name={field.name} placeholder={field.placeholder} required className="input-field"
                    value={form[field.name]} onChange={(e) => setForm({ ...form, [field.name]: e.target.value })} />
                </div>
              ))}
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', color: '#CBD5E1', fontSize: '0.82rem', fontWeight: 500, marginBottom: '0.4rem' }}>Message</label>
                <textarea id="contact-message" name="message" placeholder="Tell us about your dream trip..." required className="input-field" rows={4} style={{ resize: 'vertical' }}
                  value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
              </div>
              <button id="contact-submit" type="submit" className="btn-primary" disabled={loading} style={{ width: '100%' }}>
                {loading ? '⏳ Sending...' : '📨 Send Message'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      <style>{`@media(max-width:768px){.contact-grid{grid-template-columns:1fr!important}}`}</style>
    </div>
  );
};

export default ContactPage;

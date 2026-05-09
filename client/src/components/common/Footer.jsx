import { Link } from 'react-router-dom';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: '#080B25', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '4rem' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2.5rem', paddingBottom: '3rem' }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #FF6B35, #F4C542)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>🏔</div>
              <span style={{ fontFamily: 'Outfit', fontSize: '1.4rem', fontWeight: 800, color: '#fff' }}>
                Go<span style={{ color: '#FF6B35' }}>Befikara</span>
              </span>
            </div>
            <p style={{ color: '#9CA3AF', fontSize: '0.9rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              Travel fearlessly. Discover India's most sacred peaks, trails, and destinations with trusted companions.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {['📘', '📸', '🐦', '▶️'].map((icon, i) => (
                <a key={i} href="#" style={{
                  width: '38px', height: '38px', borderRadius: '50%',
                  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '16px', transition: 'all 0.2s',
                  textDecoration: 'none',
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,107,53,0.15)'; e.currentTarget.style.borderColor = '#FF6B35'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontFamily: 'Outfit', fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Explore</h4>
            {[['Trekking Trips', '/trips?type=trekking'], ['Group Adventures', '/trips?type=group'], ['Solo Journeys', '/trips?type=solo'], ['Friends Trips', '/trips?type=friends'], ['Shiv Yatra', '/shiv-yatra']].map(([label, href]) => (
              <Link key={href} to={href} style={{ display: 'block', color: '#9CA3AF', textDecoration: 'none', marginBottom: '0.6rem', fontSize: '0.9rem', transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#FF6B35'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#9CA3AF'}
              >
                → {label}
              </Link>
            ))}
          </div>

          {/* Company */}
          <div>
            <h4 style={{ fontFamily: 'Outfit', fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Company</h4>
            {[['About Us', '/about'], ['Contact', '/contact'], ['Privacy Policy', '#'], ['Terms & Conditions', '#'], ['Cancellation Policy', '#']].map(([label, href]) => (
              <Link key={label} to={href} style={{ display: 'block', color: '#9CA3AF', textDecoration: 'none', marginBottom: '0.6rem', fontSize: '0.9rem', transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#FF6B35'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#9CA3AF'}
              >
                → {label}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: 'Outfit', fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Get In Touch</h4>
            {[
              ['📍', 'Jaipur, Rajasthan 302001'],
              ['📞', '+91 7023674512'],
              ['✉️', 'hello@gobefikara.in'],
              ['⏰', 'Mon–Sat: 9am – 7pm IST'],
            ].map(([icon, text]) => (
              <div key={text} style={{ display: 'flex', gap: '0.6rem', marginBottom: '0.75rem', color: '#9CA3AF', fontSize: '0.875rem' }}>
                <span>{icon}</span><span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '1.5rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <p style={{ color: '#6B7280', fontSize: '0.85rem' }}>
            © {year} GoBefikara. Made with ❤️ for fearless travelers.
          </p>
          <p style={{ color: '#6B7280', fontSize: '0.85rem' }}>
            <span style={{ color: '#FF6B35' }}>🕉️</span> Jai Bholenath
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

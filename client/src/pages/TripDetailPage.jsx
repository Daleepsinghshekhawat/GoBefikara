import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const MOCK_TRIPS = {
  '1': { _id: '1', title: 'Kedarnath Trek', type: 'trekking', difficulty: 'challenging', destination: 'Kedarnath, Uttarakhand', duration: { days: 6, nights: 5 }, price: 12500, discountedPrice: 9999, coverImage: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1200', ratingsAverage: 4.9, ratingsCount: 128, availableSeats: 8, altitude: '3583m', startLocation: 'Haridwar', endLocation: 'Haridwar', maxGroupSize: 12, description: 'One of the most sacred treks in India, the Kedarnath Trek takes you to the ancient Kedarnath temple situated at 3,583m. This challenging yet deeply spiritual journey through the Garhwal Himalayas is both physically rewarding and spiritually enriching.', highlights: ['Visit the ancient Kedarnath Temple', 'Trek through stunning Himalayan landscapes', 'Cross the Chorabari Glacier', 'Experience Garhwali culture', 'Sunrise views over snow peaks'], inclusions: ['Accommodation in guest houses', 'All meals (breakfast & dinner)', 'Certified trek guide', 'Safety equipment', 'Medical kit', 'Transport from Haridwar'], exclusions: ['Flights/trains to Haridwar', 'Personal expenses', 'Travel insurance', 'Pony charges'], itinerary: [{ day: 1, title: 'Haridwar to Gaurikund', description: 'Drive from Haridwar to Gaurikund (210 km, ~8–9 hrs). Rest and acclimatize.', accommodation: 'Guest House at Gaurikund', meals: ['Dinner'] }, { day: 2, title: 'Gaurikund to Kedarnath', description: 'Trek 14 km to Kedarnath Temple. Evening darshan at the sacred temple.', accommodation: 'Guest House at Kedarnath', meals: ['Breakfast', 'Dinner'], distance: '14 km', altitude: '3583m' }] },
};

const difficultyColors = { easy: '#10B981', moderate: '#F4C542', challenging: '#FF6B35', extreme: '#EF4444' };

const TripDetailPage = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const trip = MOCK_TRIPS[id] || MOCK_TRIPS['1'];

  const handleBook = () => {
    if (!isAuthenticated) {
      toast.error('Please login to book a trip');
      navigate('/login');
      return;
    }
    navigate(`/book/${trip._id}`);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0F1337', paddingTop: '4.5rem' }}>
      {/* Hero Image */}
      <div style={{ position: 'relative', height: '500px', overflow: 'hidden' }}>
        <img src={trip.coverImage} alt={trip.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(15,19,55,0.3), rgba(15,19,55,0.9))' }} />
        <div className="container" style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', width: '100%' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
              <span className="badge badge-saffron">🏔️ {trip.type}</span>
              <span style={{ padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700, background: `${difficultyColors[trip.difficulty]}22`, color: difficultyColors[trip.difficulty], border: `1px solid ${difficultyColors[trip.difficulty]}55` }}>{trip.difficulty}</span>
            </div>
            <h1 style={{ fontFamily: 'Outfit', fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 900, color: '#fff', marginBottom: '0.5rem' }}>{trip.title}</h1>
            <div style={{ display: 'flex', gap: '1.5rem', color: '#CBD5E1', fontSize: '0.9rem', flexWrap: 'wrap' }}>
              <span>📍 {trip.destination}</span>
              <span>⏱ {trip.duration.days}D/{trip.duration.nights}N</span>
              <span>👥 Max {trip.maxGroupSize} people</span>
              <span>🏔 {trip.altitude}</span>
              <span>★ {trip.ratingsAverage} ({trip.ratingsCount} reviews)</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '2rem', alignItems: 'start' }}>
          {/* Left */}
          <div>
            <div className="glass" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
              <h2 style={{ fontFamily: 'Outfit', fontSize: '1.4rem', fontWeight: 700, color: '#fff', marginBottom: '1rem' }}>About This Trip</h2>
              <p style={{ color: '#CBD5E1', lineHeight: 1.8 }}>{trip.description}</p>
            </div>

            <div className="glass" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
              <h2 style={{ fontFamily: 'Outfit', fontSize: '1.4rem', fontWeight: 700, color: '#fff', marginBottom: '1rem' }}>✨ Highlights</h2>
              <ul style={{ listStyle: 'none' }}>
                {trip.highlights.map((h, i) => (
                  <li key={i} style={{ display: 'flex', gap: '0.75rem', color: '#CBD5E1', marginBottom: '0.6rem', fontSize: '0.9rem' }}>
                    <span style={{ color: '#10B981', flexShrink: 0 }}>✓</span>{h}
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
              <h2 style={{ fontFamily: 'Outfit', fontSize: '1.4rem', fontWeight: 700, color: '#fff', marginBottom: '1.25rem' }}>🗓 Itinerary</h2>
              {trip.itinerary.map((day) => (
                <div key={day.day} style={{ marginBottom: '1.25rem', paddingLeft: '1rem', borderLeft: '2px solid #FF6B35' }}>
                  <div style={{ fontFamily: 'Outfit', fontWeight: 700, color: '#FF6B35', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.25rem' }}>Day {day.day}</div>
                  <div style={{ fontFamily: 'Outfit', fontWeight: 700, color: '#fff', marginBottom: '0.4rem' }}>{day.title}</div>
                  <p style={{ color: '#9CA3AF', fontSize: '0.875rem', lineHeight: 1.7 }}>{day.description}</p>
                  {day.distance && <span style={{ color: '#6B7280', fontSize: '0.78rem' }}>📏 {day.distance} · 🏔 {day.altitude}</span>}
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              {[['✅ Inclusions', trip.inclusions, '#10B981'], ['❌ Exclusions', trip.exclusions, '#EF4444']].map(([title, items, color]) => (
                <div key={title} className="glass" style={{ padding: '1.5rem' }}>
                  <h3 style={{ fontFamily: 'Outfit', fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '0.75rem' }}>{title}</h3>
                  {items.map((item, i) => (
                    <div key={i} style={{ color: '#CBD5E1', fontSize: '0.85rem', marginBottom: '0.4rem', display: 'flex', gap: '0.5rem' }}>
                      <span style={{ color, flexShrink: 0 }}>{color === '#10B981' ? '✓' : '✗'}</span>{item}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Booking Sidebar */}
          <div style={{ position: 'sticky', top: '6rem' }}>
            <div className="glass" style={{ padding: '2rem', borderRadius: '1.25rem' }}>
              <div style={{ marginBottom: '1.25rem' }}>
                {trip.discountedPrice && <div style={{ color: '#6B7280', textDecoration: 'line-through', fontSize: '1rem' }}>₹{trip.price.toLocaleString()}</div>}
                <div style={{ fontFamily: 'Outfit', fontSize: '2.5rem', fontWeight: 900, color: '#FF6B35', lineHeight: 1 }}>
                  ₹{(trip.discountedPrice || trip.price).toLocaleString()}
                </div>
                <div style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>per person</div>
              </div>

              {trip.discountedPrice && (
                <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '0.5rem', padding: '0.5rem 0.75rem', marginBottom: '1rem', color: '#34D399', fontSize: '0.85rem', fontWeight: 600 }}>
                  🎉 Save ₹{(trip.price - trip.discountedPrice).toLocaleString()} on this trip!
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem' }}>
                {[['⏱ Duration', `${trip.duration.days} Days / ${trip.duration.nights} Nights`], ['🪑 Seats Left', `${trip.availableSeats} available`], ['🚀 Start', trip.startLocation], ['🏁 End', trip.endLocation]].map(([label, value]) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', color: '#CBD5E1', fontSize: '0.875rem', padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <span style={{ color: '#9CA3AF' }}>{label}</span>
                    <span style={{ fontWeight: 600 }}>{value}</span>
                  </div>
                ))}
              </div>

              <button id="book-now-btn" className="btn-primary" onClick={handleBook} style={{ width: '100%', padding: '1rem', fontSize: '1rem', marginBottom: '0.75rem' }}>
                🎒 Book This Trip
              </button>
              <p style={{ textAlign: 'center', color: '#6B7280', fontSize: '0.78rem' }}>🔒 Safe & Secure. Free cancellation within 48 hours.</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`@media(max-width:768px){.trip-detail-grid{grid-template-columns:1fr!important}}`}</style>
    </div>
  );
};

export default TripDetailPage;

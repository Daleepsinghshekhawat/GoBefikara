import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TRIP_TYPES } from '../../constants';

const MOCK_TRIPS = [
  { _id: '1', title: 'Kedarnath Trek', type: 'trekking', difficulty: 'challenging', destination: 'Uttarakhand', duration: { days: 6, nights: 5 }, price: 12500, discountedPrice: 9999, coverImage: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600', ratingsAverage: 4.9, ratingsCount: 128, availableSeats: 8 },
  { _id: '2', title: 'Spiti Valley Expedition', type: 'group', difficulty: 'moderate', destination: 'Himachal Pradesh', duration: { days: 8, nights: 7 }, price: 18000, coverImage: 'https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?w=600', ratingsAverage: 4.8, ratingsCount: 94, availableSeats: 4 },
  { _id: '3', title: 'Solo Rishikesh Retreat', type: 'solo', difficulty: 'easy', destination: 'Uttarakhand', duration: { days: 4, nights: 3 }, price: 7500, discountedPrice: 5999, coverImage: 'https://images.unsplash.com/photo-1590173988978-f1e5a3b5c9c1?w=600', ratingsAverage: 4.7, ratingsCount: 76, availableSeats: 12 },
  { _id: '4', title: '11 Shiv Yatra Package', type: 'spiritual', difficulty: 'moderate', destination: 'Pan India', duration: { days: 21, nights: 20 }, price: 45000, discountedPrice: 38999, coverImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600', ratingsAverage: 5.0, ratingsCount: 64, availableSeats: 6 },
  { _id: '5', title: 'Goa Friends Bonanza', type: 'friends', difficulty: 'easy', destination: 'Goa', duration: { days: 5, nights: 4 }, price: 15000, discountedPrice: 11999, coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600', ratingsAverage: 4.6, ratingsCount: 112, availableSeats: 14 },
  { _id: '6', title: 'Valley of Flowers Trek', type: 'trekking', difficulty: 'moderate', destination: 'Uttarakhand', duration: { days: 7, nights: 6 }, price: 16000, coverImage: 'https://images.unsplash.com/photo-1585085379527-af174d0cc2d4?w=600', ratingsAverage: 4.8, ratingsCount: 87, availableSeats: 10 },
];

const difficultyColors = { easy: '#10B981', moderate: '#F4C542', challenging: '#FF6B35', extreme: '#EF4444' };

const Stars = ({ rating }) => (
  <div style={{ display: 'flex', gap: '2px' }}>
    {[1,2,3,4,5].map(i => (
      <span key={i} style={{ fontSize: '12px', color: i <= Math.round(rating) ? '#F4C542' : '#374151' }}>★</span>
    ))}
  </div>
);

const FeaturedTrips = () => {
  const typeEmoji = { trekking: '🏔️', solo: '🧭', group: '👥', friends: '🎉', spiritual: '🕉️' };

  return (
    <section className="section" style={{ background: '#0F1337' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}
        >
          <div>
            <span className="badge badge-gold" style={{ marginBottom: '0.75rem' }}>Featured</span>
            <h2 style={{ fontFamily: 'Outfit', fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', fontWeight: 800, color: '#fff' }}>
              Handpicked <span className="text-gradient">Journeys</span>
            </h2>
          </div>
          <Link to="/trips" className="btn-outline" style={{ padding: '0.6rem 1.5rem', fontSize: '0.875rem' }}>
            View All Trips →
          </Link>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {MOCK_TRIPS.map((trip, i) => (
            <motion.div
              key={trip._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="trip-card"
            >
              <Link to={`/trips/${trip._id}`} style={{ textDecoration: 'none', display: 'block' }}>
                <div style={{ position: 'relative', overflow: 'hidden' }}>
                  <img src={trip.coverImage} alt={trip.title} className="trip-card-img" loading="lazy" />
                  <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', display: 'flex', gap: '0.4rem' }}>
                    <span className="badge badge-saffron" style={{ fontSize: '0.7rem', padding: '0.2rem 0.6rem' }}>
                      {typeEmoji[trip.type]} {trip.type}
                    </span>
                    <span style={{
                      padding: '0.2rem 0.6rem', borderRadius: '9999px', fontSize: '0.7rem', fontWeight: 700,
                      background: `${difficultyColors[trip.difficulty]}22`,
                      color: difficultyColors[trip.difficulty],
                      border: `1px solid ${difficultyColors[trip.difficulty]}44`,
                    }}>
                      {trip.difficulty}
                    </span>
                  </div>
                  {trip.availableSeats <= 8 && (
                    <div style={{
                      position: 'absolute', top: '0.75rem', right: '0.75rem',
                      background: '#EF444422', border: '1px solid #EF444444',
                      color: '#FCA5A5', padding: '0.2rem 0.6rem', borderRadius: '9999px', fontSize: '0.7rem', fontWeight: 600,
                    }}>
                      🔥 {trip.availableSeats} left
                    </div>
                  )}
                </div>
                <div style={{ padding: '1.25rem' }}>
                  <h3 style={{ fontFamily: 'Outfit', fontSize: '1.15rem', fontWeight: 700, color: '#F9FAFB', marginBottom: '0.4rem' }}>{trip.title}</h3>
                  <p style={{ color: '#9CA3AF', fontSize: '0.85rem', marginBottom: '0.75rem' }}>
                    📍 {trip.destination} · {trip.duration.days}D/{trip.duration.nights}N
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                    <Stars rating={trip.ratingsAverage} />
                    <span style={{ color: '#F4C542', fontSize: '0.82rem', fontWeight: 600 }}>{trip.ratingsAverage}</span>
                    <span style={{ color: '#6B7280', fontSize: '0.78rem' }}>({trip.ratingsCount})</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      {trip.discountedPrice && (
                        <span style={{ color: '#6B7280', textDecoration: 'line-through', fontSize: '0.85rem', marginRight: '0.4rem' }}>
                          ₹{trip.price.toLocaleString()}
                        </span>
                      )}
                      <span style={{ fontFamily: 'Outfit', fontSize: '1.35rem', fontWeight: 800, color: '#FF6B35' }}>
                        ₹{(trip.discountedPrice || trip.price).toLocaleString()}
                      </span>
                      <span style={{ color: '#6B7280', fontSize: '0.75rem' }}>/ person</span>
                    </div>
                    <span style={{ color: '#10B981', fontSize: '0.8rem', fontWeight: 600 }}>Book Now →</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedTrips;

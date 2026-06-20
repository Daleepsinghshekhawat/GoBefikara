import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// ─── Trip image paths ────────────────────────────────────────────────────────
// Drop your images into:  client/public/images/trips/
// They are served at:     /images/trips/{filename}
// ─────────────────────────────────────────────────────────────────────────────

const HANDPICKED_TRIPS = [
  {
    _id: '1',
    title: 'Kedarnath Trek',
    type: 'trekking',
    difficulty: 'challenging',
    destination: 'Kedarnath, Uttarakhand',
    duration: { days: 6, nights: 5 },
    price: 12500,
    discountedPrice: 9999,
    coverImage: '/images/trips/kedarnath.jpg',
    ratingsAverage: 4.9,
    ratingsCount: 128,
    availableSeats: 8,
    tag: '🔥 Most Popular',
  },
  {
    _id: 'sp2',
    title: 'Badrinath Dham Yatra',
    type: 'spiritual',
    difficulty: 'moderate',
    destination: 'Badrinath, Uttarakhand',
    duration: { days: 5, nights: 4 },
    price: 14000,
    discountedPrice: 11499,
    coverImage: '/images/trips/badrinath.jpg',
    ratingsAverage: 5.0,
    ratingsCount: 89,
    availableSeats: 10,
    tag: '⭐ Top Rated',
  },
  {
    _id: 'sp5',
    title: 'Kashi Vishwanath Yatra',
    type: 'spiritual',
    difficulty: 'easy',
    destination: 'Varanasi, Uttar Pradesh',
    duration: { days: 4, nights: 3 },
    price: 10500,
    discountedPrice: 8499,
    coverImage: '/images/trips/varanasi.jpg',
    ratingsAverage: 4.9,
    ratingsCount: 198,
    availableSeats: 16,
    tag: '🕉️ Jyotirlinga',
  },
  {
    _id: 'sp8',
    title: 'Amarnath Yatra',
    type: 'spiritual',
    difficulty: 'challenging',
    destination: 'Jammu & Kashmir',
    duration: { days: 7, nights: 6 },
    price: 22000,
    discountedPrice: 18499,
    coverImage: '/images/trips/amarnath.jpg',
    ratingsAverage: 5.0,
    ratingsCount: 143,
    availableSeats: 7,
    tag: '🔥 Filling Fast',
  },
  {
    _id: 'sp4',
    title: 'Somnath Temple Yatra',
    type: 'spiritual',
    difficulty: 'easy',
    destination: 'Somnath, Gujarat',
    duration: { days: 3, nights: 2 },
    price: 9500,
    discountedPrice: 7499,
    coverImage: '/images/trips/somnath.jpg',
    ratingsAverage: 4.9,
    ratingsCount: 132,
    availableSeats: 18,
    tag: '🌊 Coastal Temple',
  },
  {
    _id: 'sp3',
    title: 'Mahakaleshwar Ujjain',
    type: 'spiritual',
    difficulty: 'easy',
    destination: 'Ujjain, Madhya Pradesh',
    duration: { days: 2, nights: 1 },
    price: 5500,
    discountedPrice: 3999,
    coverImage: '/images/trips/mahakaleshwar.jpg',
    ratingsAverage: 4.8,
    ratingsCount: 156,
    availableSeats: 20,
    tag: '🌙 Bhasma Aarti',
  },
  {
    _id: 'sp1',
    title: 'Omkareshwar Yatra',
    type: 'spiritual',
    difficulty: 'easy',
    destination: 'Omkareshwar, Madhya Pradesh',
    duration: { days: 3, nights: 2 },
    price: 8500,
    discountedPrice: 6999,
    coverImage: '/images/trips/omkareshwar.jpg',
    ratingsAverage: 4.9,
    ratingsCount: 108,
    availableSeats: 15,
    tag: '🏝️ Sacred Island',
  },
  {
    _id: 'sp7',
    title: 'Tungnath Chandrashila Trek',
    type: 'trekking',
    difficulty: 'moderate',
    destination: 'Rudraprayag, Uttarakhand',
    duration: { days: 4, nights: 3 },
    price: 11500,
    discountedPrice: 8999,
    coverImage: '/images/trips/tungnath.jpg',
    ratingsAverage: 4.8,
    ratingsCount: 67,
    availableSeats: 12,
    tag: '🏔️ Highest Shiva Temple',
  },
  {
    _id: '4',
    title: '11 Shiv Yatra Package',
    type: 'spiritual',
    difficulty: 'moderate',
    destination: 'Pan India',
    duration: { days: 21, nights: 20 },
    price: 45000,
    discountedPrice: 38999,
    coverImage: '/images/trips/shiv_yatra.jpg',
    ratingsAverage: 5.0,
    ratingsCount: 64,
    availableSeats: 6,
    tag: '🔱 All 11 Jyotirlingas',
  },
  {
    _id: '3',
    title: 'Solo Rishikesh Retreat',
    type: 'solo',
    difficulty: 'easy',
    destination: 'Rishikesh, Uttarakhand',
    duration: { days: 4, nights: 3 },
    price: 7500,
    discountedPrice: 5999,
    coverImage: '/images/trips/rishikesh.jpg',
    ratingsAverage: 4.7,
    ratingsCount: 76,
    availableSeats: 12,
    tag: '🧘 Yoga & Adventure',
  },
  {
    _id: 'sp6',
    title: 'Trimbakeshwar Darshan',
    type: 'spiritual',
    difficulty: 'easy',
    destination: 'Nashik, Maharashtra',
    duration: { days: 2, nights: 1 },
    price: 6000,
    discountedPrice: 4499,
    coverImage: '/images/trips/trimbakeshwar.jpg',
    ratingsAverage: 4.7,
    ratingsCount: 74,
    availableSeats: 22,
    tag: '⛩️ Godavari Origin',
  },
];

const difficultyColors = {
  easy: '#10B981',
  moderate: '#F4C542',
  challenging: '#FF6B35',
  extreme: '#EF4444',
};

const typeEmoji = {
  trekking: '🏔️',
  solo: '🧘',
  group: '👥',
  friends: '🎉',
  spiritual: '🕉️',
};

const Stars = ({ rating }) => (
  <div style={{ display: 'flex', gap: '2px' }}>
    {[1, 2, 3, 4, 5].map((i) => (
      <span
        key={i}
        style={{ fontSize: '12px', color: i <= Math.round(rating) ? '#F4C542' : '#374151' }}
      >
        ★
      </span>
    ))}
  </div>
);

// Fallback gradient shown while image loads or if image is missing
const FallbackBg = ({ title }) => {
  const colors = [
    'linear-gradient(135deg,#1a1a4e,#FF6B35)',
    'linear-gradient(135deg,#0d2b45,#F4C542)',
    'linear-gradient(135deg,#1a0533,#a855f7)',
    'linear-gradient(135deg,#003322,#10B981)',
    'linear-gradient(135deg,#330000,#ef4444)',
  ];
  const idx = title.charCodeAt(0) % colors.length;
  return (
    <div
      style={{
        position: 'absolute', inset: 0,
        background: colors[idx],
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '3rem',
      }}
    >
      🕉️
    </div>
  );
};

const TripCard = ({ trip, index }) => {
  const discount = trip.discountedPrice
    ? Math.round(((trip.price - trip.discountedPrice) / trip.price) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.5 }}
      whileHover={{ y: -6 }}
      style={{
        borderRadius: '1.25rem',
        overflow: 'hidden',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        cursor: 'pointer',
        transition: 'box-shadow 0.3s',
      }}
    >
      <Link to={`/trips/${trip._id}`} style={{ textDecoration: 'none', display: 'block' }}>
        {/* ── Image area ── */}
        <div style={{ position: 'relative', height: '220px', overflow: 'hidden', background: '#1a1a4e' }}>
          <FallbackBg title={trip.title} />
          <img
            src={trip.coverImage}
            alt={trip.title}
            loading="lazy"
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%', objectFit: 'cover',
              transition: 'transform 0.5s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.07)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
          {/* Dark gradient overlay */}
          <div
            style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(15,19,55,0.88) 0%, rgba(15,19,55,0.05) 60%)',
            }}
          />

          {/* Top badges */}
          <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            <span style={{
              padding: '0.2rem 0.65rem', borderRadius: '9999px', fontSize: '0.68rem', fontWeight: 700,
              background: 'rgba(255,107,53,0.92)', color: '#fff',
            }}>
              {typeEmoji[trip.type]} {trip.type}
            </span>
            <span style={{
              padding: '0.2rem 0.65rem', borderRadius: '9999px', fontSize: '0.68rem', fontWeight: 700,
              background: `${difficultyColors[trip.difficulty]}22`,
              color: difficultyColors[trip.difficulty],
              border: `1px solid ${difficultyColors[trip.difficulty]}55`,
              backdropFilter: 'blur(4px)',
            }}>
              {trip.difficulty}
            </span>
          </div>

          {/* Seats alert */}
          {trip.availableSeats <= 8 && (
            <div style={{
              position: 'absolute', top: '0.75rem', right: '0.75rem',
              background: 'rgba(239,68,68,0.88)', backdropFilter: 'blur(4px)',
              color: '#fff', padding: '0.2rem 0.65rem', borderRadius: '9999px',
              fontSize: '0.68rem', fontWeight: 700,
            }}>
              🔥 {trip.availableSeats} left
            </div>
          )}

          {/* Discount badge */}
          {discount > 0 && (
            <div style={{
              position: 'absolute', bottom: '0.75rem', right: '0.75rem',
              background: 'rgba(16,185,129,0.92)', color: '#fff',
              padding: '0.2rem 0.6rem', borderRadius: '9999px', fontSize: '0.7rem', fontWeight: 800,
            }}>
              -{discount}% OFF
            </div>
          )}

          {/* Trip tag */}
          {trip.tag && (
            <div style={{
              position: 'absolute', bottom: '0.75rem', left: '0.75rem',
              background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(6px)',
              color: '#fff', padding: '0.2rem 0.65rem', borderRadius: '9999px',
              fontSize: '0.68rem', fontWeight: 600,
              border: '1px solid rgba(255,255,255,0.2)',
            }}>
              {trip.tag}
            </div>
          )}
        </div>

        {/* ── Card body ── */}
        <div style={{ padding: '1.25rem' }}>
          <h3 style={{
            fontFamily: 'Outfit', fontSize: '1.1rem', fontWeight: 700,
            color: '#F9FAFB', marginBottom: '0.35rem', lineHeight: 1.3,
          }}>
            {trip.title}
          </h3>
          <p style={{ color: '#9CA3AF', fontSize: '0.82rem', marginBottom: '0.75rem' }}>
            📍 {trip.destination} &nbsp;·&nbsp; ⏱ {trip.duration.days}D/{trip.duration.nights}N
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1rem' }}>
            <Stars rating={trip.ratingsAverage} />
            <span style={{ color: '#F4C542', fontSize: '0.8rem', fontWeight: 700 }}>{trip.ratingsAverage}</span>
            <span style={{ color: '#6B7280', fontSize: '0.75rem' }}>({trip.ratingsCount})</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              {trip.discountedPrice && (
                <span style={{ color: '#6B7280', textDecoration: 'line-through', fontSize: '0.8rem', marginRight: '0.4rem' }}>
                  ₹{trip.price.toLocaleString()}
                </span>
              )}
              <span style={{ fontFamily: 'Outfit', fontSize: '1.3rem', fontWeight: 800, color: '#FF6B35' }}>
                ₹{(trip.discountedPrice || trip.price).toLocaleString()}
              </span>
              <span style={{ color: '#6B7280', fontSize: '0.72rem' }}> /person</span>
            </div>
            <motion.span
              whileHover={{ x: 4 }}
              style={{
                background: 'linear-gradient(135deg, #FF6B35, #F4C542)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                fontSize: '0.82rem', fontWeight: 700,
              }}
            >
              View Trip →
            </motion.span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const FeaturedTrips = () => (
  <section className="section" style={{ background: '#0F1337' }}>
    <div className="container">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'flex-end', marginBottom: '2.5rem',
          flexWrap: 'wrap', gap: '1rem',
        }}
      >
        <div>
          <span className="badge badge-gold" style={{ marginBottom: '0.75rem' }}>Featured</span>
          <h2 style={{
            fontFamily: 'Outfit', fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
            fontWeight: 800, color: '#fff',
          }}>
            Handpicked <span className="text-gradient">Journeys</span>
          </h2>
          <p style={{ color: '#9CA3AF', marginTop: '0.5rem', fontSize: '0.95rem' }}>
            Click any card to explore the full itinerary, highlights &amp; book your seat.
          </p>
        </div>
        <Link to="/trips" className="btn-outline" style={{ padding: '0.6rem 1.5rem', fontSize: '0.875rem' }}>
          View All Trips →
        </Link>
      </motion.div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1.5rem',
      }}>
        {HANDPICKED_TRIPS.map((trip, i) => (
          <TripCard key={trip._id} trip={trip} index={i} />
        ))}
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ textAlign: 'center', marginTop: '3rem' }}
      >
        <p style={{ color: '#6B7280', fontSize: '0.9rem', marginBottom: '1rem' }}>
          Can't find your dream trip? We have 50+ curated adventures waiting.
        </p>
        <Link to="/trips" className="btn-primary" style={{ padding: '0.85rem 2.5rem' }}>
          🗺️ Explore All Adventures
        </Link>
      </motion.div>
    </div>
  </section>
);

export default FeaturedTrips;

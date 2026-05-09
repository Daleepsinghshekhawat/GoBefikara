import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TRIP_TYPES, DIFFICULTY_LEVELS } from '../constants';

const MOCK_TRIPS = [
  { _id: '1', title: 'Kedarnath Trek', type: 'trekking', difficulty: 'challenging', destination: 'Uttarakhand', duration: { days: 6, nights: 5 }, price: 12500, discountedPrice: 9999, coverImage: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600', ratingsAverage: 4.9, ratingsCount: 128, availableSeats: 8 },
  { _id: '2', title: 'Spiti Valley Expedition', type: 'group', difficulty: 'moderate', destination: 'Himachal Pradesh', duration: { days: 8, nights: 7 }, price: 18000, coverImage: 'https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?w=600', ratingsAverage: 4.8, ratingsCount: 94, availableSeats: 4 },
  { _id: '3', title: 'Solo Rishikesh Retreat', type: 'solo', difficulty: 'easy', destination: 'Uttarakhand', duration: { days: 4, nights: 3 }, price: 7500, discountedPrice: 5999, coverImage: 'https://images.unsplash.com/photo-1590173988978-f1e5a3b5c9c1?w=600', ratingsAverage: 4.7, ratingsCount: 76, availableSeats: 12 },
  { _id: '4', title: '11 Shiv Yatra Package', type: 'spiritual', difficulty: 'moderate', destination: 'Pan India', duration: { days: 21, nights: 20 }, price: 45000, discountedPrice: 38999, coverImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600', ratingsAverage: 5.0, ratingsCount: 64, availableSeats: 6 },
  { _id: '5', title: 'Goa Friends Bonanza', type: 'friends', difficulty: 'easy', destination: 'Goa', duration: { days: 5, nights: 4 }, price: 15000, discountedPrice: 11999, coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600', ratingsAverage: 4.6, ratingsCount: 112, availableSeats: 14 },
  { _id: '6', title: 'Valley of Flowers Trek', type: 'trekking', difficulty: 'moderate', destination: 'Uttarakhand', duration: { days: 7, nights: 6 }, price: 16000, coverImage: 'https://images.unsplash.com/photo-1585085379527-af174d0cc2d4?w=600', ratingsAverage: 4.8, ratingsCount: 87, availableSeats: 10 },
  { _id: '7', title: 'Rajasthan Friends Ride', type: 'friends', difficulty: 'easy', destination: 'Rajasthan', duration: { days: 6, nights: 5 }, price: 13500, coverImage: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600', ratingsAverage: 4.7, ratingsCount: 45, availableSeats: 8 },
  { _id: '8', title: 'Chadar Trek Ladakh', type: 'trekking', difficulty: 'extreme', destination: 'Ladakh', duration: { days: 10, nights: 9 }, price: 28000, coverImage: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=600', ratingsAverage: 4.9, ratingsCount: 56, availableSeats: 6 },
  { _id: '9', title: 'Varanasi Solo Spiritual', type: 'solo', difficulty: 'easy', destination: 'Uttar Pradesh', duration: { days: 3, nights: 2 }, price: 5500, coverImage: 'https://images.unsplash.com/photo-1561361058-c24e01793e6b?w=600', ratingsAverage: 4.8, ratingsCount: 92, availableSeats: 20 },
];

const difficultyColors = { easy: '#10B981', moderate: '#F4C542', challenging: '#FF6B35', extreme: '#EF4444' };
const typeEmoji = { trekking: '🏔️', solo: '🧭', group: '👥', friends: '🎉', spiritual: '🕉️' };

const Stars = ({ rating }) => (
  <span>{'★'.repeat(Math.round(rating))}</span>
);

const TripsPage = () => {
  const [activeType, setActiveType] = useState('');
  const [activeDiff, setActiveDiff] = useState('');
  const [search, setSearch] = useState('');

  const filtered = MOCK_TRIPS.filter(t =>
    (!activeType || t.type === activeType) &&
    (!activeDiff || t.difficulty === activeDiff) &&
    (!search || t.title.toLowerCase().includes(search.toLowerCase()) || t.destination.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={{ minHeight: '100vh', background: '#0F1337', paddingTop: '5rem' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #080B25, #1A1F4B)', padding: '3rem 0 2rem' }}>
        <div className="container">
          <h1 style={{ fontFamily: 'Outfit', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, color: '#fff', marginBottom: '0.5rem' }}>
            All <span className="text-gradient">Adventures</span>
          </h1>
          <p style={{ color: '#9CA3AF', marginBottom: '1.5rem' }}>Find your perfect journey — {filtered.length} trips available</p>

          {/* Search */}
          <input
            type="text"
            id="trip-search"
            placeholder="🔍 Search trips or destinations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field"
            style={{ maxWidth: '500px' }}
          />
        </div>
      </div>

      <div className="container" style={{ paddingTop: '2rem' }}>
        {/* Filters */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '2.5rem' }}>
          <button onClick={() => setActiveType('')} className={activeType === '' ? 'btn-primary' : 'btn-outline'} style={{ padding: '0.4rem 1.1rem', fontSize: '0.85rem' }}>All</button>
          {TRIP_TYPES.map(t => (
            <button key={t.id} onClick={() => setActiveType(t.id === activeType ? '' : t.id)}
              style={{ padding: '0.4rem 1.1rem', fontSize: '0.85rem', borderRadius: '9999px', border: '1px solid', cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'Outfit',
                background: activeType === t.id ? 'rgba(255,107,53,0.15)' : 'transparent',
                color: activeType === t.id ? '#FF8C5C' : '#9CA3AF',
                borderColor: activeType === t.id ? 'rgba(255,107,53,0.4)' : 'rgba(255,255,255,0.12)',
              }}>
              {t.icon} {t.label}
            </button>
          ))}
          <div style={{ width: '1px', background: 'rgba(255,255,255,0.1)' }} />
          {DIFFICULTY_LEVELS.map(d => (
            <button key={d.id} onClick={() => setActiveDiff(d.id === activeDiff ? '' : d.id)}
              style={{ padding: '0.4rem 1.1rem', fontSize: '0.85rem', borderRadius: '9999px', border: '1px solid', cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'Outfit',
                background: activeDiff === d.id ? `${difficultyColors[d.id]}22` : 'transparent',
                color: activeDiff === d.id ? difficultyColors[d.id] : '#9CA3AF',
                borderColor: activeDiff === d.id ? `${difficultyColors[d.id]}55` : 'rgba(255,255,255,0.12)',
              }}>
              {d.label}
            </button>
          ))}
        </div>

        {/* Trip Grid */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem 0', color: '#6B7280' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
            <p>No trips found. Try adjusting your filters.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem', paddingBottom: '4rem' }}>
            {filtered.map((trip, i) => (
              <motion.div key={trip._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="trip-card">
                <Link to={`/trips/${trip._id}`} style={{ textDecoration: 'none', display: 'block' }}>
                  <div style={{ position: 'relative', overflow: 'hidden' }}>
                    <img src={trip.coverImage} alt={trip.title} className="trip-card-img" loading="lazy" />
                    <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', display: 'flex', gap: '0.4rem' }}>
                      <span className="badge badge-saffron" style={{ fontSize: '0.7rem', padding: '0.2rem 0.6rem' }}>{typeEmoji[trip.type]} {trip.type}</span>
                      <span style={{ padding: '0.2rem 0.6rem', borderRadius: '9999px', fontSize: '0.7rem', fontWeight: 700, background: `${difficultyColors[trip.difficulty]}22`, color: difficultyColors[trip.difficulty], border: `1px solid ${difficultyColors[trip.difficulty]}44` }}>{trip.difficulty}</span>
                    </div>
                  </div>
                  <div style={{ padding: '1.25rem' }}>
                    <h3 style={{ fontFamily: 'Outfit', fontSize: '1.1rem', fontWeight: 700, color: '#F9FAFB', marginBottom: '0.35rem' }}>{trip.title}</h3>
                    <p style={{ color: '#9CA3AF', fontSize: '0.82rem', marginBottom: '0.6rem' }}>📍 {trip.destination} · {trip.duration.days}D/{trip.duration.nights}N</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        {trip.discountedPrice && <span style={{ color: '#6B7280', textDecoration: 'line-through', fontSize: '0.8rem', marginRight: '0.3rem' }}>₹{trip.price.toLocaleString()}</span>}
                        <span style={{ fontFamily: 'Outfit', fontSize: '1.25rem', fontWeight: 800, color: '#FF6B35' }}>₹{(trip.discountedPrice || trip.price).toLocaleString()}</span>
                      </div>
                      <span style={{ color: '#F4C542', fontSize: '0.82rem' }}>★ {trip.ratingsAverage} ({trip.ratingsCount})</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TripsPage;

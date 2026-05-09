import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const MOCK_BOOKINGS = [
  { _id: 'b1', trip: { title: 'Kedarnath Trek', destination: 'Uttarakhand', type: 'trekking', coverImage: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=400' }, bookingReference: 'GBF-L8X2-KD91', startDate: '2026-05-15', seatsBooked: 2, totalAmount: 19998, status: 'confirmed', paymentStatus: 'paid' },
  { _id: 'b2', trip: { title: '11 Shiv Yatra Package', destination: 'Pan India', type: 'spiritual', coverImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400' }, bookingReference: 'GBF-M3P9-SY55', startDate: '2026-07-01', seatsBooked: 1, totalAmount: 38999, status: 'pending', paymentStatus: 'paid' },
];

const statusColors = { confirmed: '#10B981', pending: '#F4C542', cancelled: '#EF4444', completed: '#8B5CF6' };

const DashboardPage = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('bookings');

  if (!isAuthenticated) return <Navigate to="/login" state={{ from: { pathname: '/dashboard' } }} replace />;

  return (
    <div style={{ minHeight: '100vh', background: '#0F1337', paddingTop: '5rem' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #080B25, #1A1F4B)', padding: '2.5rem 0 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', paddingBottom: '2rem' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, #FF6B35, #F4C542)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Outfit', fontSize: '1.75rem', fontWeight: 900, color: '#0F1337', flexShrink: 0 }}>
              {user?.name?.[0]?.toUpperCase()}
            </div>
            <div>
              <h1 style={{ fontFamily: 'Outfit', fontSize: '1.75rem', fontWeight: 800, color: '#fff' }}>
                Hey, {user?.name?.split(' ')[0]}! 👋
              </h1>
              <p style={{ color: '#9CA3AF', fontSize: '0.9rem' }}>{user?.email}</p>
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: '0' }}>
            {['bookings', 'profile'].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{
                padding: '0.75rem 1.5rem', background: 'transparent', border: 'none', cursor: 'pointer',
                color: activeTab === tab ? '#FF6B35' : '#9CA3AF',
                fontFamily: 'Outfit', fontWeight: 600, fontSize: '0.95rem', textTransform: 'capitalize',
                borderBottom: `2px solid ${activeTab === tab ? '#FF6B35' : 'transparent'}`,
                transition: 'all 0.2s',
              }}>
                {tab === 'bookings' ? '🎒 My Bookings' : '👤 Profile'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '5rem' }}>
        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <h2 style={{ fontFamily: 'Outfit', fontSize: '1.5rem', fontWeight: 700, color: '#fff' }}>My Bookings ({MOCK_BOOKINGS.length})</h2>
              <Link to="/trips" className="btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.875rem' }}>+ Book New Trip</Link>
            </div>
            {MOCK_BOOKINGS.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '5rem', color: '#6B7280' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎒</div>
                <p>No bookings yet. Start your adventure!</p>
                <Link to="/trips" className="btn-primary" style={{ display: 'inline-flex', marginTop: '1.5rem' }}>Explore Trips</Link>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {MOCK_BOOKINGS.map((booking, i) => (
                  <motion.div key={booking._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                    className="glass" style={{ padding: '1.5rem', display: 'flex', gap: '1.25rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                    <img src={booking.trip.coverImage} alt={booking.trip.title} style={{ width: '100px', height: '75px', objectFit: 'cover', borderRadius: '0.75rem', flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: '200px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.4rem' }}>
                        <h3 style={{ fontFamily: 'Outfit', fontSize: '1.05rem', fontWeight: 700, color: '#fff' }}>{booking.trip.title}</h3>
                        <span style={{ padding: '0.2rem 0.75rem', borderRadius: '9999px', fontSize: '0.72rem', fontWeight: 700, background: `${statusColors[booking.status]}22`, color: statusColors[booking.status], border: `1px solid ${statusColors[booking.status]}44` }}>
                          {booking.status}
                        </span>
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', color: '#9CA3AF', fontSize: '0.82rem', marginBottom: '0.5rem' }}>
                        <span>📍 {booking.trip.destination}</span>
                        <span>📅 {new Date(booking.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                        <span>👥 {booking.seatsBooked} seat(s)</span>
                      </div>
                      <div style={{ color: '#6B7280', fontSize: '0.78rem', fontFamily: 'monospace', marginBottom: '0.5rem' }}>Ref: {booking.bookingReference}</div>
                      <div style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '1.25rem', color: '#FF6B35' }}>₹{booking.totalAmount.toLocaleString()}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ maxWidth: '500px' }}>
            <h2 style={{ fontFamily: 'Outfit', fontSize: '1.5rem', fontWeight: 700, color: '#fff', marginBottom: '1.5rem' }}>My Profile</h2>
            <div className="glass" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
              {[['Name', user?.name], ['Email', user?.email], ['Phone', user?.phone || 'Not set'], ['City', user?.city || 'Not set'], ['Role', user?.role]].map(([label, value]) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ color: '#9CA3AF', fontSize: '0.875rem' }}>{label}</span>
                  <span style={{ color: '#F9FAFB', fontWeight: 600, fontSize: '0.875rem' }}>{value}</span>
                </div>
              ))}
            </div>
            <button id="dashboard-logout" onClick={logout} className="btn-outline" style={{ width: '100%' }}>🚪 Logout</button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;

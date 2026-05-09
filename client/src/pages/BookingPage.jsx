import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { bookingService } from '../services';
import toast from 'react-hot-toast';

const MOCK_TRIPS = {
  '1': { _id: '1', title: 'Kedarnath Trek', price: 9999, duration: { days: 6, nights: 5 }, destination: 'Kedarnath', availableSeats: 8 },
  '2': { _id: '2', title: 'Spiti Valley Expedition', price: 18000, duration: { days: 8, nights: 7 }, destination: 'Himachal Pradesh', availableSeats: 4 },
};

const STEPS = ['Trip Details', 'Participants', 'Confirm & Pay'];

const BookingPage = () => {
  const { tripId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const trip = MOCK_TRIPS[tripId] || MOCK_TRIPS['1'];

  const [step, setStep] = useState(0);
  const [seats, setSeats] = useState(1);
  const [startDate, setStartDate] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [loading, setLoading] = useState(false);

  const total = trip.price * seats;

  const handleNext = () => {
    if (step === 0 && !startDate) { toast.error('Please select a start date'); return; }
    setStep(s => s + 1);
  };

  const handleBook = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(r => setTimeout(r, 1500));
      toast.success('🎉 Booking confirmed! Check your dashboard.');
      navigate('/dashboard');
    } catch (err) {
      toast.error('Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0F1337', paddingTop: '5.5rem', paddingBottom: '4rem' }}>
      <div className="container" style={{ maxWidth: '700px' }}>
        <h1 style={{ fontFamily: 'Outfit', fontSize: '2rem', fontWeight: 800, color: '#fff', marginBottom: '0.5rem' }}>Book Your Adventure</h1>
        <p style={{ color: '#9CA3AF', marginBottom: '2rem' }}>Booking: <span style={{ color: '#FF6B35', fontWeight: 600 }}>{trip.title}</span></p>

        {/* Step Indicator */}
        <div style={{ display: 'flex', gap: '0', marginBottom: '2.5rem' }}>
          {STEPS.map((s, i) => (
            <div key={s} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.5rem',
                background: i <= step ? 'linear-gradient(135deg, #FF6B35, #F4C542)' : 'rgba(255,255,255,0.08)',
                color: i <= step ? '#0F1337' : '#6B7280',
                border: i === step ? 'none' : '1px solid rgba(255,255,255,0.1)',
                transition: 'all 0.3s',
              }}>{i < step ? '✓' : i + 1}</div>
              <span style={{ fontSize: '0.75rem', color: i === step ? '#FF6B35' : '#6B7280', textAlign: 'center' }}>{s}</span>
              {i < STEPS.length - 1 && <div style={{ position: 'absolute', top: '18px', left: '50%', right: '-50%', height: '2px', background: i < step ? '#FF6B35' : 'rgba(255,255,255,0.1)', zIndex: -1 }} />}
            </div>
          ))}
        </div>

        <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
          {step === 0 && (
            <div>
              <h2 style={{ fontFamily: 'Outfit', fontSize: '1.25rem', fontWeight: 700, color: '#fff', marginBottom: '1.5rem' }}>Trip Details</h2>
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', color: '#CBD5E1', fontSize: '0.85rem', fontWeight: 500, marginBottom: '0.5rem' }}>Number of Seats</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <button onClick={() => setSeats(Math.max(1, seats - 1))} style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,107,53,0.15)', border: '1px solid rgba(255,107,53,0.3)', color: '#FF6B35', fontSize: '1.2rem', cursor: 'pointer' }}>−</button>
                  <span style={{ fontFamily: 'Outfit', fontSize: '1.5rem', fontWeight: 700, color: '#fff', minWidth: '2rem', textAlign: 'center' }}>{seats}</span>
                  <button onClick={() => setSeats(Math.min(trip.availableSeats, seats + 1))} style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,107,53,0.15)', border: '1px solid rgba(255,107,53,0.3)', color: '#FF6B35', fontSize: '1.2rem', cursor: 'pointer' }}>+</button>
                </div>
              </div>
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', color: '#CBD5E1', fontSize: '0.85rem', fontWeight: 500, marginBottom: '0.5rem' }}>Start Date</label>
                <input id="booking-date" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="input-field" min={new Date().toISOString().split('T')[0]} />
              </div>
              <div>
                <label style={{ display: 'block', color: '#CBD5E1', fontSize: '0.85rem', fontWeight: 500, marginBottom: '0.5rem' }}>Special Requests (optional)</label>
                <textarea id="booking-requests" value={specialRequests} onChange={(e) => setSpecialRequests(e.target.value)} className="input-field" rows={3} placeholder="Any dietary preferences, medical conditions, etc." style={{ resize: 'vertical' }} />
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <h2 style={{ fontFamily: 'Outfit', fontSize: '1.25rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>Participant Details</h2>
              <p style={{ color: '#9CA3AF', fontSize: '0.875rem', marginBottom: '1.5rem' }}>For now, your registered profile details will be used.</p>
              <div className="glass-saffron" style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #FF6B35, #F4C542)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Outfit', fontSize: '1.25rem', fontWeight: 700, color: '#0F1337' }}>
                    {user?.name?.[0]?.toUpperCase()}
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Outfit', fontWeight: 700, color: '#fff' }}>{user?.name}</div>
                    <div style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>{user?.email} · Primary Traveler</div>
                  </div>
                </div>
              </div>
              {seats > 1 && <p style={{ color: '#6B7280', fontSize: '0.82rem', marginTop: '1rem' }}>+ {seats - 1} additional participant(s). You can update their details from your dashboard.</p>}
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 style={{ fontFamily: 'Outfit', fontSize: '1.25rem', fontWeight: 700, color: '#fff', marginBottom: '1.5rem' }}>Order Summary</h2>
              {[['Trip', trip.title], ['Duration', `${trip.duration.days}D/${trip.duration.nights}N`], ['Start Date', startDate], ['Seats', seats], ['Price/person', `₹${trip.price.toLocaleString()}`]].map(([label, val]) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)', color: '#CBD5E1', fontSize: '0.9rem' }}>
                  <span style={{ color: '#9CA3AF' }}>{label}</span>
                  <span style={{ fontWeight: 600 }}>{val}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0', marginTop: '0.5rem' }}>
                <span style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: '1.1rem', color: '#fff' }}>Total Amount</span>
                <span style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '1.5rem', color: '#FF6B35' }}>₹{total.toLocaleString()}</span>
              </div>
              <div style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '0.75rem', padding: '0.75rem 1rem', display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.85rem', color: '#34D399' }}>
                <span>🔒</span> Demo payment — no real charge. Instant confirmation.
              </div>
            </div>
          )}
        </motion.div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: step === 0 ? 'flex-end' : 'space-between' }}>
          {step > 0 && <button onClick={() => setStep(s => s - 1)} className="btn-outline" style={{ padding: '0.75rem 2rem' }}>← Back</button>}
          {step < 2
            ? <button id="booking-next" onClick={handleNext} className="btn-primary" style={{ padding: '0.75rem 2rem' }}>Continue →</button>
            : <button id="booking-confirm" onClick={handleBook} className="btn-primary" style={{ padding: '0.75rem 2rem' }} disabled={loading}>{loading ? '⏳ Confirming...' : '🎉 Confirm Booking'}</button>
          }
        </div>
      </div>
    </div>
  );
};

export default BookingPage;

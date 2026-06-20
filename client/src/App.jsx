import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { getMe } from './store/authSlice';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import TripsPage from './pages/TripsPage';
import TripDetailPage from './pages/TripDetailPage';
import ShivYatraPage from './pages/ShivYatraPage';
import BookingPage from './pages/BookingPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';

// Simple 404 page
const NotFound = () => (
  <div style={{ minHeight: '100vh', background: '#0F1337', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem', paddingTop: '4rem' }}>
    <div style={{ fontSize: '5rem' }}>🏔️</div>
    <h1 style={{ fontFamily: 'Outfit', fontSize: '3rem', fontWeight: 900, color: '#fff' }}>404</h1>
    <p style={{ color: '#9CA3AF' }}>This trail doesn't exist yet.</p>
    <a href="/" className="btn-primary" style={{ marginTop: '1rem' }}>← Back to Base Camp</a>
  </div>
);

// Restores the logged-in user from localStorage on app start
const AppInit = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem('gbf_token');
    if (token) dispatch(getMe()).catch(() => {});
  }, [dispatch]);
  return null;
};

const App = () => (
  <BrowserRouter>
    <AppInit />
    <Toaster
      position="top-right"
      toastOptions={{
        style: { background: '#1A1F4B', color: '#F9FAFB', border: '1px solid rgba(255,255,255,0.1)' },
        success: { iconTheme: { primary: '#10B981', secondary: '#0F1337' } },
        error: { iconTheme: { primary: '#EF4444', secondary: '#0F1337' } },
      }}
    />
    <Navbar />
    <main>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/trips" element={<TripsPage />} />
        <Route path="/trips/:id" element={<TripDetailPage />} />
        <Route path="/shiv-yatra" element={<ShivYatraPage />} />
        <Route path="/book/:tripId" element={<BookingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
    <Footer />
  </BrowserRouter>
);

export default App;

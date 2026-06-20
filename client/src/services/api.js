import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('gbf_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle 401 globally — but NOT on auth endpoints (login/register)
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const url = err.config?.url || '';
    const isAuthRoute = url.includes('/auth/login') || url.includes('/auth/register');
    const hasToken = !!localStorage.getItem('gbf_token');

    // Only force-logout when a protected route gets a 401 (i.e. token expired/invalid)
    if (err.response?.status === 401 && !isAuthRoute && hasToken) {
      localStorage.removeItem('gbf_token');
      localStorage.removeItem('gbf_user');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export default api;

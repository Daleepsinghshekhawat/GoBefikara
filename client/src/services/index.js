import api from './api';

export const authService = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/profile', data),
  changePassword: (data) => api.put('/auth/change-password', data),
};

export const tripService = {
  getAll: (params) => api.get('/trips', { params }),
  getById: (id) => api.get(`/trips/${id}`),
  getBySlug: (slug) => api.get(`/trips/slug/${slug}`),
  getStats: () => api.get('/trips/stats'),
  create: (data) => api.post('/trips', data),
  update: (id, data) => api.put(`/trips/${id}`, data),
  delete: (id) => api.delete(`/trips/${id}`),
};

export const bookingService = {
  create: (data) => api.post('/bookings', data),
  getMine: () => api.get('/bookings/mine'),
  getById: (id) => api.get(`/bookings/${id}`),
  cancel: (id, reason) => api.patch(`/bookings/${id}/cancel`, { reason }),
};

export const reviewService = {
  getForTrip: (tripId) => api.get(`/trips/${tripId}/reviews`),
  create: (tripId, data) => api.post(`/trips/${tripId}/reviews`, data),
};

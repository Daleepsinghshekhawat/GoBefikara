export const TRIP_TYPES = [
  { id: 'trekking', label: 'Trekking', icon: '🏔️', color: 'badge-emerald', description: 'Conquer breathtaking trails' },
  { id: 'solo', label: 'Solo', icon: '🧭', color: 'badge-blue', description: 'Journey of self-discovery' },
  { id: 'group', label: 'Group', icon: '👥', color: 'badge-purple', description: 'Meet like-minded adventurers' },
  { id: 'friends', label: 'Friends', icon: '🎉', color: 'badge-gold', description: 'Unforgettable memories together' },
  { id: 'spiritual', label: 'Spiritual', icon: '🕉️', color: 'badge-saffron', description: 'Divine pilgrimages & yatras' },
];

export const DIFFICULTY_LEVELS = [
  { id: 'easy', label: 'Easy', color: 'emerald' },
  { id: 'moderate', label: 'Moderate', color: 'yellow' },
  { id: 'challenging', label: 'Challenging', color: 'orange' },
  { id: 'extreme', label: 'Extreme', color: 'red' },
];

export const SHIV_YATRAS = [
  { id: 1, name: 'Somnath', state: 'Gujarat', temple: 'Somnath Temple', desc: 'The first jyotirlinga on the western coast.', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Somnath_temple_Twilight.jpg/800px-Somnath_temple_Twilight.jpg' },
  { id: 2, name: 'Mallikarjuna', state: 'Andhra Pradesh', temple: 'Srisailam Temple', desc: 'Nestled in the Nallamala Hills.', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Srisailam_temple.jpg/800px-Srisailam_temple.jpg' },
  { id: 3, name: 'Mahakaleshwar', state: 'Madhya Pradesh', temple: 'Ujjain Mahakal', desc: 'The divine jyotirlinga of Ujjain.', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Mahakaleshwar_Temple_Ujjain.jpg/800px-Mahakaleshwar_Temple_Ujjain.jpg' },
  { id: 4, name: 'Omkareshwar', state: 'Madhya Pradesh', temple: 'Omkareshwar Temple', desc: 'Sacred island shaped like Om.', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Omkareshwar_Temple.jpg/800px-Omkareshwar_Temple.jpg' },
  { id: 5, name: 'Kedarnath', state: 'Uttarakhand', temple: 'Kedarnath Temple', desc: 'High altitude Himalayan pilgrimage.', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Kedarnath_Panorama.jpg/800px-Kedarnath_Panorama.jpg' },
  { id: 6, name: 'Bhimashankar', state: 'Maharashtra', temple: 'Bhimashankar Temple', desc: 'Ancient temple in the Sahyadri range.', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Bhimashankar_Temple.jpg/800px-Bhimashankar_Temple.jpg' },
  { id: 7, name: 'Kashi Vishwanath', state: 'Uttar Pradesh', temple: 'Kashi Vishwanath', desc: 'The eternal city of Varanasi.', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Kashi_Vishwanath_Temple.jpg/800px-Kashi_Vishwanath_Temple.jpg' },
  { id: 8, name: 'Trimbakeshwar', state: 'Maharashtra', temple: 'Trimbakeshwar Temple', desc: 'Source of the sacred Godavari river.', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Trimbakeshwar_temple.jpg/800px-Trimbakeshwar_temple.jpg' },
  { id: 9, name: 'Vaidyanath', state: 'Jharkhand', temple: 'Baijnath Dham', desc: 'Known as Vaidyanath, healer of all.', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Baidyanath_Jyotirlinga.jpg/800px-Baidyanath_Jyotirlinga.jpg' },
  { id: 10, name: 'Nageshwar', state: 'Gujarat', temple: 'Nageshwar Temple', desc: 'Lord of all serpents, near Dwarka.', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Nageshwar_jyotirlinga.jpg/800px-Nageshwar_jyotirlinga.jpg' },
  { id: 11, name: 'Rameshwaram', state: 'Tamil Nadu', temple: 'Ramanathaswamy Temple', desc: 'Where Rama worshipped Shiva—southernmost jyotirlinga.', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Ramanathaswamy_Temple_Rameswaram.jpg/800px-Ramanathaswamy_Temple_Rameswaram.jpg' },
];

export const ROUTES = {
  HOME: '/',
  TRIPS: '/trips',
  TRIP_DETAIL: '/trips/:id',
  SHIV_YATRA: '/shiv-yatra',
  BOOKING: '/book/:tripId',
  ABOUT: '/about',
  CONTACT: '/contact',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
};

export const API_URL = '/api';

🌍 Gobekira – Shiva Pilgrimage Travel Platform

Gobekira is a full-stack travel booking platform designed for devotees and travelers who want to explore famous Shiva pilgrimage destinations across India. The platform provides trip discovery, secure booking workflows, authentication, admin trip management, and a modern responsive user experience.

🚀 Tech Stack
Frontend
React.js
Vite
Redux Toolkit
Axios
Framer Motion
React Hot Toast
Backend
Node.js
Express.js
MongoDB
Mongoose
JWT Authentication
✨ Features
🔐 Authentication & Authorization
User Register/Login system
JWT-based authentication
Token persistence using localStorage
Axios interceptors for automatic 401 handling
Protected routes
Role-based access control for admins
🛕 Trip Management
List all Shiva pilgrimage trips
Detailed trip pages
Slug-based trip retrieval
Trip statistics endpoints
Admin CRUD operations for trips
📖 Booking System
Create bookings
View user bookings
Cancel bookings
Admin booking management dashboard
⭐ Reviews & Profiles
User profile management
Review system for trips
Personalized booking history
🛡️ Security & Reliability
Helmet security middleware
Configured CORS policy
Centralized error handling
Request logging
Health-check API route
🎨 User Experience
Responsive modern UI
Animated pages and forms using Framer Motion
Toast notifications with React Hot Toast
Smooth navigation and interactions
⚙️ Development Setup
Clone Repository
git clone https://github.com/your-username/gobekira.git
cd gobekira
📦 Install Dependencies
Frontend
cd frontend
npm install
npm run dev
Backend
cd backend
npm install
npm run dev
🔧 Environment Variables

Create a .env file inside backend folder:

PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
🔄 API Proxy

Vite proxy is configured so frontend /api requests route cleanly to backend during development.

📁 Project Structure
Gobekira/
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── redux/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── config/
│
└── README.md
🌟 Future Improvements
Online payment integration
Google Maps integration
Wishlist functionality
Email notifications
Admin analytics dashboard
📸 Preview

A modern travel platform focused on spiritual tourism and Shiva pilgrimage experiences.

👨‍💻 Author

Built with ❤️ by Gobekira Team

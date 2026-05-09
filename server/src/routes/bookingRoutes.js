const express = require('express');
const {
  createBooking, getMyBookings, getBookingById, cancelBooking, getAllBookings,
} = require('../controllers/bookingController');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

router.use(protect); // all booking routes require login

router.post('/', createBooking);
router.get('/mine', getMyBookings);
router.get('/', adminOnly, getAllBookings);
router.get('/:id', getBookingById);
router.patch('/:id/cancel', cancelBooking);

module.exports = router;

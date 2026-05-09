const Booking = require('../models/Booking');
const Trip = require('../models/Trip');
const { asyncHandler, sendSuccess, sendError } = require('../utils/apiResponse');

// @route POST /api/bookings
exports.createBooking = asyncHandler(async (req, res) => {
  const { tripId, startDate, seatsBooked, participants, specialRequests } = req.body;

  const trip = await Trip.findById(tripId);
  if (!trip || !trip.isActive) return sendError(res, 'Trip not found', 404);
  if (trip.availableSeats < seatsBooked) {
    return sendError(res, `Only ${trip.availableSeats} seats are available`, 400);
  }

  const totalAmount = (trip.discountedPrice || trip.price) * seatsBooked;

  const booking = await Booking.create({
    user: req.user.id,
    trip: tripId,
    startDate,
    seatsBooked,
    participants,
    totalAmount,
    specialRequests,
    status: 'confirmed',
    paymentStatus: 'paid', // mock payment
    paymentMethod: 'mock',
  });

  // Deduct seats
  await Trip.findByIdAndUpdate(tripId, { $inc: { availableSeats: -seatsBooked } });

  await booking.populate('trip', 'title coverImage destination duration price');
  sendSuccess(res, { booking }, 'Booking confirmed!', 201);
});

// @route GET /api/bookings/mine
exports.getMyBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ user: req.user.id })
    .populate('trip', 'title coverImage destination duration type startDates')
    .sort({ createdAt: -1 });
  sendSuccess(res, { bookings, count: bookings.length });
});

// @route GET /api/bookings/:id
exports.getBookingById = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id)
    .populate('trip')
    .populate('user', 'name email phone');

  if (!booking) return sendError(res, 'Booking not found', 404);

  // Allow owner or admin
  if (booking.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
    return sendError(res, 'Not authorized', 403);
  }

  sendSuccess(res, { booking });
});

// @route PATCH /api/bookings/:id/cancel
exports.cancelBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) return sendError(res, 'Booking not found', 404);
  if (booking.user.toString() !== req.user.id) return sendError(res, 'Not authorized', 403);
  if (booking.status === 'cancelled') return sendError(res, 'Booking already cancelled', 400);

  booking.status = 'cancelled';
  booking.paymentStatus = 'refunded';
  booking.cancelReason = req.body.reason || 'User requested cancellation';
  booking.cancelledAt = new Date();
  await booking.save();

  // Restore seats
  await Trip.findByIdAndUpdate(booking.trip, { $inc: { availableSeats: booking.seatsBooked } });

  sendSuccess(res, { booking }, 'Booking cancelled and refund initiated');
});

// @route GET /api/bookings  [admin]
exports.getAllBookings = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const total = await Booking.countDocuments();
  const bookings = await Booking.find()
    .populate('user', 'name email')
    .populate('trip', 'title destination')
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));
  sendSuccess(res, { bookings, pagination: { total, page: Number(page), pages: Math.ceil(total / limit) } });
});

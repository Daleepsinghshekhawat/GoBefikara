const Review = require('../models/Review');
const Booking = require('../models/Booking');
const { asyncHandler, sendSuccess, sendError } = require('../utils/apiResponse');

// @route GET /api/trips/:tripId/reviews
exports.getTripReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ trip: req.params.tripId })
    .populate('user', 'name avatar')
    .sort({ createdAt: -1 });
  sendSuccess(res, { reviews, count: reviews.length });
});

// @route POST /api/trips/:tripId/reviews
exports.createReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  // Verify user has completed this trip
  const booking = await Booking.findOne({
    user: req.user.id,
    trip: req.params.tripId,
    status: { $in: ['confirmed', 'completed'] },
  });

  if (!booking) {
    return sendError(res, 'You can only review trips you have booked', 403);
  }

  const existing = await Review.findOne({ user: req.user.id, trip: req.params.tripId });
  if (existing) return sendError(res, 'You have already reviewed this trip', 400);

  const review = await Review.create({
    user: req.user.id,
    trip: req.params.tripId,
    rating,
    comment,
  });

  await review.populate('user', 'name avatar');
  sendSuccess(res, { review }, 'Review submitted successfully', 201);
});

// @route DELETE /api/reviews/:id
exports.deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) return sendError(res, 'Review not found', 404);
  if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return sendError(res, 'Not authorized', 403);
  }
  await review.deleteOne();
  sendSuccess(res, {}, 'Review deleted');
});

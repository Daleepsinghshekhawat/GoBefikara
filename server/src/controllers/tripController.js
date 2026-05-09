const Trip = require('../models/Trip');
const { asyncHandler, sendSuccess, sendError } = require('../utils/apiResponse');

// @route GET /api/trips
exports.getTrips = asyncHandler(async (req, res) => {
  const { type, difficulty, minPrice, maxPrice, destination, featured, page = 1, limit = 12 } = req.query;

  const filter = { isActive: true };
  if (type) filter.type = type;
  if (difficulty) filter.difficulty = difficulty;
  if (destination) filter.destination = new RegExp(destination, 'i');
  if (featured === 'true') filter.isFeatured = true;
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  const total = await Trip.countDocuments(filter);
  const trips = await Trip.find(filter)
    .sort({ isFeatured: -1, createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .select('-itinerary');

  sendSuccess(res, {
    trips,
    pagination: { total, page: Number(page), pages: Math.ceil(total / limit), limit: Number(limit) },
  });
});

// @route GET /api/trips/:id
exports.getTripById = asyncHandler(async (req, res) => {
  const trip = await Trip.findById(req.params.id);
  if (!trip || !trip.isActive) return sendError(res, 'Trip not found', 404);
  sendSuccess(res, { trip });
});

// @route GET /api/trips/slug/:slug
exports.getTripBySlug = asyncHandler(async (req, res) => {
  const trip = await Trip.findOne({ slug: req.params.slug, isActive: true });
  if (!trip) return sendError(res, 'Trip not found', 404);
  sendSuccess(res, { trip });
});

// @route POST /api/trips  [admin]
exports.createTrip = asyncHandler(async (req, res) => {
  const trip = await Trip.create({ ...req.body, createdBy: req.user.id });
  sendSuccess(res, { trip }, 'Trip created successfully', 201);
});

// @route PUT /api/trips/:id  [admin]
exports.updateTrip = asyncHandler(async (req, res) => {
  const trip = await Trip.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!trip) return sendError(res, 'Trip not found', 404);
  sendSuccess(res, { trip }, 'Trip updated');
});

// @route DELETE /api/trips/:id  [admin]
exports.deleteTrip = asyncHandler(async (req, res) => {
  const trip = await Trip.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
  if (!trip) return sendError(res, 'Trip not found', 404);
  sendSuccess(res, {}, 'Trip deactivated');
});

// @route GET /api/trips/stats
exports.getTripStats = asyncHandler(async (req, res) => {
  const stats = await Trip.aggregate([
    { $match: { isActive: true } },
    {
      $group: {
        _id: '$type',
        count: { $sum: 1 },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
        avgRating: { $avg: '$ratingsAverage' },
      },
    },
    { $sort: { count: -1 } },
  ]);
  sendSuccess(res, { stats });
});

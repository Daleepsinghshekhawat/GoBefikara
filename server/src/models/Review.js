const mongoose = require('mongoose');
const Trip = require('./Trip');

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    trip: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Trip',
      required: true,
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot exceed 5'],
    },
    comment: {
      type: String,
      required: [true, 'Review comment is required'],
      maxlength: [500, 'Comment cannot exceed 500 characters'],
    },
    images: [String],
  },
  { timestamps: true }
);

// One review per user per trip
reviewSchema.index({ user: 1, trip: 1 }, { unique: true });

// Update trip ratings after review save
reviewSchema.statics.calcAverageRatings = async function (tripId) {
  const stats = await this.aggregate([
    { $match: { trip: tripId } },
    { $group: { _id: '$trip', avgRating: { $avg: '$rating' }, count: { $sum: 1 } } },
  ]);
  if (stats.length > 0) {
    await Trip.findByIdAndUpdate(tripId, {
      ratingsAverage: stats[0].avgRating,
      ratingsCount: stats[0].count,
    });
  } else {
    await Trip.findByIdAndUpdate(tripId, { ratingsAverage: 4.0, ratingsCount: 0 });
  }
};

reviewSchema.post('save', function () {
  this.constructor.calcAverageRatings(this.trip);
});

reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.findOne();
  next();
});

reviewSchema.post(/^findOneAnd/, async function () {
  if (this.r) await this.r.constructor.calcAverageRatings(this.r.trip);
});

module.exports = mongoose.model('Review', reviewSchema);

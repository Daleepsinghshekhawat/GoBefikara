const mongoose = require('mongoose');

const itineraryDaySchema = new mongoose.Schema({
  day: { type: Number, required: true },
  title: { type: String, required: true },
  description: String,
  accommodation: String,
  meals: [String],
  distance: String,
  altitude: String,
});

const tripSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Trip title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    shortDescription: {
      type: String,
      maxlength: [200, 'Short description cannot exceed 200 characters'],
    },
    type: {
      type: String,
      enum: ['trekking', 'solo', 'group', 'friends', 'spiritual'],
      required: [true, 'Trip type is required'],
    },
    difficulty: {
      type: String,
      enum: ['easy', 'moderate', 'challenging', 'extreme'],
      default: 'moderate',
    },
    destination: {
      type: String,
      required: [true, 'Destination is required'],
    },
    state: String,
    country: {
      type: String,
      default: 'India',
    },
    duration: {
      days: { type: Number, required: true },
      nights: { type: Number, required: true },
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    discountedPrice: Number,
    maxGroupSize: {
      type: Number,
      required: true,
      default: 12,
    },
    minGroupSize: {
      type: Number,
      default: 1,
    },
    availableSeats: {
      type: Number,
      required: true,
    },
    images: [String],
    coverImage: {
      type: String,
      default: '',
    },
    itinerary: [itineraryDaySchema],
    inclusions: [String],
    exclusions: [String],
    highlights: [String],
    thingsToCarry: [String],
    startDates: [Date],
    startLocation: String,
    endLocation: String,
    altitude: String,
    isActive: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    ratingsAverage: {
      type: Number,
      default: 4.0,
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot exceed 5'],
      set: (val) => Math.round(val * 10) / 10,
    },
    ratingsCount: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

// Auto-generate slug from title
tripSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

module.exports = mongoose.model('Trip', tripSchema);

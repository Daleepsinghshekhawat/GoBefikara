const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const bookingSchema = new mongoose.Schema(
  {
    bookingReference: {
      type: String,
      unique: true,
      default: () => `GBF-${uuidv4().slice(0, 4).toUpperCase()}-${uuidv4().slice(0, 4).toUpperCase()}`,
    },
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
    startDate: {
      type: Date,
      required: [true, 'Start date is required'],
    },
    seatsBooked: {
      type: Number,
      required: true,
      min: [1, 'At least 1 seat required'],
      default: 1,
    },
    participants: [
      {
        name: String,
        age: Number,
        idProof: String,
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed'],
      default: 'pending',
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'refunded', 'failed'],
      default: 'pending',
    },
    paymentMethod: {
      type: String,
      enum: ['razorpay', 'upi', 'card', 'netbanking', 'mock'],
      default: 'mock',
    },
    specialRequests: String,
    cancelReason: String,
    cancelledAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Booking', bookingSchema);

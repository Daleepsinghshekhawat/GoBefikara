const express = require('express');
const {
  getTrips, getTripById, getTripBySlug, createTrip, updateTrip, deleteTrip, getTripStats,
} = require('../controllers/tripController');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

router.get('/stats', getTripStats);
router.get('/slug/:slug', getTripBySlug);
router.get('/', getTrips);
router.get('/:id', getTripById);
router.post('/', protect, adminOnly, createTrip);
router.put('/:id', protect, adminOnly, updateTrip);
router.delete('/:id', protect, adminOnly, deleteTrip);

module.exports = router;

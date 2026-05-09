const express = require('express');
const { getTripReviews, createReview, deleteReview } = require('../controllers/reviewController');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router({ mergeParams: true }); // mergeParams for tripId from parent

router.get('/', getTripReviews);
router.post('/', protect, createReview);

// Separate route for delete (not trip-nested)
module.exports = router;

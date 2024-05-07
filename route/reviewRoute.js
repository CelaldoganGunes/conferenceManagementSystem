const express = require('express');
const router = express.Router();
const reviewController = require('../controller/reviewController');

router.post('/', reviewController.createReview);
router.get('/', reviewController.getReviews);
router.get('/:reviewId', reviewController.getReviewById);
router.get('/paper/:paperId', reviewController.getReviewsByPaperId);
router.get('/reviewer/:reviewerId', reviewController.getPaperByReviewerId);
router.put('/:reviewId', reviewController.updateReview);
router.delete('/:reviewId', reviewController.deleteReview);

module.exports = router;

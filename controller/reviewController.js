const ReviewService = require('../service/reviewService');

const reviewController = {
    async createReview(req, res, next) {
        try {
            const { reviewerId, paperId, rate, feedback } = req.body;
            const newReview = await ReviewService.createReview(reviewerId, paperId, rate, feedback);
            res.json(newReview);
        } catch (error) {
            next(error);
        }
    },

    async getReviews(req, res, next) {
        try {
            const reviews = await ReviewService.getReviews();
            res.json(reviews);
        } catch (error) {
            next(error);
        }
    },

    async getReviewById(req, res, next) {
        try {
            const reviewId = req.params.reviewId;
            const review = await ReviewService.getReviewById(reviewId);
            res.json(review);
        } catch (error) {
            next(error);
        }
    },

    async getReviewsByPaperId(req, res, next) {
        try {
            const paperId = req.params.paperId;
            const reviews = await ReviewService.getReviewsByPaperId(paperId);
            res.json(reviews);
        } catch (error) {
            next(error);
        }
    },

    async getPaperByReviewerId(req, res, next) {
        try {
            const reviewerId = req.params.reviewerId;
            const papers = await ReviewService.getPaperByReviewerId(reviewerId);
            res.json(papers);
        } catch (error) {
            next(error);
        }
    },

    async updateReview(req, res, next) {
        try {
            const reviewId = req.params.reviewId;
            const newData = req.body;
            const updatedReview = await ReviewService.updateReview(reviewId, newData);
            return res.redirect("/incelemelerim");
        } catch (error) {
            next(error);
        }
    },

    async deleteReview(req, res, next) {
        try {
            const reviewId = req.params.reviewId;
            await ReviewService.deleteReview(reviewId);
            res.sendStatus(204);
        } catch (error) {
            next(error);
        }
    }
};

module.exports = reviewController;

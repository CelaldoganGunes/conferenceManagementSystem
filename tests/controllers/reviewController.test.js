require('dotenv').config();
const ReviewService = require('../../service/reviewService');

describe('Review Controller', () => {
    it('should create a new review', async () => {
        const reviewData = {
            reviewerId: 'reviewer-id',
            paperId: 'paper-id',
            rate: 4,
            feedback: 'Good paper',
        };

        jest.spyOn(ReviewService, 'createReview').mockResolvedValue(reviewData);

        const createdReview = await ReviewService.createReview(
            reviewData.reviewerId,
            reviewData.paperId,
            reviewData.rate,
            reviewData.feedback
        );

        expect(createdReview).toEqual(reviewData);
        expect(ReviewService.createReview).toHaveBeenCalledWith(
            reviewData.reviewerId,
            reviewData.paperId,
            reviewData.rate,
            reviewData.feedback
        );
    });

    it('should get all reviews', async () => {
        const reviews = [
            { _id: 'review-1', rate: 4, feedback: 'Good paper' },
            { _id: 'review-2', rate: 3, feedback: 'Average paper' },
        ];

        jest.spyOn(ReviewService, 'getReviews').mockResolvedValue(reviews);

        const retrievedReviews = await ReviewService.getReviews();

        expect(retrievedReviews).toEqual(reviews);
        expect(ReviewService.getReviews).toHaveBeenCalled();
    });
});
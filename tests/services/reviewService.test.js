require('dotenv').config();
const mongoose = require('mongoose');
const ReviewService = require('../service/reviewService');
const Review = require('../model/review');

describe('Review Service', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    beforeEach(async () => {
        await Review.deleteMany();
    });

    it('should create a new review', async () => {
        const reviewData = {
            reviewerId: new mongoose.Types.ObjectId(),
            paperId: new mongoose.Types.ObjectId(),
            rate: 4,
            feedback: 'Good paper',
        };

        const createdReview = await ReviewService.createReview(
            reviewData.reviewerId,
            reviewData.paperId,
            reviewData.rate,
            reviewData.feedback
        );

        expect(createdReview).toBeDefined();
        expect(createdReview.reviewerId).toEqual(reviewData.reviewerId);
        expect(createdReview.paperId).toEqual(reviewData.paperId);
        expect(createdReview.rate).toBe(reviewData.rate);
        expect(createdReview.feedback).toBe(reviewData.feedback);
    });

    it('should return all reviews', async () => {
        const reviewData1 = {
            reviewerId: new mongoose.Types.ObjectId(),
            paperId: new mongoose.Types.ObjectId(),
            rate: 4,
            feedback: 'Good paper',
        };
        const reviewData2 = {
            reviewerId: new mongoose.Types.ObjectId(),
            paperId: new mongoose.Types.ObjectId(),
            rate: 3,
            feedback: 'Average paper',
        };

        await ReviewService.createReview(
            reviewData1.reviewerId,
            reviewData1.paperId,
            reviewData1.rate,
            reviewData1.feedback
        );
        await ReviewService.createReview(
            reviewData2.reviewerId,
            reviewData2.paperId,
            reviewData2.rate,
            reviewData2.feedback
        );

        const reviews = await ReviewService.getReviews();

        expect(reviews).toBeDefined();
        expect(reviews.length).toBe(2);
    });

    // Diğer test senaryoları...
});
require('dotenv').config();
const mongoose = require('mongoose');
const Review = require('./review.js');

describe('Review Model', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should create a new review', async () => {
        const reviewData = {
            reviewerId: new mongoose.Types.ObjectId(),
            paperId: new mongoose.Types.ObjectId(),
            rate: 8,
            feedback: 'Good paper, accepted with minor revisions',
        };

        const review = new Review(reviewData);
        const savedReview = await review.save();

        expect(savedReview._id).toBeDefined();
        expect(savedReview.reviewerId).toBe(reviewData.reviewerId);
        expect(savedReview.paperId).toBe(reviewData.paperId);
        expect(savedReview.rate).toBe(reviewData.rate);
        expect(savedReview.feedback).toBe(reviewData.feedback);
    });

    it('should not create a review without required fields', async () => {
        const review = new Review();

        let err;
        try {
            await review.save();
        } catch (error) {
            err = error;
        }

        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.errors.reviewerId).toBeDefined();
        expect(err.errors.paperId).toBeDefined();
        expect(err.errors.rate).toBeDefined();
        expect(err.errors.feedback).toBeDefined();
    });
});
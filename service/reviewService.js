const Review = require('../model/review');

// İnceleme oluşturma
async function createReview(reviewerId, paperId, rate, feedback) {
    try {
        const newReview = new Review({
            reviewerId,
            paperId,
            rate,
            feedback
        });
        const savedReview = await newReview.save();
        return savedReview;
    } catch (error) {
        throw new Error(`İnceleme oluşturulamadı: ${error.message}`);
    }
}

// Tüm incelemeleri getirme
async function getReviews() {
    try {
        const reviews = await Review.find();
        return reviews;
    } catch (error) {
        throw new Error(`İncelemeler getirilemedi: ${error.message}`);
    }
}

// İncelemeyi ID'ye göre getirme
async function getReviewById(reviewId) {
    try {
        const review = await Review.findById(reviewId);
        return review;
    } catch (error) {
        throw new Error(`İnceleme getirilemedi: ${error.message}`);
    }
}

// Makale ID'sine göre incelemeleri getirme
async function getReviewsByPaperId(paperId) {
    try {
        const reviews = await Review.find({ paperId });
        return reviews;
    } catch (error) {
        throw new Error(`Makaleye ait incelemeler getirilemedi: ${error.message}`);
    }
}

// İnceleyen ID'sine göre makaleyi getirme
async function getPaperByReviewerId(reviewerId) {
    try {
        const reviews = await Review.find({ reviewerId });
        return reviews;
    } catch (error) {
        throw new Error(`Reviewera ait incelemeler getirilemedi: ${error.message}`);
    }
}

// İncelemeyi güncelleme
async function updateReview(reviewId, newData) {
    try {
        const updatedReview = await Review.findByIdAndUpdate(reviewId, newData, { new: true });
        return updatedReview;
    } catch (error) {
        throw new Error(`İnceleme güncellenemedi: ${error.message}`);
    }
}

// İncelemeyi silme
async function deleteReview(reviewId) {
    try {
        await Review.findByIdAndDelete(reviewId);
    } catch (error) {
        throw new Error(`İnceleme silinemedi: ${error.message}`);
    }
}

module.exports = {
    createReview,
    getReviews,
    getReviewById,
    getReviewsByPaperId,
    getPaperByReviewerId,
    updateReview,
    deleteReview
};

const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    reviewerId: {
        type : mongoose.Schema.ObjectId,
        required: true
    },
    paperId: {
        type : mongoose.Schema.ObjectId,
        required: true
    },
    rate: { // 0-3 rejected, 4-6 revision, 7-10 accepted
        type : Number,
        required: true
    },
    feedback: {
        type : String,
        required: true
    }
});

const Review = mongoose.model('review', reviewSchema);
module.exports = Review;
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
    rate: {
        type : Number,
        required: true
    }
});

const Review = mongoose.model('review', reviewSchema);
module.exports = Review;
const mongoose = require('mongoose');

const sessionReviewSchema = new mongoose.Schema({
    attendeeId: {
        type : mongoose.Schema.ObjectId,
        required: true
    },
    sessionId: {
        type : mongoose.Schema.ObjectId,
        required: true
    },
    rate: {
        type : Number,
        required: true
    },
    feedback: {
        type : String,
        required: true
    }
});

const SessionReview = mongoose.model('sessionReview', sessionReviewSchema);
module.exports = SessionReview;
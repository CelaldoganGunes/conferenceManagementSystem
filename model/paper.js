const mongoose = require('mongoose');

const paperSchema = new mongoose.Schema({
    creatorId : {
        type : mongoose.Schema.ObjectId,
        required: true
    },
    name: {
        type : String,
        required: true
    },
    title: {
        type : String,
        required: true
    },
    abstract: { //makalenin özeti
        type : String,
        required: true
    },
    keywords : { //"asdsa, asdsa, asdas,asdas as,asdas as das, asdasdas,"
        type : String,
        required: true
    },
    reviewList : { // Reviewer ID (String) -> Verdiği Puan (Integer)
        type : Map,
        of: Number,
        required: true
    },
    
});

const Paper = mongoose.model('paper', paperSchema);
module.exports = Paper;
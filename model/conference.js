const mongoose = require('mongoose');

const conferenceSchema = new mongoose.Schema({
    name: {
        type : String,
        required: true
    },
    startDate: {
        type : Date,
        required: true
    },
    endDate: {
        type : Date,
        required: true
    },
    creatorId : {
        type : mongoose.Schema.ObjectId,
        required: true
    },
    attendeeList : { // Kullanıcı ID (String) -> Rol Sayısı (Integer)
        type : Map,
        of: Number,
        required: true
    },
    paperList : [mongoose.Schema.ObjectId],
    

});

const Conference = mongoose.model('conference', conferenceSchema);
module.exports = Conference;
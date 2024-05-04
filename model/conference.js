const mongoose = require('mongoose');

const conferenceSchema = new mongoose.Schema({
    name: {
        type : String,
        required: true
    },
    address: {
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
    attendeeLimit: { // admin bile katılımcı sayılır
        type : Number,
        required: true
    },

    

});

const Conference = mongoose.model('conference', conferenceSchema);
module.exports = Conference;
const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    conferenceId : {
        type : mongoose.Schema.ObjectId,
        required: true
    },
    theme: {
        type : String,
        required: true
    },
    topic: {
        type : String,
        required: true
    },
    type: {
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
    qrCodeFile: {
        type : String,
        required: true
    },
    attendeeList : { // Kullanıcı ID (String) -> katılma durumu
        type : Map,
        of: Number,
        required: true
    },
    presenterId : {
        type : mongoose.Schema.ObjectId,
        required: true
    }, 
    
});

const Session = mongoose.model('session', sessionSchema);
module.exports = Session;
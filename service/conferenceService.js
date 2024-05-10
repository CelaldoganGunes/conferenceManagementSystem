const Conference = require('../model/conference');

// Konferans oluşturma
async function createConference(name, address, startDate, endDate, creatorId, attendeeList, attendeeLimit) {
    try {
        const newConference = new Conference({
            name,
            address,
            startDate,
            endDate,
            creatorId,
            attendeeList,
            attendeeLimit
        });
        const savedConference = await newConference.save();
        return savedConference;
    } catch (error) {
        throw new Error(`Konferans oluşturulamadı: ${error.message}`);
    }
}

// Tüm konferansları getirme
async function getConferences() {
    try {
        const conferences = await Conference.find();
        return conferences;
    } catch (error) {
        throw new Error(`Konferanslar getirilemedi: ${error.message}`);
    }
}

// Konferansı ID'ye göre getirme
async function getConferenceById(conferenceId) {
    try {
        const conference = await Conference.findById(conferenceId);
        return conference;
    } catch (error) {
        throw new Error(`Konferans getirilemedi: ${error.message}`);
    }
}

// Oluşturucu ID'sine göre konferansları getirme
async function getConferencesByCreatorId(creatorId) {
    try {
        const conferences = await Conference.find({ creatorId });
        return conferences;
    } catch (error) {
        throw new Error(`Oluşturucuya ait konferanslar getirilemedi: ${error.message}`);
    }

}

async function getConferencesByAttendeeId(attendeeId){
    try {
        const conferences = await getConferences();
        if (!conferences) {
            throw new Error("konferans yok");
        }
        
        let conferencesTheUserAttended = [];
        conferences.forEach(element => {
            if(element.attendeeList.get(attendeeId))
            {
                conferencesTheUserAttended.push(element);
            }
        });
        return conferencesTheUserAttended;
    } catch (error) {
        throw new Error(`${attendeeId} ait konferanslar getirilemedi: ${error.message}`);
    }
}


// Kullanıcı ID'sine göre rol getirme
async function getRoleByUserId(conferenceId, userId) {
    try {
        const conference = await getConferenceById(conferenceId);
        if (!conference) {
            throw new Error("Konferans bulunamadı.");
        }
        const attendeeList = conference.attendeeList;
        return attendeeList.get(userId);
    } catch (error) {
        throw new Error(`Rol getirilemedi: ${error.message}`);
    }
}

// Kullanıcı ID'sine göre rol ayarlama
async function setRoleByUserId(conferenceId, userId, role) {
    try {
        const conference = await getConferenceById(conferenceId);
        if (!conference) {
            throw new Error("Konferans bulunamadı.");
        }
        conference.attendeeList.set(userId, role);
        await updateConference(conferenceId, conference);
    } catch (error) {
        throw new Error(`Katılma durumu ayarlanamadı: ${error.message}`);
    }
}

// Konferansı güncelleme
async function updateConference(conferenceId, newData) {
    try {
        const updatedConference = await Conference.findByIdAndUpdate(conferenceId, newData, { new: true });
        return updatedConference;
    } catch (error) {
        throw new Error(`Konferans güncellenemedi: ${error.message}`);
    }
}

// Konferansı silme
async function deleteConference(conferenceId) {
    try {
        await Conference.findByIdAndDelete(conferenceId);
    } catch (error) {
        throw new Error(`Konferans silinemedi: ${error.message}`);
    }
}

module.exports = {
    createConference,
    getConferences,
    getConferenceById,
    getConferencesByCreatorId,
    getRoleByUserId,
    setRoleByUserId,
    updateConference,
    deleteConference,
    getConferencesByAttendeeId
};

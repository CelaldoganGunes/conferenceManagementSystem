const Session = require('../model/session');

// Oturum oluşturma
async function createSession(conferenceId, theme, topic, type, startDate, endDate, qrCodeFile, attendeeList, presenterId) {
    try {
        const newSession = new Session({
            conferenceId,
            theme,
            topic,
            type,
            startDate,
            endDate,
            qrCodeFile,
            attendeeList,
            presenterId
        });
        const savedSession = await newSession.save();
        return savedSession;
    } catch (error) {
        throw new Error(`Oturum oluşturulamadı: ${error.message}`);
    }
}

// Tüm oturumları getirme
async function getSessions() {
    try {
        const sessions = await Session.find();
        return sessions;
    } catch (error) {
        throw new Error(`Oturumlar getirilemedi: ${error.message}`);
    }
}

// Oturumu ID'ye göre getirme
async function getSessionById(sessionId) {
    try {
        const session = await Session.findById(sessionId);
        return session;
    } catch (error) {
        throw new Error(`Oturum getirilemedi: ${error.message}`);
    }
}

// Konferans ID'sine göre oturumları getirme
async function getSessionsByConferenceId(conferenceId) {
    try {
        const sessions = await Session.find({ conferenceId });
        return sessions;
    } catch (error) {
        throw new Error(`Konferansa ait oturumlar getirilemedi: ${error.message}`);
    }
}

// Kullanıcı ID'sine göre katılma durumunu getirme
async function getAttendanceStatusByUserId(sessionId, userId) {
    try {
        const session = await getSessionById(sessionId);
        if (!session) {
            throw new Error("Oturum bulunamadı.");
        }
        const attendeeList = session.attendeeList;
        return attendeeList.get(userId);
    } catch (error) {
        throw new Error(`Katılma durumu getirilemedi: ${error.message}`);
    }
}

// Kullanıcı ID'sine göre katılma durumunu ayarlama
async function setAttendanceStatusByUserId(sessionId, userId, status) {
    try {
        const session = await getSessionById(sessionId);
        if (!session) {
            throw new Error("Oturum bulunamadı.");
        }
        session.attendeeList.set(userId, status);
        await updateSession(sessionId, session);
    } catch (error) {
        throw new Error(`Katılma durumu ayarlanamadı: ${error.message}`);
    }
}

// Oturumu güncelleme
async function updateSession(sessionId, newData) {
    try {
        const updatedSession = await Session.findByIdAndUpdate(sessionId, newData, { new: true });
        return updatedSession;
    } catch (error) {
        throw new Error(`Oturum güncellenemedi: ${error.message}`);
    }
}

// Oturumu silme
async function deleteSession(sessionId) {
    try {
        await Session.findByIdAndDelete(sessionId);
    } catch (error) {
        throw new Error(`Oturum silinemedi: ${error.message}`);
    }
}

module.exports = {
    createSession,
    getSessions,
    getSessionById,
    getSessionsByConferenceId,
    getAttendanceStatusByUserId,
    setAttendanceStatusByUserId,
    updateSession,
    deleteSession
};

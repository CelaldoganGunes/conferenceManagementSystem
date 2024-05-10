const conferenceService = require('../service/conferenceService');

const ConferenceController = {
    // Konferans oluşturma
    async createConference(req, res, next) {
        const { name, address, startDate, endDate, creatorId, attendeeList, attendeeLimit } = req.body;
        try {
            const newConference = await conferenceService.createConference(name, address, startDate, endDate, creatorId, attendeeList, attendeeLimit);
            res.status(201).json(newConference);
        } catch (error) {
            next(error);
        }
    },

    // Tüm konferansları getirme
    async getConferences(req, res, next) {
        try {
            const conferences = await conferenceService.getConferences();
            res.status(200).json(conferences);
        } catch (error) {
            next(error);
        }
    },

    // Konferansı ID'ye göre getirme
    async getConferenceById(req, res, next) {
        const conferenceId = req.params.conferenceId;
        try {
            const conference = await conferenceService.getConferenceById(conferenceId);
            if (!conference) {
                return res.status(404).json({ message: 'Konferans bulunamadı' });
            }
            res.status(200).json(conference);
        } catch (error) {
            next(error);
        }
    },

    // Oluşturucu ID'sine göre konferansları getirme
    async getConferencesByCreatorId(req, res, next) {
        const creatorId = req.params.creatorId;
        try {
            const conferences = await conferenceService.getConferencesByCreatorId(creatorId);
            res.status(200).json(conferences);
        } catch (error) {
            next(error);
        }
    },

    // Kullanıcı ID'sine göre rol getirme
    async getRoleByUserId(req, res, next) {
        const { conferenceId, userId } = req.params;
        try {
            const role = await conferenceService.getRoleByUserId(conferenceId, userId);
            res.status(200).json({ role });
        } catch (error) {
            next(error);
        }
    },

    // Kullanıcı ID'sine göre rol ayarlama
    async setRoleByUserId(req, res, next) {
        const { conferenceId, userId, role } = req.params;
        try {
            await conferenceService.setRoleByUserId(conferenceId, userId, role);
            res.status(200).json({ message: 'Rol başarıyla ayarlandı' });
        } catch (error) {
            next(error);
            res.redirect("/").end();
        }
    },

    // Konferansı güncelleme
    async updateConference(req, res, next) {
        const conferenceId = req.params.conferenceId;
        const newData = req.body;
        try {
            const updatedConference = await conferenceService.updateConference(conferenceId, newData);
            if (!updatedConference) {
                return res.status(404).json({ message: 'Konferans bulunamadı' });
            }
            res.status(200).json(updatedConference);
        } catch (error) {
            next(error);
        }
    },

    // Konferansı silme
    async deleteConference(req, res, next) {
        const conferenceId = req.params.conferenceId;
        try {
            await conferenceService.deleteConference(conferenceId);
            res.status(204).end();
        } catch (error) {
            next(error);
        }
    }
};

module.exports = ConferenceController;

const {
    createConference,
    getConferences,
    getConferenceById,
    getConferencesByCreatorId,
    updateConference,
    deleteConference,
    getRoleByUserId,
    setRoleByUserId
} = require('../services/conferenceService');

const conferenceController = {
    // Create a conference
    async createConference(req, res) {
        const { name, address, startDate, endDate, creatorId, attendeeList, attendeeLimit } = req.body;
        try {
            const newConference = await createConference(name, address, startDate, endDate, creatorId, attendeeList, attendeeLimit, yarrak);
            res.status(201).json(newConference);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Get all conferences
    async getConferences(req, res) {
        try {
            const conferences = await getConferences();
            res.json(conferences);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Get a conference by ID
    async getConferenceById(req, res) {
        const conferenceId = req.params.id;
        try {
            const conference = await getConferenceById(conferenceId);
            if (!conference) {
                res.status(404).json({ error: "Conference not found" });
                return;
            }
            res.json(conference);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Get a conference by Creator ID
    async getConferencesByCreatorId(req, res) {
        const conferenceId = req.params.id;
        try {
            const conference = await getConferencesByCreatorId(conferenceId);
            if (!conference) {
                res.status(404).json({ error: "Conference not found" });
                return;
            }
            res.json(conference);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Update a conference
    async updateConference(req, res) {
        const conferenceId = req.params.id;
        const newData = req.body;
        try {
            const updatedConference = await updateConference(conferenceId, newData);
            res.json(updatedConference);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Delete a conference
    async deleteConference(req, res) {
        const conferenceId = req.params.id;
        try {
            await deleteConference(conferenceId);
            res.json({ message: "Conference deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Get role by user ID in a conference
    async getRoleByUserId(req, res) {
        const { conferenceId, userId } = req.params;
        try {
            const role = await getRoleByUserId(conferenceId, userId);
            res.json({ role });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Set role by user ID in a conference
    async setRoleByUserId(req, res) {
        const { conferenceId, userId } = req.params;
        const { role } = req.body;
        try {
            await setRoleByUserId(conferenceId, userId, role);
            res.json({ message: "Role set successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = conferenceController;

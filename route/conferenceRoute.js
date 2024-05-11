const express = require('express');
const router = express.Router();
const ConferenceController = require('../controller/conferenceController');

// Konferans oluşturma
router.post('/create', ConferenceController.createConference);

// Tüm konferansları getirme
router.get('/', ConferenceController.getConferences);

// ID'ye göre konferansı getirme
router.get('/:conferenceId', ConferenceController.getConferenceById);

// Oluşturucu ID'sine göre konferansları getirme
router.get('/creator/:creatorId', ConferenceController.getConferencesByCreatorId);

// Kullanıcı ID'sine göre rol getirme
router.get('/:conferenceId/user/:userId/role', ConferenceController.getRoleByUserId);

// Kullanıcı ID'sine göre rol ayarlama
router.get('/:conferenceId/user/:userId/role/:role/:isAdmin', ConferenceController.setRoleByUserId);

// Konferansı güncelleme
router.post('/update/:conferenceId', ConferenceController.updateConference);

// Konferansı silme
router.delete('/:conferenceId', ConferenceController.deleteConference);

module.exports = router;

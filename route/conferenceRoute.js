const express = require('express');
const router = express.Router();
const conferenceController = require('../controller/conferenceController');



router.get('/', conferenceController.getConferences);

module.exports = router;
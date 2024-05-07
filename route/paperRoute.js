const express = require('express');
const router = express.Router();
const paperController = require('../controller/paperController');

router.get('/', paperController.getPapers);
router.post('/', paperController.createPaper);
router.get('/creator/:creatorId', paperController.getPapersByCreatorId);
router.get('/conference/:conferenceId', paperController.getPapersByConferenceId);
router.get('/:paperId', paperController.getPaperById);
router.put('/:paperId', paperController.updatePaper);
router.delete('/:paperId', paperController.deletePaper);

module.exports = router;

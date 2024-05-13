const express = require('express');
const router = express.Router();
const multer = require('multer');
const paperController = require('../controller/paperController');
const path = require('path');

// Disk depolama ayarlarını belirliyoruz

// Multer'ı ayarlarla birlikte kullanarak yükleme yapmak üzere hazırlıyoruz
const upload = multer({ storage: multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './files'); // Dosyanın kaydedileceği klasör
  },
  filename: function (req, file, cb) {
    // Yüklenen dosyanın uzantısını kontrol ediyoruz
    let extension = path.extname(file.originalname);
    if (extension !== '.pdf') {
      // Eğer dosya PDF değilse, uzantıyı PDF'ye çeviriyoruz
      extension = '.pdf';
    }

    // Yeni dosya adını oluşturuyoruz
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'uploaded-' + uniqueSuffix + extension); // Örneğin: uploaded-1620871190294-123456789.pdf
  }
}) });

// Rotaları tanımlıyoruz
router.get('/', paperController.getPapers);
router.post('/', upload.single('pdfFile'), paperController.createPaper);
router.get('/creator/:creatorId', paperController.getPapersByCreatorId);
router.get('/conference/:conferenceId', paperController.getPapersByConferenceId);
router.get('/:paperId', paperController.getPaperById);
router.put('/:paperId', paperController.updatePaper);
router.delete('/:paperId', paperController.deletePaper);

module.exports = router;

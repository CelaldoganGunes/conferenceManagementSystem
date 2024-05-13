const paperService = require('../service/paperService');
const fs = require('fs');
const path = require('path');

const paperController = {
    async createPaper(req, res, next) {
        const { creatorId, conferenceId, title, abstract, keywords, pdffile } = req.body;
        const pdfFile = req.file; // multer ile yüklenen dosya
        
        console.log(req.body)
        
        try {
            // PDF dosyasının adını değiştirme
            const originalFileName = pdfFile.originalname;
            const extension = path.extname(originalFileName);
            const newFileName = `${creatorId}${extension}`; // Yeni dosya adı: creatorId.pdf
            
            // Dosyayı yeniden adlandır
            fs.renameSync(pdfFile.path, path.join(pdfFile.destination, newFileName));
            
            // Yeni dosya adını güncelle
            req.body.pdffile = newFileName;

            const newPaper = await paperService.createPaper(creatorId, conferenceId, title, abstract, keywords, pdffile);
            if (newPaper === null) {
                console.log("newpaper == null")
                return res.send("Atanmış Review olmadığı için ekleme başarısız");
            }
            res.status(201).json(newPaper);
        } catch (error) {
            next(error);
        }
    },

    async getPapers(req, res, next) {
        try {
            const papers = await paperService.getPapers();
            res.status(200).json(papers);
        } catch (error) {
            next(error);
        }
    },

    async getPaperById(req, res, next) {
        const paperId = req.params.paperId;
        try {
            const paper = await paperService.getPaperById(paperId);
            if (!paper) {
                return res.status(404).json({ message: 'Makale bulunamadı' });
            }
            res.status(200).json(paper);
        } catch (error) {
            next(error);
        }
    },

    async getPapersByCreatorId(req, res, next) {
        const creatorId = req.params.creatorId;
        try {
            const papers = await paperService.getPapersByCreatorId(creatorId);
            res.status(200).json(papers);
        } catch (error) {
            next(error);
        }
    },

    async getPapersByConferenceId(req, res, next) {
        const conferenceId = req.params.conferenceId;
        try {
            const papers = await paperService.getPapersByConferenceId(conferenceId);
            res.status(200).json(papers);
        } catch (error) {
            next(error);
        }
    },

    async updatePaper(req, res, next) {
        const paperId = req.params.paperId;
        const newData = req.body;
        try {
            const updatedPaper = await paperService.updatePaper(paperId, newData);
            res.status(200).json(updatedPaper);
        } catch (error) {
            next(error);
        }
    },

    async deletePaper(req, res, next) {
        const paperId = req.params.paperId;
        try {
            await paperService.deletePaper(paperId);
            res.status(204).end();
        } catch (error) {
            next(error);
        }
    }
};

module.exports = paperController;

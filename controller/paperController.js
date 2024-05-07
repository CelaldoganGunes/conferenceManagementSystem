const paperService = require('../service/paperService');

const paperController = {
    async createPaper(req, res, next) {
        const { creatorId, conferenceId, title, abstract, keywords } = req.body;
        try {
            const newPaper = await paperService.createPaper(creatorId, conferenceId, title, abstract, keywords);
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

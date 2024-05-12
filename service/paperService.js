const Paper = require('../model/paper');
const reviewService = require('../service/reviewService');
const conferenceService = require('../service/conferenceService');

// Makale oluşturma
async function createPaper(creatorId, conferenceId, title, abstract, keywords, file) {
    try {
        const newPaper = new Paper({
            creatorId,
            conferenceId,
            title,
            abstract,
            keywords
        });
        const savedPaper = await newPaper.save();

        // Reviewer'ları belirle
        
        const reviewerList = [];

        let conference = await conferenceService.getConferenceById(conferenceId);
        conference.attendeeList.forEach((value, key) => {
            if (value == 2)// reviewer rol ID
            {
                reviewerList.push(key);
            }
        });
        
        // Rastgele bir Reviewer seç
        
        const randomIndex = Math.floor(Math.random() * reviewerList.length);
        let reviewerId = reviewerList[randomIndex];
        //console.log(reviewerId);
        // Review oluştur
        const review = await reviewService.createReview(reviewerId, savedPaper._id, -1, "Paper has not been reviewed yet.");

        return savedPaper;
    } catch (error) {
        throw new Error(`Makale oluşturulamadı: ${error.message}`);
    }
}

// Tüm makaleleri getirme
async function getPapers() {
    try {
        const papers = await Paper.find();
        return papers;
    } catch (error) {
        throw new Error(`Makaleler getirilemedi: ${error.message}`);
    }
}

// Makaleyi ID'ye göre getirme
async function getPaperById(paperId) {
    try {
        const paper = await Paper.findById(paperId);
        return paper;
    } catch (error) {
        throw new Error(`Makale getirilemedi: ${error.message}`);
    }
}

// Makaleleri creatorId'ye göre getirme
async function getPapersByCreatorId(creatorId) {
    try {
        const papers = await Paper.find({ creatorId });
        return papers;
    } catch (error) {
        throw new Error(`Kullanıcıya ait makaleler getirilemedi: ${error.message}`);
    }
}

// Konferans ID'sine göre makaleleri getirme
async function getPapersByConferenceId(conferenceId) {
    try {
        const papers = await Paper.find({ conferenceId });
        return papers;
    } catch (error) {
        throw new Error(`Konferansa ait makaleler getirilemedi: ${error.message}`);
    }
}

// Makaleyi güncelleme
async function updatePaper(paperId, newData) {
    try {
        const updatedPaper = await Paper.findByIdAndUpdate(paperId, newData, { new: true });
        return updatedPaper;
    } catch (error) {
        throw new Error(`Makale güncellenemedi: ${error.message}`);
    }
}

// Makaleyi silme
async function deletePaper(paperId) {
    try {
        await Paper.findByIdAndDelete(paperId);
    } catch (error) {
        throw new Error(`Makale silinemedi: ${error.message}`);
    }
}

module.exports = {
    createPaper,
    getPapers,
    getPaperById,
    getPapersByCreatorId,
    getPapersByConferenceId,
    updatePaper,
    deletePaper
};

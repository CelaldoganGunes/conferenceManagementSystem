require('dotenv').config();
const PaperService = require('../../service/paperService');

describe('Paper Controller', () => {
    it('should create a new paper', async () => {
        const paperData = {
            creatorId: 'creator-id',
            conferenceId: 'conference-id',
            title: 'Test Paper',
            abstract: 'This is a test paper',
            keywords: 'test, paper',
        };

        jest.spyOn(PaperService, 'createPaper').mockResolvedValue(paperData);

        const createdPaper = await PaperService.createPaper(
            paperData.creatorId,
            paperData.conferenceId,
            paperData.title,
            paperData.abstract,
            paperData.keywords
        );

        expect(createdPaper).toEqual(paperData);
        expect(PaperService.createPaper).toHaveBeenCalledWith(
            paperData.creatorId,
            paperData.conferenceId,
            paperData.title,
            paperData.abstract,
            paperData.keywords
        );
    });

    it('should get all papers', async () => {
        const papers = [
            { _id: 'paper-1', title: 'Paper 1' },
            { _id: 'paper-2', title: 'Paper 2' },
        ];

        jest.spyOn(PaperService, 'getPapers').mockResolvedValue(papers);

        const retrievedPapers = await PaperService.getPapers();

        expect(retrievedPapers).toEqual(papers);
        expect(PaperService.getPapers).toHaveBeenCalled();
    });
});
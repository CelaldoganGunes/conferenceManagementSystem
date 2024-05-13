require('dotenv').config();
const mongoose = require('mongoose');
const PaperService = require('../../service/paperService');
const Paper = require('../../model/paper');
const Conference = require('../../model/conference');

describe('Paper Service', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    beforeEach(async () => {
        await Paper.deleteMany();
        await Conference.deleteMany();
    });

    it('should create a new paper', async () => {
        const conferenceId = new mongoose.Types.ObjectId();
        await Conference.create({ _id: conferenceId, attendeeList: [] });

        const paperData = {
            creatorId: new mongoose.Types.ObjectId(),
            conferenceId: conferenceId,
            title: 'Test Paper',
            abstract: 'This is a test paper',
            keywords: 'test, paper',
        };

        const createdPaper = await PaperService.createPaper(
            paperData.creatorId,
            paperData.conferenceId,
            paperData.title,
            paperData.abstract,
            paperData.keywords
        );

        expect(createdPaper).toBeDefined();
        expect(createdPaper.creatorId).toEqual(paperData.creatorId);
        expect(createdPaper.conferenceId).toEqual(paperData.conferenceId);
        expect(createdPaper.title).toBe(paperData.title);
        expect(createdPaper.abstract).toBe(paperData.abstract);
        expect(createdPaper.keywords).toBe(paperData.keywords);
    });

    it('should return all papers', async () => {
        const conferenceId1 = new mongoose.Types.ObjectId();
        const conferenceId2 = new mongoose.Types.ObjectId();
        await Conference.create({ _id: conferenceId1, attendeeList: [] });
        await Conference.create({ _id: conferenceId2, attendeeList: [] });

        const paperData1 = {
            creatorId: new mongoose.Types.ObjectId(),
            conferenceId: conferenceId1,
            title: 'Test Paper 1',
            abstract: 'This is test paper 1',
            keywords: 'test, paper',
        };
        const paperData2 = {
            creatorId: new mongoose.Types.ObjectId(),
            conferenceId: conferenceId2,
            title: 'Test Paper 2',
            abstract: 'This is test paper 2',
            keywords: 'test, paper',
        };

        await PaperService.createPaper(
            paperData1.creatorId,
            paperData1.conferenceId,
            paperData1.title,
            paperData1.abstract,
            paperData1.keywords
        );
        await PaperService.createPaper(
            paperData2.creatorId,
            paperData2.conferenceId,
            paperData2.title,
            paperData2.abstract,
            paperData2.keywords
        );

        const papers = await PaperService.getPapers();

        expect(papers).toBeDefined();
        expect(papers.length).toBe(2);
    });

    // Diğer test senaryoları...
});
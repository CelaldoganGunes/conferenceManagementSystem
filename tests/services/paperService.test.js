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
    const conference = new Conference({
      name: 'Test Conference',
      address: 'Test Address',
      startDate: new Date(),
      endDate: new Date(),
      creatorId: new mongoose.Types.ObjectId(),
      attendeeLimit: 100,
      attendeeList: [],
    });
    await conference.save();

    const paperData = {
      creatorId: new mongoose.Types.ObjectId(),
      conferenceId: conference._id,
      title: 'Test Paper',
      abstract: 'Test Abstract',
      keywords: 'test, paper',
    };

    const createdPaper = await PaperService.createPaper(
      paperData.creatorId,
      paperData.conferenceId,
      paperData.title,
      paperData.abstract,
      paperData.keywords
    );

    expect(createdPaper.title).toBe(paperData.title);
    expect(createdPaper.abstract).toBe(paperData.abstract);
    expect(createdPaper.keywords).toBe(paperData.keywords);
    expect(createdPaper.conferenceId).toEqual(paperData.conferenceId);
  });

  it('should return all papers', async () => {
    const conference = new Conference({
      name: 'Test Conference',
      address: 'Test Address',
      startDate: new Date(),
      endDate: new Date(),
      creatorId: new mongoose.Types.ObjectId(),
      attendeeLimit: 100,
      attendeeList: [],
    });
    await conference.save();

    const paperData1 = {
      creatorId: new mongoose.Types.ObjectId(),
      conferenceId: conference._id,
      title: 'Test Paper 1',
      abstract: 'Test Abstract 1',
      keywords: 'test, paper',
    };

    const paperData2 = {
      creatorId: new mongoose.Types.ObjectId(),
      conferenceId: conference._id,
      title: 'Test Paper 2',
      abstract: 'Test Abstract 2',
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

    expect(papers.length).toBe(2);
    expect(papers[0].title).toBe(paperData1.title);
    expect(papers[1].title).toBe(paperData2.title);
  });
});
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

  it('should create a new paper', async () => {
    const conference = new Conference({
      name: 'Test Conference',
      address: 'Test Address',
      startDate: new Date(),
      endDate: new Date(),
      creatorId: 'test-creator-id',
      attendeeLimit: 100,
    });
    await conference.save();

    const paperData = {
      title: 'Test Paper',
      abstract: 'Test Abstract',
      authors: ['Author 1', 'Author 2'],
      conferenceId: conference._id,
    };

    const createdPaper = await PaperService.createPaper(paperData);

    expect(createdPaper.title).toBe(paperData.title);
    expect(createdPaper.abstract).toBe(paperData.abstract);
    expect(createdPaper.authors).toEqual(paperData.authors);
    expect(createdPaper.conferenceId).toEqual(paperData.conferenceId);
  });

  it('should return all papers', async () => {
    const conference = new Conference({
      name: 'Test Conference',
      address: 'Test Address',
      startDate: new Date(),
      endDate: new Date(),
      creatorId: 'test-creator-id',
      attendeeLimit: 100,
    });
    await conference.save();

    const paper1 = new Paper({
      title: 'Test Paper 1',
      abstract: 'Test Abstract 1',
      authors: ['Author 1', 'Author 2'],
      conferenceId: conference._id,
    });
    await paper1.save();

    const paper2 = new Paper({
      title: 'Test Paper 2',
      abstract: 'Test Abstract 2',
      authors: ['Author 3', 'Author 4'],
      conferenceId: conference._id,
    });
    await paper2.save();

    const papers = await PaperService.getAllPapers();

    expect(papers.length).toBe(2);
    expect(papers[0].title).toBe(paper1.title);
    expect(papers[1].title).toBe(paper2.title);
  });
});
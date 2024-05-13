const mongoose = require('mongoose');
const Paper = require('../model/paper');
const User = require('../model/user');
const Conference = require('../model/conference');
const PaperService = require('../service/paperService');

describe('Paper Service', () => {
  let author, reviewer, attendee, conference;

  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost/testdb', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Create test users
    author = new User({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      isSystemAdmin: false
    });
    await author.save();

    reviewer = new User({
      name: 'Jane Smith',
      email: 'jane@example.com',
      password: 'password456',
      isSystemAdmin: false
    });
    await reviewer.save();

    attendee = new User({
      name: 'Alice Johnson',
      email: 'alice@example.com',
      password: 'password789',
      isSystemAdmin: false
    });
    await attendee.save();

    // Create test conference
    conference = new Conference({
      name: 'Test Conference2',
      address: 'Test Address',
      startDate: new Date(),
      endDate: new Date(),
      creatorId: new mongoose.Types.ObjectId(),
      attendeeList: new Map([
        [author._id, 3], // Author role
        [reviewer._id, 2], // Reviewer role
        [attendee._id, 1], // Attendee role
      ]),
      attendeeLimit: 100,
    });
    await conference.save();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await Paper.deleteMany();
  });

  it('should create a new paper', async () => {
    const paperData = {
      title: 'Test Paper',
      abstract: 'This is a test paper',
      keywords: 'test, paper',
      authorId: author._id,
      conferenceId: conference._id, // Use the existing conference ID
    };
  
    const createdPaper = await PaperService.createPaper(
      paperData.title,
      paperData.abstract,
      paperData.keywords,
      paperData.authorId,
      paperData.conferenceId
    );
  
    expect(createdPaper.title).toBe(paperData.title);
    expect(createdPaper.abstract).toBe(paperData.abstract);
    expect(createdPaper.keywords).toBe(paperData.keywords);
    expect(createdPaper.authorId).toEqual(paperData.authorId);
    expect(createdPaper.conferenceId).toEqual(paperData.conferenceId);
  });

  it('should return all papers', async () => {
    const paperData1 = {
      title: 'Test Paper 1',
      abstract: 'This is test paper 1',
      keywords: 'test, paper',
      authorId: author._id,
      conferenceId: conference._id, // Use the existing conference ID
    };
  
    const paperData2 = {
      title: 'Test Paper 2',
      abstract: 'This is test paper 2',
      keywords: 'test, paper',
      authorId: author._id,
      conferenceId: conference._id, // Use the existing conference ID
    };

    await PaperService.createPaper(
      paperData1.title,
      paperData1.abstract,
      paperData1.keywords,
      paperData1.authorId,
      paperData1.conferenceId
    );

    await PaperService.createPaper(
      paperData2.title,
      paperData2.abstract,
      paperData2.keywords,
      paperData2.authorId,
      paperData2.conferenceId
    );

    const papers = await PaperService.getPapers();

    expect(papers.length).toBe(2);
    expect(papers[0].title).toBe(paperData1.title);
    expect(papers[1].title).toBe(paperData2.title);
  });
});
require("dotenv").config();
const mongoose = require("mongoose");
const Paper = require("../../models/paper");

describe("Paper Model", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should create a new paper", async () => {
    const paperData = {
      creatorId: new mongoose.Types.ObjectId(),
      conferenceId: new mongoose.Types.ObjectId(),
      title: "Test Paper",
      abstract: "This is a test paper abstract",
      keywords: "test, paper, abstract",
    };

    const paper = new Paper(paperData);
    const savedPaper = await paper.save();

    expect(savedPaper._id).toBeDefined();
    expect(savedPaper.creatorId).toBe(paperData.creatorId);
    expect(savedPaper.conferenceId).toBe(paperData.conferenceId);
    expect(savedPaper.title).toBe(paperData.title);
    expect(savedPaper.abstract).toBe(paperData.abstract);
    expect(savedPaper.keywords).toBe(paperData.keywords);
  });

  it("should not create a paper without required fields", async () => {
    const paper = new Paper();

    let err;
    try {
      await paper.save();
    } catch (error) {
      err = error;
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.creatorId).toBeDefined();
    expect(err.errors.conferenceId).toBeDefined();
    expect(err.errors.title).toBeDefined();
    expect(err.errors.abstract).toBeDefined();
    expect(err.errors.keywords).toBeDefined();
  });
});

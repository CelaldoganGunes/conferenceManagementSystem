const mongoose = require('mongoose');
const User = require('../model/user');
const userService = require('../service/userService');

describe('User Service', () => {
  let createdUser;

  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost/testdb', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await User.deleteMany();

    const userData = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      isSystemAdmin: false,
    };

    createdUser = await userService.createUser(
      userData.name,
      userData.email,
      userData.password,
      userData.isSystemAdmin
    );
  });

  it('should create a new user', () => {
    expect(createdUser.name).toBe('John Doe');
    expect(createdUser.email).toBe('john@example.com');
    expect(createdUser.isSystemAdmin).toBe(false);
  });

  
  it('should return all users', async () => {
    const users = await userService.getUsers();

    expect(users.length).toBe(1);
    expect(users[0].name).toBe('John Doe');
  });

  it('should login user with correct credentials', async () => {
    const loggedInUser = await userService.login('john@example.com', 'password123');

    expect(loggedInUser).not.toBeNull();
    expect(loggedInUser.email).toBe('john@example.com');
  });

  it('should return null when login with incorrect credentials', async () => {
    const loggedInUser = await userService.login('john@example.com', 'wrongpassword');

    expect(loggedInUser).toBeNull();
  });

  it('should return null when creating a user with existing email', async () => {
    const duplicateUser = await userService.createUser(
      'Jane Smith',
      'john@example.com',
      'password456',
      true
    );

    expect(duplicateUser).toBeNull();
  });

  // Diğer test senaryolarını buraya ekleyebilirsiniz
});
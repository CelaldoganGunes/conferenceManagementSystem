const mongoose = require('mongoose');
const User = require('../model/user');
const userService = require('../service/userService');

describe('User Service', () => {
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
  });

  it('should create a new user', async () => {
    const userData = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      isSystemAdmin: false,
    };

    const createdUser = await userService.createUser(
      userData.name,
      userData.email,
      userData.password,
      userData.isSystemAdmin
    );

    expect(createdUser.name).toBe(userData.name);
    expect(createdUser.email).toBe(userData.email);
    expect(createdUser.isSystemAdmin).toBe(userData.isSystemAdmin);
  });

  it('should return null when creating a user with existing email', async () => {
    const userData = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      isSystemAdmin: false,
    };

    await userService.createUser(
      userData.name,
      userData.email,
      userData.password,
      userData.isSystemAdmin
    );

    const duplicateUser = await userService.createUser(
      userData.name,
      userData.email,
      userData.password,
      userData.isSystemAdmin
    );

    expect(duplicateUser).toBeNull();
  });

  
  it('should return all users', async () => {
    const user1 = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      isSystemAdmin: false,
    };

    const user2 = {
      name: 'Jane Smith',
      email: 'jane@example.com',
      password: 'password456',
      isSystemAdmin: true,
    };

    await userService.createUser(
      user1.name,
      user1.email,
      user1.password,
      user1.isSystemAdmin
    );

    await userService.createUser(
      user2.name,
      user2.email,
      user2.password,
      user2.isSystemAdmin
    );

    const users = await userService.getUsers();

    expect(users.length).toBe(2);
    expect(users[0].name).toBe(user1.name);
    expect(users[1].name).toBe(user2.name);
  });

  it('should login user with correct credentials', async () => {
    const userData = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      isSystemAdmin: false,
    };

    await userService.createUser(
      userData.name,
      userData.email,
      userData.password,
      userData.isSystemAdmin
    );

    const loggedInUser = await userService.login(userData.email, userData.password);

    expect(loggedInUser).not.toBeNull();
    expect(loggedInUser.email).toBe(userData.email);
  });

  it('should return null when login with incorrect credentials', async () => {
    const userData = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      isSystemAdmin: false,
    };

    await userService.createUser(
      userData.name,
      userData.email,
      userData.password,
      userData.isSystemAdmin
    );

    const loggedInUser = await userService.login(userData.email, 'wrongpassword');

    expect(loggedInUser).toBeNull();
  });

  it('should create multiple users', async () => {
    const users = [
      {
        name: 'User 1',
        email: 'user1@example.com',
        password: 'password1',
        isSystemAdmin: false
      },
      {
        name: 'User 2',
        email: 'user2@example.com',
        password: 'password2',
        isSystemAdmin: false
      },
      {
        name: 'User 3',
        email: 'user3@example.com',
        password: 'password3',
        isSystemAdmin: false
      },
      {
        name: 'User 4',
        email: 'user4@example.com',
        password: 'password4',
        isSystemAdmin: false
      },
    ];

    for (const userData of users) {
      await userService.createUser(
        userData.name,
        userData.email,
        userData.password,
        userData.isSystemAdmin
      );
    }

    const createdUsers = await userService.getUsers();

    expect(createdUsers.length).toBe(users.length);
    expect(createdUsers[0].name).toBe(users[0].name);
    expect(createdUsers[1].name).toBe(users[1].name);
    expect(createdUsers[2].name).toBe(users[2].name);
    expect(createdUsers[3].name).toBe(users[3].name);
  });
});
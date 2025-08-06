const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');
const User = require('../src/models/user.model');
const Client = require('../src/models/client.model');
const jwt = require('jsonwebtoken');

let adminToken;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await User.deleteMany();
  await Client.deleteMany();

  const adminUser = await User.create({
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'password123',
    role: 'admin',
  });

  adminToken = jwt.sign({ id: adminUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('POST /api/clients', () => {
  it('should create a new client when user is admin', async () => {
    const res = await request(app)
      .post('/api/clients')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Test Client',
        email: 'client@example.com',
        phone: '1234567890'
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body.name).toBe('Test Client');
  });

  it('should not allow non-admin to create client', async () => {
    const normalUser = await User.create({
      name: 'Normal User',
      email: 'user@example.com',
      password: 'password123',
      role: 'user'
    });

    const userToken = jwt.sign({ id: normalUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    const res = await request(app)
      .post('/api/clients')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        name: 'Unauthorized Client',
        email: 'unauth@example.com'
      });

    expect(res.statusCode).toEqual(403);
  });
});

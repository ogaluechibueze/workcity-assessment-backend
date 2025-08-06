const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');
const User = require('../src/models/user.model');
const Client = require('../src/models/client.model');
const Project = require('../src/models/project.model');
const jwt = require('jsonwebtoken');

let adminToken;
let projectId;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await User.deleteMany();
  await Client.deleteMany();
  await Project.deleteMany();

  const adminUser = await User.create({
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'password123',
    role: 'admin',
  });

  adminToken = jwt.sign({ id: adminUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

  const client = await Client.create({
    name: 'Client For Project',
    email: 'clientp@example.com'
  });

  const project = await Project.create({
    title: 'Initial Project',
    description: 'First project description',
    status: 'pending',
    client: client._id
  });

  projectId = project._id;
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('PUT /api/projects/:id', () => {
  it('should update project successfully when admin', async () => {
    const res = await request(app)
      .put(`/api/projects/${projectId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        title: 'Updated Project',
        status: 'in-progress'
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.title).toBe('Updated Project');
    expect(res.body.status).toBe('in-progress');
  });

  it('should return 404 for non-existent project', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app)
      .put(`/api/projects/${fakeId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ title: 'Not Found Project' });

    expect(res.statusCode).toEqual(404);
  });
});

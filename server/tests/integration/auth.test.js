const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../../src/app');
const User = require('../../src/models/User');

let mongoServer;

beforeAll(async () => {
	mongoServer = await MongoMemoryServer.create();
	const uri = mongoServer.getUri();
	await mongoose.connect(uri);
	process.env.JWT_SECRET = 'integration-secret';
});

afterAll(async () => {
	await mongoose.disconnect();
	await mongoServer.stop();
});

afterEach(async () => {
	await User.deleteMany({});
});

describe('Auth routes', () => {
	const registerPayload = {
		username: 'newuser',
		email: 'new@example.com',
		password: 'Password1'
	};

	it('registers a user and returns token', async () => {
		const res = await request(app).post('/api/auth/register').send(registerPayload);

		expect(res.status).toBe(201);
		expect(res.body.user).toMatchObject({
			username: registerPayload.username,
			email: registerPayload.email
		});
		expect(res.body).toHaveProperty('token');
	});

	it('prevents duplicate registration', async () => {
		await request(app).post('/api/auth/register').send(registerPayload);
		const res = await request(app).post('/api/auth/register').send(registerPayload);

		expect(res.status).toBe(409);
		expect(res.body.error).toBe('User already exists');
	});

	it('allows user to login', async () => {
		await request(app).post('/api/auth/register').send(registerPayload);
		const res = await request(app)
			.post('/api/auth/login')
			.send({ email: registerPayload.email, password: registerPayload.password });

		expect(res.status).toBe(200);
		expect(res.body.user.email).toBe(registerPayload.email);
		expect(res.body).toHaveProperty('token');
	});

	it('rejects invalid credentials', async () => {
		await request(app).post('/api/auth/register').send(registerPayload);
		const res = await request(app)
			.post('/api/auth/login')
			.send({ email: registerPayload.email, password: 'WrongPass1' });

		expect(res.status).toBe(401);
	});

	it('returns user profile when authenticated', async () => {
		const registerRes = await request(app).post('/api/auth/register').send(registerPayload);
		const token = registerRes.body.token;

		const profileRes = await request(app)
			.get('/api/auth/profile')
			.set('Authorization', `Bearer ${token}`);

		expect(profileRes.status).toBe(200);
		expect(profileRes.body.email).toBe(registerPayload.email);
	});
});



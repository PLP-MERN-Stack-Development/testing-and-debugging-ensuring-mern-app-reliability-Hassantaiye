const jwt = require('jsonwebtoken');
const { generateToken } = require('../../../src/utils/auth');

describe('generateToken', () => {
	beforeAll(() => {
		process.env.JWT_SECRET = 'unit-test-secret';
	});

	it('throws when user is missing', () => {
		expect(() => generateToken(null)).toThrow('User is required to generate a token');
	});

	it('returns a signed JWT containing user id and email', () => {
		const user = { _id: '507f1f77bcf86cd799439011', email: 'test@example.com' };
		const token = generateToken(user);

		expect(typeof token).toBe('string');

		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		expect(decoded.id).toBe(user._id);
		expect(decoded.email).toBe(user.email);
	});
});



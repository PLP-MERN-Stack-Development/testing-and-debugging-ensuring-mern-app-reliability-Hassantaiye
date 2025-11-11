const jwt = require('jsonwebtoken');
const User = require('../../../src/models/User');
const { protect } = require('../../../src/middleware/auth');

jest.mock('jsonwebtoken');
jest.mock('../../../src/models/User');

describe('protect middleware', () => {
	const next = jest.fn();
	const res = {};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('calls next with error when Authorization header is missing', async () => {
		const req = { headers: {} };

		await protect(req, res, next);

		expect(next).toHaveBeenCalledTimes(1);
		const error = next.mock.calls[0][0];
		expect(error.status).toBe(401);
	});

	it('attaches user to request when token is valid', async () => {
		const req = { headers: { authorization: 'Bearer token123' } };
		const user = { _id: '1', role: 'user', email: 'test@example.com' };

		jwt.verify.mockReturnValue({ id: '1' });
		User.findById.mockResolvedValue(user);

		await protect(req, res, next);

		expect(jwt.verify).toHaveBeenCalledWith('token123', process.env.JWT_SECRET);
		expect(User.findById).toHaveBeenCalledWith('1');
		expect(req.user).toEqual({ _id: user._id, role: user.role, email: user.email });
		expect(next).toHaveBeenCalledWith();
	});

	it('calls next with error when user is not found', async () => {
		const req = { headers: { authorization: 'Bearer token123' } };
		jwt.verify.mockReturnValue({ id: 'missing' });
		User.findById.mockResolvedValue(null);

		await protect(req, res, next);

		const error = next.mock.calls[0][0];
		expect(error.status).toBe(401);
		expect(error.message).toBe('User not found');
	});

	it('flags token errors as 401', async () => {
		const req = { headers: { authorization: 'Bearer badtoken' } };
		const tokenError = new Error('invalid token');
		tokenError.name = 'JsonWebTokenError';
		jwt.verify.mockImplementation(() => {
			throw tokenError;
		});

		await protect(req, res, next);

		const error = next.mock.calls[0][0];
		expect(error.status).toBe(401);
		expect(error.message).toBe('Invalid token');
	});
});



const httpMocks = require('node-mocks-http');
const { errorHandler, notFoundHandler } = require('../../../src/middleware/errorHandler');

describe('error handlers', () => {
	it('responds with provided status and message', () => {
		const req = httpMocks.createRequest();
		const res = httpMocks.createResponse();
		const error = new Error('Custom error');
		error.status = 418;

		errorHandler(error, req, res);

		expect(res.statusCode).toBe(418);
		const data = res._getJSONData();
		expect(data.error).toBe('Custom error');
	});

	it('includes stack trace when not in production', () => {
		process.env.NODE_ENV = 'test';
		const req = httpMocks.createRequest();
		const res = httpMocks.createResponse();
		const error = new Error('Debug error');

		errorHandler(error, req, res);

		expect(res._getJSONData().stack).toBeDefined();
	});

	it('handles 404 via notFoundHandler', () => {
		const req = httpMocks.createRequest();
		const res = httpMocks.createResponse();

		notFoundHandler(req, res);

		expect(res.statusCode).toBe(404);
		expect(res._getJSONData()).toEqual({ error: 'Not Found' });
	});
});



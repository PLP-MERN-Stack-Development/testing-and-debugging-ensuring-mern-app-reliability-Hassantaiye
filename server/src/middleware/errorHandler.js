function errorHandler(err, req, res, next) {
	const status = err.status || err.statusCode || 500;
	const message = err.message || 'Internal Server Error';
	const response = { error: message };

	if (process.env.NODE_ENV !== 'production' && err.stack) {
		response.stack = err.stack;
	}

	res.status(status).json(response);
}

function notFoundHandler(req, res, next) {
	res.status(404).json({ error: 'Not Found' });
}

module.exports = { errorHandler, notFoundHandler };



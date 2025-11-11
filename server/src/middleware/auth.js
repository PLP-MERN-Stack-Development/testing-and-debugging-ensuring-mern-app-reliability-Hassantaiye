const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function protect(req, res, next) {
	try {
		const authHeader = req.headers.authorization;
		if (!authHeader || !authHeader.startsWith('Bearer ')) {
			const error = new Error('Not authorized');
			error.status = 401;
			throw error;
		}

		const token = authHeader.split(' ')[1];
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		const user = await User.findById(decoded.id);
		if (!user) {
			const error = new Error('User not found');
			error.status = 401;
			throw error;
		}

		req.user = { _id: user._id, role: user.role, email: user.email };
		next();
	} catch (error) {
		if (error.name === 'TokenExpiredError' || error.name === 'JsonWebTokenError') {
			error.status = 401;
			error.message = 'Invalid token';
		}
		next(error);
	}
}

module.exports = { protect };



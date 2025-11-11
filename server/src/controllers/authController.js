const User = require('../models/User');
const { generateToken } = require('../utils/auth');
const { isValidEmail, isStrongPassword } = require('../utils/validators');

async function register(req, res, next) {
	try {
		const { username, email, password } = req.body;
		if (!username || !email || !password) {
			const error = new Error('All fields are required');
			error.status = 400;
			throw error;
		}

		if (!isValidEmail(email)) {
			const error = new Error('Invalid email format');
			error.status = 400;
			throw error;
		}

		if (!isStrongPassword(password)) {
			const error = new Error('Password must be at least 8 characters and include numbers and letters');
			error.status = 400;
			throw error;
		}

		const existing = await User.findOne({ email });
		if (existing) {
			const error = new Error('User already exists');
			error.status = 409;
			throw error;
		}

		const user = await User.create({ username, email, password });
		const token = generateToken(user);

		res.status(201).json({
			user: {
				id: user._id.toString(),
				username: user.username,
				email: user.email
			},
			token
		});
	} catch (error) {
		next(error);
	}
}

async function login(req, res, next) {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			const error = new Error('Email and password are required');
			error.status = 400;
			throw error;
		}

		const user = await User.findOne({ email });
		if (!user) {
			const error = new Error('Invalid credentials');
			error.status = 401;
			throw error;
		}

		const isMatch = await user.matchPassword(password);
		if (!isMatch) {
			const error = new Error('Invalid credentials');
			error.status = 401;
			throw error;
		}

		const token = generateToken(user);
		res.status(200).json({
			user: {
				id: user._id.toString(),
				username: user.username,
				email: user.email
			},
			token
		});
	} catch (error) {
		next(error);
	}
}

async function getProfile(req, res, next) {
	try {
		const user = await User.findById(req.user._id).select('-password');
		if (!user) {
			const error = new Error('User not found');
			error.status = 404;
			throw error;
		}

		res.status(200).json({
			id: user._id.toString(),
			username: user.username,
			email: user.email,
			role: user.role
		});
	} catch (error) {
		next(error);
	}
}

module.exports = { register, login, getProfile };



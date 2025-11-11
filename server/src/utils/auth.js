const jwt = require('jsonwebtoken');

function generateToken(user) {
	if (!user || !user._id) {
		throw new Error('User is required to generate a token');
	}

	return jwt.sign(
		{
			id: user._id.toString(),
			email: user.email
		},
		process.env.JWT_SECRET,
		{ expiresIn: '1h' }
	);
}

module.exports = { generateToken };



const emailRegex =
	/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/i;

function isValidEmail(email) {
	if (typeof email !== 'string') return false;
	return emailRegex.test(email.trim());
}

function isStrongPassword(password) {
	if (typeof password !== 'string') return false;
	return password.length >= 8 && /[a-z]/i.test(password) && /\d/.test(password);
}

module.exports = { isValidEmail, isStrongPassword };



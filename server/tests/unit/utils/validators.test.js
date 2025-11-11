const { isValidEmail, isStrongPassword } = require('../../../src/utils/validators');

describe('validators', () => {
	describe('isValidEmail', () => {
		it('returns true for valid email', () => {
			expect(isValidEmail('example@test.com')).toBe(true);
		});

		it('returns false for invalid email', () => {
			expect(isValidEmail('invalid-email')).toBe(false);
			expect(isValidEmail(null)).toBe(false);
		});
	});

	describe('isStrongPassword', () => {
		it('returns true for strong password', () => {
			expect(isStrongPassword('Password1')).toBe(true);
		});

		it('returns false for short or missing number', () => {
			expect(isStrongPassword('short')).toBe(false);
			expect(isStrongPassword('longbutnodigits')).toBe(false);
		});
	});
});



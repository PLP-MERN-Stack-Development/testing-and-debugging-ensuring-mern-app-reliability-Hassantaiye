import { formatDate } from '../../../utils/formatDate';

describe('formatDate utility', () => {
	it('formats ISO date strings', () => {
		const result = formatDate('2024-01-15T00:00:00.000Z');
		expect(result).toBe('Jan 15, 2024');
	});

	it('returns empty string for invalid input', () => {
		expect(formatDate('invalid')).toBe('');
		expect(formatDate(null)).toBe('');
	});
});



import reducer, { loginFailure, loginStart, loginSuccess, logout } from '../../../store/authSlice';

const initialState = {
	user: null,
	token: null,
	status: 'idle',
	error: null
};

describe('authSlice', () => {
	it('handles login lifecycle', () => {
		let state = reducer(initialState, loginStart());
		expect(state.status).toBe('loading');

		state = reducer(
			state,
			loginSuccess({ user: { id: '1', email: 'user@example.com' }, token: 'abc' })
		);
		expect(state.status).toBe('succeeded');
		expect(state.user).toEqual({ id: '1', email: 'user@example.com' });
		expect(state.token).toBe('abc');
	});

	it('handles login failure', () => {
		const error = 'Invalid credentials';
		const state = reducer(initialState, loginFailure(error));
		expect(state.status).toBe('failed');
		expect(state.error).toBe(error);
	});

	it('handles logout', () => {
		const state = reducer(
			{ ...initialState, user: { id: '1' }, token: 'abc', status: 'succeeded' },
			logout()
		);
		expect(state.user).toBeNull();
		expect(state.token).toBeNull();
		expect(state.status).toBe('idle');
	});
});



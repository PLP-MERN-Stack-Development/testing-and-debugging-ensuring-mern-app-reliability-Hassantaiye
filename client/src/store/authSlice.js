import { createSlice } from '@reduxjs/toolkit';

// Load initial state from localStorage
const loadAuthFromStorage = () => {
	try {
		const token = localStorage.getItem('token');
		const user = localStorage.getItem('user');
		if (token && user) {
			return {
				user: JSON.parse(user),
				token,
				status: 'succeeded',
				error: null
			};
		}
	} catch (err) {
		console.error('Failed to load auth from storage:', err);
	}
	return {
		user: null,
		token: null,
		status: 'idle',
		error: null
	};
};

const initialState = loadAuthFromStorage();

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		loginStart(state) {
			state.status = 'loading';
			state.error = null;
		},
		loginSuccess(state, action) {
			state.status = 'succeeded';
			state.user = action.payload.user;
			state.token = action.payload.token;
			// Persist to localStorage
			localStorage.setItem('token', action.payload.token);
			localStorage.setItem('user', JSON.stringify(action.payload.user));
		},
		loginFailure(state, action) {
			state.status = 'failed';
			state.error = action.payload;
		},
		logout(state) {
			state.user = null;
			state.token = null;
			state.status = 'idle';
			// Clear localStorage
			localStorage.removeItem('token');
			localStorage.removeItem('user');
		}
	}
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;


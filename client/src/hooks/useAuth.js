import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginFailure, loginStart, loginSuccess, logout } from '../store/authSlice';
import { apiRequest } from '../utils/api';

export function useAuth() {
	const dispatch = useDispatch();
	const { user, status, error, token } = useSelector((state) => state.auth);

	const login = useCallback(
		async (credentials) => {
			try {
				dispatch(loginStart());
				const response = await apiRequest('/api/auth/login', {
					method: 'POST',
					body: JSON.stringify(credentials)
				});
				dispatch(loginSuccess(response));
				return response;
			} catch (err) {
				dispatch(loginFailure(err.message || 'Login failed'));
				throw err;
			}
		},
		[dispatch]
	);

	const logoutUser = useCallback(() => {
		dispatch(logout());
	}, [dispatch]);

	return {
		user,
		status,
		error,
		token,
		login,
		logout: logoutUser
	};
}



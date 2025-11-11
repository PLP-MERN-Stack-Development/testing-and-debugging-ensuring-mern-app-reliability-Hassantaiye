import { act } from '@testing-library/react';
import { renderHookWithProviders } from '../../utils/renderWithProviders';
import { useAuth } from '../../../hooks/useAuth';
import { server } from '../../mocks/server';
import { http, HttpResponse } from 'msw';

describe('useAuth hook', () => {
	it('logs in successfully', async () => {
		const { result } = renderHookWithProviders(() => useAuth());

		await act(async () => {
			await result.current.login({ email: 'user@example.com', password: 'Password1' });
		});

		expect(result.current.user).toMatchObject({ email: 'user@example.com' });
		expect(result.current.status).toBe('succeeded');
	});

	it('handles login failure', async () => {
		server.use(
			http.post('http://localhost:5000/api/auth/login', () =>
				new HttpResponse(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 })
			)
		);

		const { result } = renderHookWithProviders(() => useAuth());

		await act(async () => {
			await expect(
				result.current.login({ email: 'bad@example.com', password: 'wrong' })
			).rejects.toThrow('Invalid credentials');
		});

		expect(result.current.error).toBe('Invalid credentials');
		expect(result.current.status).toBe('failed');
	});

	it('logs out', async () => {
		const { result } = renderHookWithProviders(() => useAuth());

		await act(async () => {
			await result.current.login({ email: 'user@example.com', password: 'Password1' });
		});

		act(() => {
			result.current.logout();
		});

		expect(result.current.user).toBeNull();
	});
});



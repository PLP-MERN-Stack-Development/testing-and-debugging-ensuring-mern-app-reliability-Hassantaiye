import { fireEvent, screen, waitFor } from '@testing-library/react';
import LoginForm from '../../components/LoginForm';
import { renderWithProviders } from '../utils/renderWithProviders';

describe('LoginForm integration', () => {
	it('shows validation error when fields are empty', async () => {
		renderWithProviders(<LoginForm />);

		fireEvent.submit(screen.getByRole('button', { name: /login/i }));

		expect(await screen.findByText(/required/i)).toBeInTheDocument();
	});

	it('logs in and calls onSuccess', async () => {
		const onSuccess = jest.fn();
		renderWithProviders(<LoginForm onSuccess={onSuccess} />);

		fireEvent.change(screen.getByLabelText(/email/i), {
			target: { value: 'user@example.com' }
		});
		fireEvent.change(screen.getByLabelText(/password/i), {
			target: { value: 'Password1' }
		});

		fireEvent.submit(screen.getByRole('button', { name: /login/i }));

		await waitFor(() => expect(onSuccess).toHaveBeenCalled());
		expect(screen.queryByText(/invalid credentials/i)).not.toBeInTheDocument();
	});
});



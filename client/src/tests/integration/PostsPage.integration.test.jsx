import { fireEvent, screen, waitFor } from '@testing-library/react';
import PostsPage from '../../pages/PostsPage';
import { renderWithProviders } from '../utils/renderWithProviders';

describe('PostsPage integration', () => {
	it('validates form inputs', async () => {
		renderWithProviders(<PostsPage />);

		fireEvent.submit(screen.getByRole('button', { name: /create post/i }));

		expect(await screen.findByText(/title is required/i)).toBeInTheDocument();
	});

	it('creates a post and renders it in the list', async () => {
		renderWithProviders(<PostsPage />);

		fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'Integration Post' } });
		fireEvent.change(screen.getByLabelText(/content/i), { target: { value: 'Content body' } });
		fireEvent.change(screen.getByLabelText(/category/i), { target: { value: 'testing' } });

		fireEvent.submit(screen.getByRole('button', { name: /create post/i }));

		await waitFor(() => {
			expect(screen.getByText(/integration post/i)).toBeInTheDocument();
		});
	});
});



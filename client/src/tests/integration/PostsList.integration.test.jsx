import { screen, waitFor } from '@testing-library/react';
import PostsList from '../../components/PostsList';
import { renderWithProviders } from '../utils/renderWithProviders';

describe('PostsList integration', () => {
	it('fetches and renders posts from API', async () => {
		renderWithProviders(<PostsList />);

		expect(screen.getByText(/loading posts/i)).toBeInTheDocument();

		await waitFor(() => {
			expect(screen.getByText(/testing strategies/i)).toBeInTheDocument();
		});
	});
});



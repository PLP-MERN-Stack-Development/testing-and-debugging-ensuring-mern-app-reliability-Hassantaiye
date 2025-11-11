import { act } from '@testing-library/react';
import { renderHookWithProviders } from '../../utils/renderWithProviders';
import { usePosts } from '../../../hooks/usePosts';

describe('usePosts hook', () => {
	it('loads posts successfully', async () => {
		const { result } = renderHookWithProviders(() => usePosts());

		await act(async () => {
			await result.current.loadPosts();
		});

		expect(result.current.items.length).toBeGreaterThan(0);
		expect(result.current.status).toBe('succeeded');
	});

	it('creates a new post', async () => {
		const { result } = renderHookWithProviders(() => usePosts());

		await act(async () => {
			await result.current.createPost({
				title: 'New Post',
				content: 'Content body',
				category: 'general'
			});
		});

		expect(result.current.items[0].title).toBe('New Post');
	});
});



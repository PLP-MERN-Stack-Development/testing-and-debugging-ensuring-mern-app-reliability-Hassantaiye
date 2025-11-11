import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	addPost,
	fetchPostsFailure,
	fetchPostsStart,
	fetchPostsSuccess
} from '../store/postsSlice';
import { apiRequest } from '../utils/api';

export function usePosts() {
	const dispatch = useDispatch();
	const { items, status, error } = useSelector((state) => state.posts);
	const token = useSelector((state) => state.auth.token);

	const loadPosts = useCallback(
		async (params = {}) => {
			const query = new URLSearchParams(params).toString();
			const url = query ? `/api/posts?${query}` : '/api/posts';
			try {
				dispatch(fetchPostsStart());
				const data = await apiRequest(url, {
					headers: token ? { Authorization: `Bearer ${token}` } : undefined
				});
				dispatch(fetchPostsSuccess(data));
				return data;
			} catch (err) {
				dispatch(fetchPostsFailure(err.message || 'Failed to load posts'));
				throw err;
			}
		},
		[dispatch]
	);

	const createPost = useCallback(
		async (payload) => {
			try {
				// Debug: log what we're sending
				if (process.env.NODE_ENV !== 'production') {
					// eslint-disable-next-line no-console
					console.log('Sending post data:', payload);
				}
				
				const data = await apiRequest('/api/posts', {
					method: 'POST',
					body: JSON.stringify(payload),
					headers: token ? { Authorization: `Bearer ${token}` } : undefined
				});
				dispatch(addPost(data));
				return data;
			} catch (err) {
				// eslint-disable-next-line no-console
				console.error('Error creating post:', err);
				throw err;
			}
		},
		[dispatch, token]
	);

	return {
		items,
		status,
		error,
		loadPosts,
		createPost
	};
}



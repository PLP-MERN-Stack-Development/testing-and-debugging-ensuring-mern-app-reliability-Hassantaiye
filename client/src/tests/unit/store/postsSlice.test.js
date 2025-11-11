import reducer, {
	addPost,
	deletePost,
	fetchPostsFailure,
	fetchPostsStart,
	fetchPostsSuccess,
	updatePost
} from '../../../store/postsSlice';

const initialState = {
	items: [],
	status: 'idle',
	error: null
};

describe('postsSlice', () => {
	it('handles fetch lifecycle', () => {
		let state = reducer(initialState, fetchPostsStart());
		expect(state.status).toBe('loading');

		const posts = [{ _id: '1', title: 'Post' }];
		state = reducer(state, fetchPostsSuccess(posts));
		expect(state.status).toBe('succeeded');
		expect(state.items).toEqual(posts);

		state = reducer(state, fetchPostsFailure('Oops'));
		expect(state.status).toBe('failed');
		expect(state.error).toBe('Oops');
	});

	it('adds, updates, and deletes posts', () => {
		let state = reducer(initialState, addPost({ _id: '1', title: 'New', content: 'Content' }));
		expect(state.items).toHaveLength(1);

		state = reducer(
			state,
			updatePost({ _id: '1', title: 'Updated', content: 'Updated content' })
		);
		expect(state.items[0].title).toBe('Updated');

		state = reducer(state, deletePost('1'));
		expect(state.items).toHaveLength(0);
	});
});



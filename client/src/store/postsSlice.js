import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	items: [],
	status: 'idle',
	error: null
};

const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		fetchPostsStart(state) {
			state.status = 'loading';
			state.error = null;
		},
		fetchPostsSuccess(state, action) {
			state.status = 'succeeded';
			state.items = action.payload;
		},
		fetchPostsFailure(state, action) {
			state.status = 'failed';
			state.error = action.payload;
		},
		addPost(state, action) {
			state.items.unshift(action.payload);
		},
		updatePost(state, action) {
			const index = state.items.findIndex((item) => item._id === action.payload._id);
			if (index !== -1) {
				state.items[index] = action.payload;
			}
		},
		deletePost(state, action) {
			state.items = state.items.filter((item) => item._id !== action.payload);
		}
	}
});

export const {
	fetchPostsStart,
	fetchPostsSuccess,
	fetchPostsFailure,
	addPost,
	updatePost,
	deletePost
} = postsSlice.actions;

export default postsSlice.reducer;



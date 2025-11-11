import React from 'react';
import PostForm from '../components/PostForm';
import PostsList from '../components/PostsList';

export default function PostsPage() {
	return (
		<div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
			<PostForm />
			<div className="space-y-4">
				<h2 className="text-xl font-semibold">Recent Posts</h2>
				<PostsList />
			</div>
		</div>
	);
}



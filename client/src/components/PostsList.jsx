import React, { useEffect } from 'react';
import { usePosts } from '../hooks/usePosts';
import { formatDate } from '../utils/formatDate';

export default function PostsList() {
	const { items, status, error, loadPosts } = usePosts();

	useEffect(() => {
		loadPosts().catch(() => {});
	}, [loadPosts]);

	if (status === 'loading') {
		return <p>Loading posts...</p>;
	}

	if (error) {
		return <p className="text-red-600">Error: {error}</p>;
	}

	if (!items.length) {
		return <p>No posts found.</p>;
	}

	return (
		<ul className="space-y-4">
			{items.map((post) => (
				<li key={post._id} className="rounded border bg-white p-4 shadow-sm">
					<h3 className="text-lg font-semibold">{post.title}</h3>
					<p className="mt-2 text-gray-700">{post.content}</p>
					<p className="mt-2 text-sm text-gray-500">
						Created {formatDate(post.createdAt || new Date().toISOString())}
					</p>
				</li>
			))}
		</ul>
	);
}



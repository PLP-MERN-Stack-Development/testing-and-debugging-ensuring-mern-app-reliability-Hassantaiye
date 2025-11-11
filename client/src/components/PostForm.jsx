import React, { useState } from 'react';
import Button from './Button';
import { usePosts } from '../hooks/usePosts';

const initialState = {
	title: '',
	content: '',
	category: ''
};

export default function PostForm({ onSuccess }) {
	const [form, setForm] = useState(initialState);
	const [errors, setErrors] = useState({});
	const [submitting, setSubmitting] = useState(false);
	const { createPost } = usePosts();

	const validate = () => {
		const nextErrors = {};
		if (!form.title.trim()) nextErrors.title = 'Title is required';
		if (!form.content.trim()) nextErrors.content = 'Content is required';
		if (!form.category.trim()) nextErrors.category = 'Category is required';
		setErrors(nextErrors);
		return Object.keys(nextErrors).length === 0;
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setErrors({}); // Clear previous errors
		if (!validate()) return;
		setSubmitting(true);
		try {
			// Ensure we're sending the correct data
			const postData = {
				title: form.title.trim(),
				content: form.content.trim(),
				category: form.category.trim()
			};
			await createPost(postData);
			setForm(initialState);
			setErrors({});
			if (onSuccess) onSuccess();
		} catch (err) {
			// Show server error message
			const errorMessage = err.message || 'Failed to create post';
			setErrors({ submit: errorMessage });
			// eslint-disable-next-line no-console
			console.error('Post creation error:', err);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<form className="space-y-4 rounded border bg-white p-4 shadow-sm" onSubmit={handleSubmit}>
			<h2 className="text-xl font-semibold">Create Post</h2>
			<div>
				<label className="block text-sm font-medium text-gray-700" htmlFor="title">
					Title
				</label>
				<input
					id="title"
					name="title"
					type="text"
					className="mt-1 w-full rounded border px-3 py-2"
					value={form.title}
					onChange={handleChange}
				/>
				{errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
			</div>
			<div>
				<label className="block text-sm font-medium text-gray-700" htmlFor="content">
					Content
				</label>
				<textarea
					id="content"
					name="content"
					className="mt-1 w-full rounded border px-3 py-2"
					rows={3}
					value={form.content}
					onChange={handleChange}
				/>
				{errors.content && <p className="mt-1 text-sm text-red-600">{errors.content}</p>}
			</div>
			<div>
				<label className="block text-sm font-medium text-gray-700" htmlFor="category">
					Category
				</label>
				<input
					id="category"
					name="category"
					type="text"
					className="mt-1 w-full rounded border px-3 py-2"
					value={form.category}
					onChange={handleChange}
				/>
				{errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
			</div>
			{errors.submit && <p className="text-sm text-red-600">{errors.submit}</p>}
			<Button type="submit" disabled={submitting}>
				{submitting ? 'Submitting...' : 'Create Post'}
			</Button>
		</form>
	);
}



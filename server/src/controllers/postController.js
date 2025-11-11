const mongoose = require('mongoose');
const Post = require('../models/Post');

const pickPublicFields = (doc) => ({
	_id: doc._id,
	title: doc.title,
	content: doc.content,
	author: doc.author?.toString(),
	category: doc.category?.toString(),
	slug: doc.slug
});

async function createPost(req, res, next) {
	try {
		const { title, content, category } = req.body;
		if (!title || !content || !category) {
			const error = new Error('Title, content, and category are required');
			error.status = 400;
			throw error;
		}

		if (!mongoose.Types.ObjectId.isValid(category)) {
			const error = new Error('Invalid category id');
			error.status = 400;
			throw error;
		}

		const post = await Post.create({
			title,
			content,
			category,
			author: req.user._id,
			slug: Post.generateSlug(title)
		});

		res.status(201).json(pickPublicFields(post));
	} catch (error) {
		next(error);
	}
}

async function getPosts(req, res, next) {
	try {
		const { page = 1, limit = 25, category } = req.query;
		const filter = {};
		if (category && mongoose.Types.ObjectId.isValid(category)) {
			filter.category = category;
		}

		const skip = (Number(page) - 1) * Number(limit);
		const posts = await Post.find(filter).skip(skip).limit(Number(limit)).sort({ createdAt: -1 });

		res.status(200).json(posts.map(pickPublicFields));
	} catch (error) {
		next(error);
	}
}

async function getPostById(req, res, next) {
	try {
		const { id } = req.params;
		if (!mongoose.Types.ObjectId.isValid(id)) {
			const error = new Error('Post not found');
			error.status = 404;
			throw error;
		}

		const post = await Post.findById(id);
		if (!post) {
			const error = new Error('Post not found');
			error.status = 404;
			throw error;
		}

		res.status(200).json(pickPublicFields(post));
	} catch (error) {
		next(error);
	}
}

async function updatePost(req, res, next) {
	try {
		const { id } = req.params;
		if (!mongoose.Types.ObjectId.isValid(id)) {
			const error = new Error('Post not found');
			error.status = 404;
			throw error;
		}

		const post = await Post.findById(id);
		if (!post) {
			const error = new Error('Post not found');
			error.status = 404;
			throw error;
		}

		if (post.author.toString() !== req.user._id.toString()) {
			const error = new Error('Forbidden');
			error.status = 403;
			throw error;
		}

		const { title, content, category } = req.body;

		if (category && !mongoose.Types.ObjectId.isValid(category)) {
			const error = new Error('Invalid category id');
			error.status = 400;
			throw error;
		}

		if (title) {
			post.title = title;
			post.slug = Post.generateSlug(title);
		}
		if (content) {
			post.content = content;
		}
		if (category) {
			post.category = category;
		}

		await post.save();

		res.status(200).json(pickPublicFields(post));
	} catch (error) {
		next(error);
	}
}

async function deletePost(req, res, next) {
	try {
		const { id } = req.params;
		if (!mongoose.Types.ObjectId.isValid(id)) {
			const error = new Error('Post not found');
			error.status = 404;
			throw error;
		}

		const post = await Post.findById(id);
		if (!post) {
			const error = new Error('Post not found');
			error.status = 404;
			throw error;
		}

		if (post.author.toString() !== req.user._id.toString()) {
			const error = new Error('Forbidden');
			error.status = 403;
			throw error;
		}

		await post.deleteOne();

		res.status(200).json({ message: 'Post deleted' });
	} catch (error) {
		next(error);
	}
}

module.exports = {
	createPost,
	getPosts,
	getPostById,
	updatePost,
	deletePost
};



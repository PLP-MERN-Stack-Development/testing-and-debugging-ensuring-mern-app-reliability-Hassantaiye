const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true
		},
		content: {
			type: String,
			required: true
		},
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true
		},
		category: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Category',
			required: true
		},
		slug: {
			type: String,
			required: true,
			unique: true
		}
	},
	{ timestamps: true }
);

postSchema.statics.generateSlug = function generateSlug(title) {
	return title
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-|-$)+/g, '')
		.concat(`-${Date.now()}`);
};

module.exports = mongoose.models.Post || mongoose.model('Post', postSchema);



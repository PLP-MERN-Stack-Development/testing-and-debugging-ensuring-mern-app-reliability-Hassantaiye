require('dotenv').config();
const app = require('./src/app');
const { connectDB } = require('./config/db');

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

async function start() {
	try {
		if (MONGO_URI) {
			await connectDB(MONGO_URI);
			// eslint-disable-next-line no-console
			console.log('Connected to MongoDB');
		} else {
			// eslint-disable-next-line no-console
			console.log('MONGO_URI not set; server starting without DB connection.');
		}
		app.listen(PORT, () => {
			// eslint-disable-next-line no-console
			console.log(`Server running on port ${PORT}`);
		});
	} catch (err) {
		// eslint-disable-next-line no-console
		console.error('Failed to start server', err);
		process.exit(1);
	}
}

start();



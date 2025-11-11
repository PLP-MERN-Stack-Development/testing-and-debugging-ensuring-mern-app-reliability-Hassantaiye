const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const postsRouter = require('./routes/posts');
const authRouter = require('./routes/auth');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');
const logger = require('./middleware/logger');
const performanceMonitor = require('./middleware/performanceMonitor');

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Debug middleware to log parsed body (after express.json())
if (process.env.NODE_ENV !== 'production') {
	app.use((req, res, next) => {
		if ((req.method === 'POST' || req.method === 'PUT') && req.path.includes('/api/')) {
			// eslint-disable-next-line no-console
			console.log(`[${req.method} ${req.path}] Body:`, JSON.stringify(req.body, null, 2));
			// eslint-disable-next-line no-console
			console.log(`[${req.method} ${req.path}] Content-Type:`, req.headers['content-type']);
			// eslint-disable-next-line no-console
			console.log(`[${req.method} ${req.path}] Body keys:`, req.body ? Object.keys(req.body) : 'null/undefined');
		}
		next();
	});
}

app.use(morgan('dev'));
app.use(logger);
app.use(performanceMonitor);

app.use('/api/posts', postsRouter);
app.use('/api/auth', authRouter);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;



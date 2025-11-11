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
app.use(express.json());
app.use(morgan('dev'));
app.use(logger);
app.use(performanceMonitor);

app.use('/api/posts', postsRouter);
app.use('/api/auth', authRouter);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;



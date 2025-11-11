function performanceMonitor(req, res, next) {
	const start = process.hrtime.bigint();
	res.on('finish', () => {
		const end = process.hrtime.bigint();
		const durationMs = Number(end - start) / 1_000_000;
		res.setHeader('X-Response-Time-ms', durationMs.toFixed(2));
		if (durationMs > 500) {
			// eslint-disable-next-line no-console
			console.warn(`Slow request: ${req.method} ${req.originalUrl} - ${durationMs.toFixed(2)}ms`);
		}
	});
	next();
}

module.exports = performanceMonitor;



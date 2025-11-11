function performanceMonitor(req, res, next) {
	const start = process.hrtime.bigint();
	
	// Monitor performance after response is sent
	res.once('finish', () => {
		const end = process.hrtime.bigint();
		const durationMs = Number(end - start) / 1_000_000;
		
		// Log slow requests (headers already sent, so we can't set them)
		if (durationMs > 500) {
			// eslint-disable-next-line no-console
			console.warn(`Slow request: ${req.method} ${req.originalUrl} - ${durationMs.toFixed(2)}ms`);
		}
	});
	
	next();
}

module.exports = performanceMonitor;



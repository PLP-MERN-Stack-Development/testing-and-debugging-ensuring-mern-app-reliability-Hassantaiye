const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5000';

export async function apiRequest(endpoint, options = {}) {
	// Get token from localStorage if not provided in headers
	const token = localStorage.getItem('token');
	
	// Merge headers properly - don't let options.headers override Content-Type
	const headers = {
		'Content-Type': 'application/json',
		...(token && !options.headers?.Authorization ? { Authorization: `Bearer ${token}` } : {}),
		...(options.headers || {})
	};
	
	const config = {
		...options,
		headers
	};

	// Debug logging
	if (process.env.NODE_ENV !== 'production' && options.body) {
		// eslint-disable-next-line no-console
		console.log('API Request:', {
			method: config.method || 'GET',
			url: `${BASE_URL}${endpoint}`,
			headers,
			body: typeof config.body === 'string' ? config.body : JSON.stringify(config.body)
		});
	}

	const response = await fetch(`${BASE_URL}${endpoint}`, config);
	const data = await response.json().catch(() => ({}));

	if (!response.ok) {
		const error = new Error(data.error || 'Request failed');
		error.status = response.status;
		throw error;
	}

	return data;
}



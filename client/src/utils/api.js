const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5000';

export async function apiRequest(endpoint, options = {}) {
	const config = {
		headers: {
			'Content-Type': 'application/json',
			...(options.headers || {})
		},
		...options
	};

	const response = await fetch(`${BASE_URL}${endpoint}`, config);
	const data = await response.json().catch(() => ({}));

	if (!response.ok) {
		const error = new Error(data.error || 'Request failed');
		error.status = response.status;
		throw error;
	}

	return data;
}



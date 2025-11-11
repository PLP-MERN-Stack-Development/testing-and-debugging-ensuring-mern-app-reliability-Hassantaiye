import { http, HttpResponse } from 'msw';

let posts = [
	{
		_id: '1',
		title: 'Testing Strategies',
		content: 'Unit, integration, and E2E tests improve reliability.',
		category: 'testing',
		createdAt: new Date().toISOString()
	}
];

function resetPosts() {
	posts = [
		{
			_id: '1',
			title: 'Testing Strategies',
			content: 'Unit, integration, and E2E tests improve reliability.',
			category: 'testing',
			createdAt: new Date().toISOString()
		}
	];
}

const BASE_URL = 'http://localhost:5000';

export const handlers = [
	http.post(`${BASE_URL}/api/auth/login`, async ({ request }) => {
		const body = await request.json();
		if (body.email === 'user@example.com' && body.password === 'Password1') {
			return HttpResponse.json({
				user: { id: 'user1', username: 'Test User', email: 'user@example.com' },
				token: 'fake-token'
			});
		}
		return new HttpResponse(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 });
	}),
	http.get(`${BASE_URL}/api/posts`, () => {
		return HttpResponse.json(posts);
	}),
	http.post(`${BASE_URL}/api/posts`, async ({ request }) => {
		const body = await request.json();
		if (!body.title || !body.content || !body.category) {
			return new HttpResponse(JSON.stringify({ error: 'Validation failed' }), { status: 400 });
		}
		const newPost = {
			_id: String(posts.length + 1),
			...body,
			createdAt: new Date().toISOString()
		};
		posts = [newPost, ...posts];
		return HttpResponse.json(newPost, { status: 201 });
	})
];

export { resetPosts };



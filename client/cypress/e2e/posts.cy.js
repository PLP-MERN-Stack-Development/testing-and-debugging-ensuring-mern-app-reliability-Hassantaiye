describe('Posts CRUD flow', () => {
	beforeEach(() => {
		cy.intercept('POST', '**/api/auth/login', {
			statusCode: 200,
			body: {
				user: { id: '1', username: 'Cypress User', email: 'user@example.com' },
				token: 'cypress-token'
			}
		});

		cy.intercept('GET', '**/api/posts', {
			statusCode: 200,
			body: [
				{
					_id: '1',
					title: 'Existing Post',
					content: 'Seed content',
					category: 'testing',
					createdAt: new Date().toISOString()
				}
			]
		}).as('getPosts');

		cy.intercept('POST', '**/api/posts', (req) => {
			req.reply({
				statusCode: 201,
				body: {
					_id: '2',
					...req.body,
					createdAt: new Date().toISOString()
				}
			});
		}).as('createPost');
	});

	it('creates a new post from the form', () => {
		cy.visit('/login');
		cy.get('input[name="email"]').type('user@example.com');
		cy.get('input[name="password"]').type('Password1');
		cy.contains('button', /login/i).click();

		cy.url().should('include', '/dashboard');
		cy.visit('/posts');

		cy.wait('@getPosts');
		cy.contains('Existing Post');

		cy.get('input[name="title"]').type('Cypress Post');
		cy.get('textarea[name="content"]').type('Created via Cypress');
		cy.get('input[name="category"]').type('automation');
		cy.contains('button', /create post/i).click();

		cy.wait('@createPost');
		cy.contains('Cypress Post').should('be.visible');
	});
});



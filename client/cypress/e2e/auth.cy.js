describe('Authentication flow', () => {
	beforeEach(() => {
		cy.intercept('POST', '**/api/auth/login', {
			statusCode: 200,
			body: {
				user: { id: '1', username: 'Cypress User', email: 'user@example.com' },
				token: 'cypress-token'
			}
		}).as('loginRequest');
	});

	it('allows a user to login and reach the dashboard', () => {
		cy.visit('/login');

		cy.get('input[name="email"]').type('user@example.com');
		cy.get('input[name="password"]').type('Password1');
		cy.contains('button', /login/i).click();

		cy.wait('@loginRequest');
		cy.url().should('include', '/dashboard');
		cy.contains(/cypress user/i).should('be.visible');
	});
});



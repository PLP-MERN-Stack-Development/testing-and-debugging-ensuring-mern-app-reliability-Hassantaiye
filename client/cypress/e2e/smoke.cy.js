describe('Smoke test', () => {
	it('loads the home page', () => {
		cy.visit('/');
		// Adjust selector/text as your app evolves
		cy.contains(/home|react|app/i);
	});
});



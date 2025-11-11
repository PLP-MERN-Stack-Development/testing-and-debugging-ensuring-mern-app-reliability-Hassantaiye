const { defineConfig } = require('cypress');

module.exports = defineConfig({
	e2e: {
		baseUrl: 'http://localhost:3000',
		supportFile: 'client/cypress/support/e2e.js',
		specPattern: 'client/cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
		video: false
	}
});



describe('template spec', () => {
	beforeEach(() => {
		cy.visit('http://localhost:5173');
	});

	it('displays the title correctly', () => {
		cy.get('[data-testid=home-title]').should('contain', 'Scrapeact');
	});

	it('displays the subtitle correctly', () => {
		cy.get('[data-testid=home-subtitle]').should('contain', 'Zdobądź cenne dane z Google Maps w kilka chwil!');
	});

	it('displays the Lottie animation', () => {
		cy.get('[data-testid=home-lottie]').should('be.visible');
	});

	it('contains login and register buttons', () => {
		cy.get('[data-testid=home-login]').should('contain', 'Zaloguj');
		cy.get('[data-testid=home-register]').should('contain', 'Zarejestruj');
	});

	it('navigates to login page when login button is clicked', () => {
		cy.get('[data-testid=home-login]').click();
		cy.url().should('include', '/zaloguj');
	});

	it('navigates to register page when register button is clicked', () => {
		cy.get('[data-testid=home-register]').click();
		cy.url().should('include', '/zarejestruj');
	});
});

describe('Profile component', () => {
	beforeEach(() => {
		const user = {
			nickname: 'Michał',
			email: 'michal@gmail.com',
			_id: '664042650b281cbf0a147716',
			accessToken:
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaWNrbmFtZSI6Ik1pY2hhxYIiLCJpZCI6IjY2NDA0MjY1MGIyODFjYmYwYTE0NzcxNiIsImlhdCI6MTcxNTU3NzQzOH0.2mpqSy_UPTJNCfFeudRiBrpdajrZVl16V97ewOT7Gj8',
			isInitialized: true,
			isLoggedIn: true,
		};
		localStorage.setItem('user', JSON.stringify(user));
	});

  it('displays correct credentials after loader', () => {
    cy.visit('http://localhost:5173/profil');

		cy.get('[data-testid="test-loader"]').should('be.visible');

		cy.wait(3500);

		cy.get('[data-testid="test-loader"]').should('not.exist');

    cy.get('[data-testid="profile-nickname"]').should('contain', 'Michał');
    cy.get('[data-testid="profile-email"]').should('contain', 'michal@gmail.com');
    cy.get('[data-testid="profile-saved-contacts"]').should('contain', 'Zapisanych kontaktów: 0');
  });

	it('displays loader for 3 seconds and then shows empty data', () => {
		cy.visit('http://localhost:5173/profil');

		cy.get('[data-testid="test-loader"]').should('be.visible');

		cy.wait(3500);

		cy.get('[data-testid="test-loader"]').should('not.exist');

		cy.get('[data-testid="profile-company"]').should('not.exist');
	});

	it('displays one company after fetching data', () => {
		cy.intercept('GET', '**/contacts/664042650b281cbf0a147716', { fixture: 'singleCompany.json' }).as('data');

		cy.visit('http://localhost:5173/profil');

		cy.get('[data-testid="test-loader"]').should('be.visible');

		cy.wait(3500);

		cy.get('[data-testid="test-loader"]').should('not.exist');

    cy.get('[data-testid="profile-saved-contacts"]').should('contain', 'Zapisanych kontaktów: 1');

		cy.get('[data-testid="profile-company"]').should('be.visible');
	});
});

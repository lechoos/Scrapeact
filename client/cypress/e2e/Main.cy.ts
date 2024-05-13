describe('Main page', () => {
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

		cy.visit('http://localhost:5173/app');
	});

	it('displays greeting with user nickname', () => {
		cy.get('[data-testid="main-title"]').should('contain.text', 'Cześć Michał');
	});

	it('redirects to login page if user is not logged in', () => {
		localStorage.removeItem('user');

		cy.reload();

		cy.url().should('include', '/zaloguj');
	});
  
	it('displays form', () => {
    cy.get('[data-testid="main-form"]').should('be.visible');
	});

	it('displays sidebar correctly', () => {
		cy.get('[data-testid="sidebar-button"]').click();
    
		cy.get('[data-testid="sidebar-container"]').should('be.visible');
		cy.get('[data-testid="sidebar-nickname"]').should('be.visible');
		cy.get('[data-testid="sidebar-email"]').should('be.visible');
		cy.get('[data-testid="sidebar-logout"]').should('be.visible');
		cy.get('[data-testid="sidebar-profile"]').should('be.visible');
		cy.get('[data-testid="sidebar-settings"]').should('be.visible');
	});
  
  it('should logout user when logout button is clicked', () => {
    cy.get('[data-testid="sidebar-button"]').click();
    cy.get('[data-testid="sidebar-logout"]').click();

    cy.wait(500);

    cy.get('[data-testid=home-title]').should('contain', 'Scrapeact');
  });

	it('displays error when submit button is clicked with an empty form', () => {
		cy.get('[data-testid="main-submit"]').click();
		cy.get('[data-testid="error-message"]').should('be.visible');
	});

	it('displays error when link typed in form is incorrect', () => {
		cy.get('[data-testid="maps-form-input"]').type('test');
		cy.get('[data-testid="main-submit"]').click();
		cy.get('[data-testid="error-message"]').should('be.visible');
	});
});

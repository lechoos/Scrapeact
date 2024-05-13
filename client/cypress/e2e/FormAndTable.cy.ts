describe('Testing form and table connection', () => {
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

  it('displays correct data after correct input', () => {
    cy.get('[data-testid="maps-form-input"]').type('https://www.google.com/maps/search/architekt/@52.984392,18.5952093,12z?authuser=0&hl=pl&entry=ttu');
    cy.get('[data-testid="main-submit"]').click();

    cy.get('[data-testid="three-dots-loading"]').should('be.visible');

    cy.wait(1000 * 60 * 3);

    cy.get('[data-testid="table-container"]').should('be.visible');
  })
});

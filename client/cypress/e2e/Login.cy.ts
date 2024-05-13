describe('Login page', () => {
	beforeEach(() => {
		cy.visit('http://localhost:5173/zaloguj');
	});

	it('displays login form elements', () => {
		cy.get('input[name="email"]').should('exist');
		cy.get('input[name="password"]').should('exist');
		cy.get('button[type="submit"]').should('exist');
	});

	it('allows user to input data in login form', () => {
		cy.get('input[name="email"]').type('michal@gmail.com').should('have.value', 'michal@gmail.com');
		cy.get('input[name="password"]').type('testowehaslo').should('have.value', 'testowehaslo');
	});

	it('submits login form and logs in user', () => {
    cy.get('input[name="email"]').type('michal@gmail.com');
    cy.get('input[name="password"]').type('testowehaslo');

    cy.get('button[type="submit"]').click();

    cy.wait(1500); 

    cy.url().should('include', '/app');

    cy.window().its('localStorage').should('have.property', 'user');
  });

	it('displays error message for password if it is wrong', () => {
    cy.get('input[name="email"]').type('michal@gmail.com');
    cy.get('input[name="password"]').type('wrongPassword');

    cy.get('button[type="submit"]').click();

    cy.wait(500); 

    cy.contains('Hasło jest błędne!').should('be.visible');
  });

	it('displays error message for email if it is does not exist', () => {
    cy.get('input[name="email"]').type('test@tlen.com');
    cy.get('input[name="password"]').type('wrongPassword');

    cy.get('button[type="submit"]').click();

    cy.wait(500); 

    cy.contains('Użytkownik nie istnieje!').should('be.visible');
  });

	it('displays error message for both email and password if submits an empty form', () => {
    cy.get('button[type="submit"]').click();

    cy.wait(500); 

    cy.contains('E-mail jest wymagany').should('be.visible');
    cy.contains('Hasło jest wymagane').should('be.visible');
  });
});

describe('Register Page', () => {
	beforeEach(() => {
		cy.visit('http://localhost:5173/zarejestruj');
	});

	it('displays registration form elements', () => {
		cy.get('input[name="nickname"]').should('exist');
		cy.get('input[name="email"]').should('exist');
		cy.get('input[name="password"]').should('exist');
		cy.get('button[type="submit"]').should('exist');
	});

	it('allows user to input data in registration form', () => {
		const nickname = 'testUser';
		const email = 'test@example.com';
		const password = 'testPassword';

		cy.get('input[name="nickname"]').type(nickname).should('have.value', nickname);
		cy.get('input[name="email"]').type(email).should('have.value', email);
		cy.get('input[name="password"]').type(password).should('have.value', password);
	});

	it('submits registration form and registers user', () => {
		const nickname = 'testUser';
		const email = 'test@example.com';
		const password = 'testPassword';

		cy.get('input[name="nickname"]').type(nickname);
		cy.get('input[name="email"]').type(email);
		cy.get('input[name="password"]').type(password);

		cy.intercept('POST', '**/register', {
			statusCode: 200,
			body: {
				_doc: {
					nickname: 'testUser',
					email: 'test@example.com',
					id: 'userId123',
					accessToken: 'abc123',
				},
			},
		}).as('registerRequest');

		cy.get('button[type="submit"]').click();

		cy.wait('@registerRequest').then(interception => {
			if (interception.response) {
				expect(interception.response.statusCode).to.equal(200);
				expect(interception.response.body._doc.nickname).to.equal('testUser');
			}
		});
	});

	it('displays error message if registration fails', () => {
		cy.get('input[name="nickname"]').type('testUser');
		cy.get('input[name="email"]').type('test@example.com');
		cy.get('input[name="password"]').type('testPassword');

		cy.intercept('POST', '**/register', {
			statusCode: 400,
			body: {
				message: 'Registration failed. Please try again.',
			},
		}).as('registerRequest');

		cy.get('button[type="submit"]').click();

		cy.wait('@registerRequest').then(interception => {
			if (interception.response) {
				expect(interception.response.statusCode).to.equal(400);
			}
			cy.contains('Registration failed. Please try again.').should('be.visible');
		});
	});
});

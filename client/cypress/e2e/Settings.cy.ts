describe('Settings page', () => {
  beforeEach(() => {
    const user = {
      nickname: 'Michał',
      email: 'michal@gmail.com',
      _id: '6642d28ce0e4df3519a81425',
      accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaWNrbmFtZSI6Ik1pY2hhbCIsImlkIjoiNjY0MmQyOGNlMGU0ZGYzNTE5YTgxNDI1IiwiaWF0IjoxNzE1NjU1MzA4fQ.McsyRsaCfH5LUC9q0Fk8zGsf79afbnuJf95cBhBup2A',
      isInitialized: true,
      isLoggedIn: true,
    };
    localStorage.setItem('user', JSON.stringify(user));

    cy.visit('http://localhost:5173/ustawienia');
  });

  it('should display logged user data in the form fields', () => {
    cy.get('input[name="nickname"]').should('have.value', 'Michał');
    cy.get('input[name="email"]').should('have.value', 'michal@gmail.com');
  });

  it('should allow user to edit settings', () => {
    cy.get('input[name="nickname"]').clear().type('Sloniowaty');
    cy.get('input[name="email"]').clear().type('slon@bdf.com');
    
    cy.get('[data-testid="settings-submit"]').click();
    
    cy.contains('Dane użytkownika zostały zaktualizowane').should('be.visible');
  });
  
  it('should display errors if input values are either null or invalid', () => {
    cy.get('input[name="nickname"]').clear().type('Mi');
    cy.get('input[name="email"]').clear().type('michal');
    cy.get('input[name="password"]').clear().type('s');

    cy.get('button[type="submit"]').click();

    cy.contains('Nazwa użytkownika jest zbyt krótka').should('be.visible');
    cy.contains('E-mail jest nieprawidłowy').should('be.visible');
    cy.contains('Hasło jest zbyt krótkie').should('be.visible');
  });

  it('should display errors if nickname or email are null', () => {
    cy.get('input[name="nickname"]').clear();
    cy.get('input[name="email"]').clear();

    cy.get('button[type="submit"]').click();

    cy.contains('Nazwa użytkownika jest wymagana').should('be.visible');
    cy.contains('E-mail jest wymagany').should('be.visible');
  });

  it('should allow user to delete account', () => {
    cy.get('[data-testid="settings-delete"]').click();

    cy.on('window:confirm', () => true);

    cy.url().should('eq', 'http://localhost:5173/zaloguj');

    cy.window().its('localStorage').invoke('getItem', 'user').should('be.null');
  });
});
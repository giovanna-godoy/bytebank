describe('Logout Flow', () => {
  beforeEach(() => {
    cy.intercept('POST', '**/api/auth/login', {
      statusCode: 200,
      body: {
        accessToken: 'mock-token',
        refreshToken: 'mock-refresh',
        user: { id: '1', email: 'test@test.com', name: 'Test User' }
      }
    });

    cy.intercept('POST', '**/api/auth/logout', {
      statusCode: 200,
      body: { message: 'Logged out successfully' }
    }).as('logoutRequest');

    cy.login('test@test.com', '123456');
  });

  it('should logout successfully', () => {
    cy.get('[data-cy="user-menu"]').click();
    cy.contains('Sair').click();

    cy.wait('@logoutRequest');
    cy.url().should('include', '/login');
    cy.get('input[type="email"]').should('be.visible');
  });

  it('should clear session data on logout', () => {
    cy.window().then((win) => {
      expect(win.sessionStorage.getItem('auth_token')).to.exist;
    });

    cy.get('[data-cy="user-menu"]').click();
    cy.contains('Sair').click();

    cy.wait('@logoutRequest');
    cy.window().then((win) => {
      expect(win.sessionStorage.getItem('auth_token')).to.be.null;
    });
  });

  it('should redirect to login when accessing protected route after logout', () => {
    cy.get('[data-cy="user-menu"]').click();
    cy.contains('Sair').click();

    cy.wait('@logoutRequest');
    cy.visit('/dashboard');
    cy.url().should('include', '/login');
  });

  it('should handle logout error gracefully', () => {
    cy.intercept('POST', '**/api/auth/logout', {
      statusCode: 500,
      body: { message: 'Server error' }
    }).as('logoutError');

    cy.get('[data-cy="user-menu"]').click();
    cy.contains('Sair').click();
    
    cy.wait('@logoutError');
    cy.url().should('include', '/login');
  });
});

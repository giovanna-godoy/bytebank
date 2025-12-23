describe('Login Flow', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should display login form', () => {
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
  });

  it('should login successfully with valid credentials', () => {
    cy.intercept('POST', '**/api/auth/login', {
      statusCode: 200,
      body: {
        accessToken: 'mock-token',
        refreshToken: 'mock-refresh',
        user: { id: '1', email: 'test@test.com', name: 'Test User' }
      }
    }).as('loginRequest');

    cy.get('input[type="email"]').type('test@test.com');
    cy.get('input[type="password"]').type('123456');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginRequest');
    cy.url().should('include', '/dashboard');
  });

  it('should show error with invalid credentials', () => {
    cy.intercept('POST', '**/api/auth/login', {
      statusCode: 401,
      body: { message: 'Invalid credentials' }
    }).as('loginError');

    cy.get('input[type="email"]').type('wrong@test.com');
    cy.get('input[type="password"]').type('wrong');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginError');
    cy.contains('Invalid credentials').should('be.visible');
  });

  it('should validate required fields', () => {
    cy.get('button[type="submit"]').click();
    cy.get('input[type="email"]:invalid').should('exist');
    cy.get('input[type="password"]:invalid').should('exist');
  });
});

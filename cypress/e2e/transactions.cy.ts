describe('Transaction Flow', () => {
  beforeEach(() => {
    cy.intercept('POST', '**/api/auth/login', {
      statusCode: 200,
      body: {
        accessToken: 'mock-token',
        refreshToken: 'mock-refresh',
        user: { id: '1', email: 'test@test.com', name: 'Test' }
      }
    });

    cy.intercept('GET', '**/api/transactions', {
      statusCode: 200,
      body: []
    }).as('getTransactions');

    cy.login('test@test.com', '123456');
    cy.wait('@getTransactions');
  });

  it('should create new transaction', () => {
    cy.intercept('POST', '**/api/transactions', {
      statusCode: 201,
      body: {
        id: '1',
        description: 'Salary',
        amount: 5000,
        date: '2025-01-15',
        type: 'income'
      }
    }).as('createTransaction');

    cy.contains('Nova Transação').click();
    cy.get('input[name="description"]').type('Salary');
    cy.get('input[name="amount"]').type('5000');
    cy.get('select[name="type"]').select('income');
    cy.get('button[type="submit"]').click();

    cy.wait('@createTransaction');
    cy.contains('Salary').should('be.visible');
  });

  it('should delete transaction', () => {
    cy.intercept('GET', '**/api/transactions', {
      statusCode: 200,
      body: [
        { id: '1', description: 'Test', amount: 100, date: '2025-01-15', type: 'expense' }
      ]
    });

    cy.intercept('DELETE', '**/api/transactions/1', {
      statusCode: 204
    }).as('deleteTransaction');

    cy.visit('/transactions');
    cy.contains('Test').parent().find('[data-cy="delete-btn"]').click();
    cy.get('[data-cy="confirm-delete"]').click();

    cy.wait('@deleteTransaction');
    cy.contains('Test').should('not.exist');
  });

  it('should filter transactions by type', () => {
    cy.intercept('GET', '**/api/transactions*', {
      statusCode: 200,
      body: [
        { id: '1', description: 'Income', amount: 1000, type: 'income' },
        { id: '2', description: 'Expense', amount: 500, type: 'expense' }
      ]
    });

    cy.visit('/transactions');
    cy.get('select[name="filter-type"]').select('income');
    cy.contains('Income').should('be.visible');
    cy.contains('Expense').should('not.exist');
  });
});

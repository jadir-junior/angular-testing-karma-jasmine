describe('Counter', () => {
  beforeEach(() => {
    cy.visit('/counter');
  });

  it('has the correct title', () => {
    cy.title().should('equal', 'Angular Testing (Karma + Jasmine) And Cypress');
  });

  it('increments the count', () => {
    cy.byTestId('count').should('have.text', '5');
    cy.byTestId('increment-button').first().click();
    cy.byTestId('count').should('have.text', '6');
  });

  it('decrements the count', () => {
    cy.byTestId('decrement-button').first().click();
    cy.byTestId('count').should('have.text', '4');
  });

  it('resets the count', () => {
    cy.byTestId('reset-input').type('123');
    cy.byTestId('reset-button').first().click();
    cy.byTestId('count').should('have.text', '123');
  });
});

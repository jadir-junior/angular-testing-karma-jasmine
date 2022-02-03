declare namespace Cypress {
  interface Chainable {
    byTestId<E extends Node = HTMLElement>(
      id: string,
      options?: Partial<
        Cypress.Loggable &
          Cypress.Timeoutable &
          Cypress.Withinable &
          Cypress.Shadow
      >
    ): Cypress.Chainable<JQuery<E>>;
  }
}

Cypress.Commands.add(
  'byTestId',
  <E extends Node = HTMLElement>(
    id: string,
    options?: Partial<
      Cypress.Loggable &
        Cypress.Timeoutable &
        Cypress.Withinable &
        Cypress.Shadow
    >
  ): Cypress.Chainable<JQuery<E>> => cy.get(`[data-testid="${id}"]`, options)
);

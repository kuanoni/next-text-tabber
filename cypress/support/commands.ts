/// <reference types="cypress" />

Cypress.Commands.add('getTestElement', (selector: string) => cy.get(`[data-testid="${selector}"]`));

export {};

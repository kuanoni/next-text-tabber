declare namespace Cypress {
	interface Chainable {
		getTestElement(selector: string): Chainable<JQuery<HTMLElement>>;
	}
}

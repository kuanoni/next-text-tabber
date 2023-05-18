import React from 'react';

import FretboardTuningColumn from './FretboardTuningColumn';

describe('<FretboardTuningColumn />', () => {
	it('renders', () => {
		cy.mount(<FretboardTuningColumn />);
	});

	it('has default (E Standard) tunings selected', () => {
		cy.mount(<FretboardTuningColumn />);

		cy.getTestElement('tuning-selector-common').find('option:selected').should('have.text', 'E Standard (Default)');
		cy.getTestElement('tuning-selector-0').find('option:selected').should('have.text', 'E2');
		cy.getTestElement('tuning-selector-1').find('option:selected').should('have.text', 'A2');
		cy.getTestElement('tuning-selector-2').find('option:selected').should('have.text', 'D3');
		cy.getTestElement('tuning-selector-3').find('option:selected').should('have.text', 'G3');
		cy.getTestElement('tuning-selector-4').find('option:selected').should('have.text', 'B3');
		cy.getTestElement('tuning-selector-5').find('option:selected').should('have.text', 'E4');
	});

	it('TuningSelectorCommon correctly changes tunings when changed', () => {
		cy.mount(<FretboardTuningColumn />);

		cy.getTestElement('tuning-selector-common').select('Drop D');

		cy.getTestElement('tuning-selector-common').find('option:selected').should('have.text', 'Drop D');
		cy.getTestElement('tuning-selector-0').find('option:selected').should('have.text', 'D2');
		cy.getTestElement('tuning-selector-1').find('option:selected').should('have.text', 'A2');
		cy.getTestElement('tuning-selector-2').find('option:selected').should('have.text', 'D3');
		cy.getTestElement('tuning-selector-3').find('option:selected').should('have.text', 'G3');
		cy.getTestElement('tuning-selector-4').find('option:selected').should('have.text', 'B3');
		cy.getTestElement('tuning-selector-5').find('option:selected').should('have.text', 'E4');
	});
});

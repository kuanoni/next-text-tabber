import { createSection } from '@modules/editorStore/actions';

import Tablature from '../components/Tablature';
import { columnIsGhostSelected, columnIsNotSelected, columnIsSelected, getColumn, getTablature } from './utils';

describe('Column selection', () => {
	beforeEach(() => {
		cy.mount(<Tablature />);
	});

	it('can select multiple columns from left-to-right.', () => {
		getColumn(0)
			.trigger('mousedown')
			.should(columnIsGhostSelected)
			.next()
			.trigger('mouseover')
			.should(columnIsGhostSelected)
			.next()
			.trigger('mouseover')
			.trigger('mouseup')
			.should(columnIsSelected)
			.next()
			.trigger('mouseover')
			.should(columnIsNotSelected);
	});

	it('can select mutliple columns from right-to-left.', () => {
		getColumn(3)
			.trigger('mousedown')
			.should(columnIsGhostSelected)
			.prev()
			.trigger('mouseover')
			.should(columnIsGhostSelected)
			.prev()
			.trigger('mouseover')
			.trigger('mouseup')
			.should(columnIsSelected)
			.prev()
			.trigger('mouseover')
			.should(columnIsNotSelected);
	});

	it('stops selecting when "mouseup" event is triggered outside of Column component.', () => {
		getColumn(0).trigger('mousedown').should(columnIsGhostSelected);
		getTablature().trigger('mouseover').trigger('mouseup');
		getColumn(1).trigger('mouseover').should(columnIsNotSelected);
	});

	it('clears the selection when the Tablature component is clicked.', () => {
		getColumn(0).click().should(columnIsSelected);
		getTablature().click();
		getColumn(0).should(columnIsNotSelected);
	});

	it('prevents starting a selection on one section, and ending on another.', () => {
		createSection();
		getColumn(0).trigger('mousedown').should(columnIsGhostSelected);
		getColumn(0, 1).trigger('mouseover').trigger('mouseup').should(columnIsNotSelected);
	});
});

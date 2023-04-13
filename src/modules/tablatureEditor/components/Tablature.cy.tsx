import Tablature from './Tablature';

const columnIsSelected = (e: JQuery<HTMLElement>) => expect(e).to.have.attr('data-selected', 'true');
const columnIsNotSelected = (e: JQuery<HTMLElement>) => expect(e).to.have.attr('data-selected', 'false');

describe('Column selection', () => {
	it('multiple columns can be selected with mouse events.', () => {
		cy.mount(<Tablature />);

		const firstColumn = cy.getTestElement('line').getTestElement('column').first();

		firstColumn
			.trigger('mousedown')
			.should(columnIsSelected)
			.next()
			.trigger('mouseover')
			.should(columnIsSelected)
			.next()
			.trigger('mouseover')
			.trigger('mouseup')
			.should(columnIsSelected)
			.next()
			.trigger('mouseover')
			.should(columnIsNotSelected);
	});

	it('stops selecting when mouseup event is triggered outside column component.', () => {
		cy.mount(<Tablature />);
		const tablature = cy.getTestElement('tablature');
		const firstColumn = cy.getTestElement('line').getTestElement('column').first().should(columnIsSelected);

		firstColumn.trigger('mousedown').should(columnIsSelected);

		tablature.trigger('mouseover').trigger('mouseup');

		firstColumn.next().trigger('mouseover').should(columnIsNotSelected);
	});
});

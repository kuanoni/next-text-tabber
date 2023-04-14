import TablatureControls from './controls/TablatureControls';
import Tablature from './Tablature';

const getTablature = () => cy.getTestElement('tablature');
const getColumn = (columnIndex: number, lineIndex = 0) =>
	cy.getTestElement('line').eq(lineIndex).find('[data-testid="column"]').eq(columnIndex);
const columnIsSelected = (e: JQuery<HTMLElement>) => expect(e).to.have.attr('data-selected', 'true');
const columnIsNotSelected = (e: JQuery<HTMLElement>) => expect(e).to.have.attr('data-selected', 'false');

describe('Column selection', () => {
	beforeEach(() => {
		cy.mount(
			<>
				<Tablature />
				<TablatureControls />
			</>
		);
	});

	it('can select multiple columns from left-to-right.', () => {
		getColumn(0)
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

	it('can select mutliple columns from right-to-left.', () => {
		getColumn(3)
			.trigger('mousedown')
			.should(columnIsSelected)
			.prev()
			.trigger('mouseover')
			.should(columnIsSelected)
			.prev()
			.trigger('mouseover')
			.trigger('mouseup')
			.should(columnIsSelected)
			.prev()
			.trigger('mouseover')
			.should(columnIsNotSelected);
	});

	it('stops selecting when "mouseup" event is triggered outside of Column component.', () => {
		getColumn(0).trigger('mousedown').should(columnIsSelected);
		getTablature().trigger('mouseover').trigger('mouseup');
		getColumn(1).trigger('mouseover').should(columnIsNotSelected);
	});

	it('clears the selection when the Tablature component is clicked.', () => {
		getColumn(0).click().should(columnIsSelected);
		getTablature().click();
		getColumn(0).should(columnIsNotSelected);
	});

	it('prevents starting a selection on one line, and ending on another.', () => {
		cy.getTestElement('pushBlankLine').click();
		getColumn(0).trigger('mousedown').should(columnIsSelected);
		getColumn(0, 1).trigger('mouseover').trigger('mouseup').should(columnIsNotSelected);
	});
});

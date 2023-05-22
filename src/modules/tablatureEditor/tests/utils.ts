export const getTablature = () => cy.getTestElement('tablature');

export const getColumn = (columnIndex: number, sectionIndex = 0) =>
	cy.getTestElement('section').eq(sectionIndex).find('[data-testid="column"]').eq(columnIndex);

export const getColumnCell = (columnIndex: number, cellIndex: number) =>
	getColumn(columnIndex).children().eq(cellIndex);

export const columnIsSelected = (e: JQuery<HTMLElement>) =>
	expect(e)
		.to.have.attr('data-selected-status')
		.match(/^selected/);

export const columnIsGhostSelected = (e: JQuery<HTMLElement>) =>
	expect(e)
		.to.have.attr('data-selected-status')
		.match(/^ghost-selected/);

export const columnIsNotSelected = (e: JQuery<HTMLElement>) => expect(e).to.have.attr('data-selected-status', '');

import Fretboard from '@modules/fretboard/components/Fretboard';
import TablatureControls from '@modules/tablatureEditor/components/controls/TablatureControls';
import Tablature from '@modules/tablatureEditor/components/Tablature';

const clickModifierButton = (modifierName: string) => cy.getTestElement(`set-cell-modifier ${modifierName}`).click();

const clickFretboardFret = (stringNumber: number, fretNumber: number) =>
	cy.getTestElement(`fret ${fretNumber} ${stringNumber}`).click();

const getColumn = (columnIndex: number, sectionIndex = 0) =>
	cy.getTestElement('section').eq(sectionIndex).find('[data-testid="column"]').eq(columnIndex);

const getColumnCell = (columnIndex: number, cellIndex: number) => getColumn(columnIndex).children().eq(cellIndex);

describe('CellModifiers.cy.tsx', () => {
	const columnIndex = 1;
	const stringNumber = 3;
	const fretNumber = 5;

	beforeEach(() => {
		cy.mount(
			<>
				<Fretboard />
				<Tablature />
				<TablatureControls />
			</>
		);

		getColumn(columnIndex).click();
		clickFretboardFret(stringNumber, fretNumber);
	});

	it('does nothing when applying a modifier to a blank column.', () => {
		getColumn(columnIndex + 1).click();
		clickModifierButton('Hammer-on');

		for (let i = 0; i < 6; i++) {
			if (i === stringNumber) continue;
			getColumnCell(columnIndex, i).should('be.text', `--`);
		}

		getColumnCell(columnIndex + 1, stringNumber).should('be.text', `-`);
	});

	it('applies the "Hammer-on" modifier to selected column.', () => {
		clickModifierButton('Hammer-on');

		for (let i = 0; i < 6; i++) {
			if (i === stringNumber) continue;
			getColumnCell(columnIndex, i).should('be.text', `--`);
		}

		getColumnCell(columnIndex, stringNumber).should('be.text', `${fretNumber}h`);
	});

	it('applies the "Ghost note" modifier to selected column.', () => {
		clickModifierButton('Ghost note');

		for (let i = 0; i < 6; i++) {
			if (i === stringNumber) continue;
			getColumnCell(columnIndex, i).should('be.text', `----`);
		}

		getColumnCell(columnIndex, stringNumber).should('be.text', `(${fretNumber})-`);
	});

	it('applies the "Ghost note" modifier to multi-column selection.', () => {
		getColumn(columnIndex).trigger('mousedown');
		getColumn(columnIndex + 3)
			.trigger('mouseover')
			.trigger('mouseup');
		clickFretboardFret(stringNumber, fretNumber);

		clickModifierButton('Ghost note');

		for (let i = columnIndex; i < columnIndex + 3; i++) {
			for (let j = 0; j < 6; j++) {
				if (j === stringNumber) continue;
				getColumnCell(columnIndex, j).should('be.text', `----`);
			}

			getColumnCell(i, stringNumber).should('be.text', `(${fretNumber})-`);
		}
	});
});

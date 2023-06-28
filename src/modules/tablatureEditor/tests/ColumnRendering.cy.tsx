import { BLANK_COLUMN_NOTATION_CHAR, CELL_NOTATIONS, COLUMN_NOTATIONS } from '@modules/editorStore/constants';
import {
	resetTablature,
	setColumnsNotation,
	setFretsNotation,
	setSelection,
	toggleFret,
} from '@modules/editorStore/new_actions';
import Tablature from '@modules/tablatureEditor/components/Tablature';

import { getColumnCell } from './utils';

const columnIndex = 1;
const stringNumber = 3;
const singleDigitFretNumber = 5;
const doubleDigitFretNumber = 12;

const cleanupBefore = () => {
	before(() => resetTablature());

	beforeEach(() => {
		cy.mount(<Tablature />);

		setSelection(0, columnIndex, columnIndex);
	});
};

describe('Column cell frets rendering', () => {
	cleanupBefore();

	it('blank column renders with just single dashes per row.', () => {
		getColumnCell(columnIndex, 0).should('be.text', BLANK_COLUMN_NOTATION_CHAR);
		for (let i = 1; i < 7; i++) {
			getColumnCell(columnIndex, i).should('be.text', '-');
		}
	});

	it('columns with single digit frets render in 2 wide rows.', () => {
		toggleFret(stringNumber, singleDigitFretNumber);
		for (let i = 1; i < 7; i++) {
			if (i - 1 === stringNumber) {
				getColumnCell(columnIndex, i).should('be.text', `${singleDigitFretNumber}-`);
				continue;
			}
			getColumnCell(columnIndex, i).should('be.text', '--');
		}
	});

	it('columns with double digit frets render in 3 wide rows.', () => {
		toggleFret(stringNumber, doubleDigitFretNumber);
		for (let i = 1; i < 7; i++) {
			if (i - 1 === stringNumber) {
				getColumnCell(columnIndex, i).should('be.text', `${doubleDigitFretNumber}-`);
				continue;
			}
			getColumnCell(columnIndex, i).should('be.text', '---');
		}
	});

	it('columns with single and double digit frets render in 3 wide rows, with the single digit fret in the middle.', () => {
		toggleFret(stringNumber, singleDigitFretNumber);
		toggleFret(stringNumber - 1, doubleDigitFretNumber);
		for (let i = 1; i < 7; i++) {
			if (i - 1 === stringNumber) {
				getColumnCell(columnIndex, i).should('be.text', `-${singleDigitFretNumber}-`);
				continue;
			}
			if (i - 1 === stringNumber - 1) {
				getColumnCell(columnIndex, i).should('be.text', `${doubleDigitFretNumber}-`);
				continue;
			}
			getColumnCell(columnIndex, i).should('be.text', '---');
		}
	});
});

describe('Column cell notations rendering', () => {
	describe('wrapping notations', () => {
		const ghostNoteNotation = CELL_NOTATIONS['Ghost note'];

		cleanupBefore();

		it('columns with single digit frets and wrapping cell notations render in 4 wide rows.', () => {
			toggleFret(stringNumber, singleDigitFretNumber);
			toggleFret(stringNumber, singleDigitFretNumber);
			setFretsNotation(ghostNoteNotation);
			for (let i = 1; i < 7; i++) {
				if (i - 1 === stringNumber) {
					getColumnCell(columnIndex, i).should('be.text', `(${singleDigitFretNumber})-`);
					continue;
				}
				getColumnCell(columnIndex, i).should('be.text', '----');
			}
		});

		it('columns with double digit frets and wrapping cell notations render in 5 wide rows.', () => {
			toggleFret(stringNumber, doubleDigitFretNumber);
			setFretsNotation(ghostNoteNotation);
			for (let i = 1; i < 7; i++) {
				if (i - 1 === stringNumber) {
					getColumnCell(columnIndex, i).should('be.text', `(${doubleDigitFretNumber})-`);
					continue;
				}
				getColumnCell(columnIndex, i).should('be.text', '-----');
			}
		});

		it('columns with single and double digit frets and wrapping cell notations render in 5 wide rows, with the single digit wrapped in the middle', () => {
			toggleFret(stringNumber, singleDigitFretNumber);
			toggleFret(stringNumber - 1, doubleDigitFretNumber);
			setFretsNotation(ghostNoteNotation);
			for (let i = 1; i < 7; i++) {
				if (i - 1 === stringNumber) {
					getColumnCell(columnIndex, i).should('be.text', `-(${singleDigitFretNumber})-`);
					continue;
				}
				if (i - 1 === stringNumber - 1) {
					getColumnCell(columnIndex, i).should('be.text', `(${doubleDigitFretNumber})-`);
					continue;
				}
				getColumnCell(columnIndex, i).should('be.text', '-----');
			}
		});
	});

	describe('snapping notations', () => {
		const hammerOnNotation = CELL_NOTATIONS['Hammer-on'];

		cleanupBefore();

		it('columns with single digit frets and snapping cell notations render in 2 wide rows.', () => {
			toggleFret(stringNumber, singleDigitFretNumber);
			setFretsNotation(hammerOnNotation);
			for (let i = 1; i < 7; i++) {
				if (i - 1 === stringNumber) {
					getColumnCell(columnIndex, i).should('be.text', `${singleDigitFretNumber}h`);
					continue;
				}
				getColumnCell(columnIndex, i).should('be.text', '--');
			}
		});

		it('columns with double digit frets and snapping cell notations render in 3 wide rows.', () => {
			toggleFret(stringNumber, doubleDigitFretNumber);
			setFretsNotation(hammerOnNotation);
			for (let i = 1; i < 7; i++) {
				if (i - 1 === stringNumber) {
					getColumnCell(columnIndex, i).should('be.text', `${doubleDigitFretNumber}h`);
					continue;
				}
				getColumnCell(columnIndex, i).should('be.text', '---');
			}
		});

		it('columns with single and double digit frets and snapping cell notations render in 3 wide rows, with the single digit in the middle', () => {
			toggleFret(stringNumber, singleDigitFretNumber);
			toggleFret(stringNumber - 1, doubleDigitFretNumber);
			setFretsNotation(hammerOnNotation);
			for (let i = 1; i < 7; i++) {
				if (i - 1 === stringNumber) {
					getColumnCell(columnIndex, i).should('be.text', `-${singleDigitFretNumber}h`);
					continue;
				}
				if (i - 1 === stringNumber - 1) {
					getColumnCell(columnIndex, i).should('be.text', `${doubleDigitFretNumber}h`);
					continue;
				}
				getColumnCell(columnIndex, i).should('be.text', '---');
			}
		});
	});
});

describe('Column notations rendering', () => {
	const palmMuteNotation = COLUMN_NOTATIONS['Palm mute'] as Required<ColumnNotation>;
	const vibratoNotation = COLUMN_NOTATIONS['Vibrato'];

	describe('solo columns', () => {
		cleanupBefore();

		it('blank columns with vibrato notation renders in 1 wide rows.', () => {
			setColumnsNotation(vibratoNotation);
			getColumnCell(columnIndex, 0).should('be.text', vibratoNotation.filler);
			for (let i = 1; i < 7; i++) {
				getColumnCell(columnIndex, i).should('be.text', '-');
			}
		});

		it('blank column with palm mute notation renders in 2 wide rows.', () => {
			setColumnsNotation(palmMuteNotation);
			getColumnCell(columnIndex, 0).should('be.text', palmMuteNotation.start);
			for (let i = 1; i < 7; i++) {
				getColumnCell(columnIndex, i).should('be.text', '--');
			}
		});

		it('column with single digit frets and palm mute notation renders in 2 wide rows.', () => {
			toggleFret(stringNumber, singleDigitFretNumber);
			setColumnsNotation(palmMuteNotation);
			getColumnCell(columnIndex, 0).should('be.text', palmMuteNotation.start);
			for (let i = 1; i < 7; i++) {
				if (i - 1 === stringNumber) {
					getColumnCell(columnIndex, i).should('be.text', `${singleDigitFretNumber}-`);
					continue;
				}
				getColumnCell(columnIndex, i).should('be.text', '--');
			}
		});

		it('column with double digit frets and palm mute notation renders in 3 wide rows.', () => {
			toggleFret(stringNumber, doubleDigitFretNumber);
			setColumnsNotation(palmMuteNotation);
			getColumnCell(columnIndex, 0).should('be.text', palmMuteNotation.start);
			for (let i = 1; i < 7; i++) {
				if (i - 1 === stringNumber) {
					getColumnCell(columnIndex, i).should('be.text', `${doubleDigitFretNumber}-`);
					continue;
				}
				getColumnCell(columnIndex, i).should('be.text', '---');
			}
		});

		it('column with single and double digit frets and palm mute notation renders in 3 wide rows. ', () => {
			toggleFret(stringNumber, singleDigitFretNumber);
			toggleFret(stringNumber - 1, doubleDigitFretNumber);
			setColumnsNotation(palmMuteNotation);
			getColumnCell(columnIndex, 0).should('be.text', palmMuteNotation.start);

			for (let i = 1; i < 7; i++) {
				if (i - 1 === stringNumber) {
					getColumnCell(columnIndex, i).should('be.text', `-${singleDigitFretNumber}-`);
					continue;
				}
				if (i - 1 === stringNumber - 1) {
					getColumnCell(columnIndex, i).should('be.text', `${doubleDigitFretNumber}-`);
					continue;
				}
				getColumnCell(columnIndex, i).should('be.text', '---');
			}
		});
	});

	describe('group of 3 columns', () => {
		cleanupBefore();

		const expectColumnNotations = (start: string, middle: string, end: string) => {
			getColumnCell(columnIndex, 0).should('be.text', start);
			getColumnCell(columnIndex + 1, 0).should('be.text', middle);
			getColumnCell(columnIndex + 2, 0).should('be.text', end);
		};

		beforeEach(() => {
			setSelection(0, columnIndex, columnIndex + 2);
		});

		it('each column with single digit frets and "Palm mute" notations render their column notation according to column position.', () => {
			toggleFret(stringNumber, singleDigitFretNumber);
			setColumnsNotation(palmMuteNotation);

			expectColumnNotations(
				palmMuteNotation.start,
				palmMuteNotation.filler.padEnd(2, palmMuteNotation.filler),
				palmMuteNotation.end
			);
		});

		it('each column with double digit frets and "Palm mute" notations render their column notation according to column position.', () => {
			toggleFret(stringNumber, doubleDigitFretNumber);
			setColumnsNotation(palmMuteNotation);

			expectColumnNotations(
				palmMuteNotation.start.padEnd(3, palmMuteNotation.filler),
				palmMuteNotation.filler.padEnd(3, palmMuteNotation.filler),
				palmMuteNotation.end.padStart(2, palmMuteNotation.filler)
			);
		});

		it('each column with mixed digit frets and "Palm mute" notations render their column notation according to column position.', () => {
			toggleFret(stringNumber, singleDigitFretNumber);
			setColumnsNotation(palmMuteNotation);
			setSelection(0, columnIndex + 2, columnIndex + 2);
			toggleFret(stringNumber, doubleDigitFretNumber);

			expectColumnNotations(
				palmMuteNotation.start.padEnd(2, palmMuteNotation.filler),
				palmMuteNotation.filler.padEnd(2, palmMuteNotation.filler),
				palmMuteNotation.end.padStart(2, palmMuteNotation.filler)
			);
		});
	});
});

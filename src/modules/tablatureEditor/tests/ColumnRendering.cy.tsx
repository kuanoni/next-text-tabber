import { setColumnSelection } from '@modules/editorStore/actions/columnSelection/setColumnSelection';
import { resetTablature } from '@modules/editorStore/actions/resetTablature';
import { setSelectedColumnsCellModifiers } from '@modules/editorStore/actions/setSelectedColumnsCellModifiers';
import { setSelectedColumnsFret } from '@modules/editorStore/actions/setSelectedColumnsFret';
import { setSelectedColumnsModifiers } from '@modules/editorStore/actions/setSelectedColumnsModifiers';
import { BLANK_COLUMN_MODIFIER_CHAR, CELL_MODIFIERS, COLUMN_MODIFIERS } from '@modules/editorStore/constants';
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

		setColumnSelection(0, columnIndex, columnIndex);
	});
};

describe('Column cell frets rendering', () => {
	cleanupBefore();

	it('blank column renders with just single dashes per row.', () => {
		getColumnCell(columnIndex, 0).should('be.text', BLANK_COLUMN_MODIFIER_CHAR);
		for (let i = 1; i < 7; i++) {
			getColumnCell(columnIndex, i).should('be.text', '-');
		}
	});

	it('columns with single digit frets render in 2 wide rows.', () => {
		setSelectedColumnsFret(stringNumber, singleDigitFretNumber);
		for (let i = 1; i < 7; i++) {
			if (i - 1 === stringNumber) {
				getColumnCell(columnIndex, i).should('be.text', `${singleDigitFretNumber}-`);
				continue;
			}
			getColumnCell(columnIndex, i).should('be.text', '--');
		}
	});

	it('columns with double digit frets render in 3 wide rows.', () => {
		setSelectedColumnsFret(stringNumber, doubleDigitFretNumber);
		for (let i = 1; i < 7; i++) {
			if (i - 1 === stringNumber) {
				getColumnCell(columnIndex, i).should('be.text', `${doubleDigitFretNumber}-`);
				continue;
			}
			getColumnCell(columnIndex, i).should('be.text', '---');
		}
	});

	it('columns with single and double digit frets render in 3 wide rows, with the single digit fret in the middle.', () => {
		setSelectedColumnsFret(stringNumber, singleDigitFretNumber);
		setSelectedColumnsFret(stringNumber - 1, doubleDigitFretNumber);
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

describe('Column cell modifiers rendering', () => {
	describe('wrapping modifiers', () => {
		const ghostNoteModifier = CELL_MODIFIERS['Ghost note'];

		cleanupBefore();

		it('columns with single digit frets and wrapping cell modifiers render in 4 wide rows.', () => {
			setSelectedColumnsFret(stringNumber, singleDigitFretNumber);
			setSelectedColumnsFret(stringNumber, singleDigitFretNumber);
			setSelectedColumnsCellModifiers(ghostNoteModifier);
			for (let i = 1; i < 7; i++) {
				if (i - 1 === stringNumber) {
					getColumnCell(columnIndex, i).should('be.text', `(${singleDigitFretNumber})-`);
					continue;
				}
				getColumnCell(columnIndex, i).should('be.text', '----');
			}
		});

		it('columns with double digit frets and wrapping cell modifiers render in 5 wide rows.', () => {
			setSelectedColumnsFret(stringNumber, doubleDigitFretNumber);
			setSelectedColumnsCellModifiers(ghostNoteModifier);
			for (let i = 1; i < 7; i++) {
				if (i - 1 === stringNumber) {
					getColumnCell(columnIndex, i).should('be.text', `(${doubleDigitFretNumber})-`);
					continue;
				}
				getColumnCell(columnIndex, i).should('be.text', '-----');
			}
		});

		it('columns with single and double digit frets and wrapping cell modifiers render in 5 wide rows, with the single digit wrapped in the middle', () => {
			setSelectedColumnsFret(stringNumber, singleDigitFretNumber);
			setSelectedColumnsFret(stringNumber - 1, doubleDigitFretNumber);
			setSelectedColumnsCellModifiers(ghostNoteModifier);
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

	describe('snapping modifiers', () => {
		const hammerOnModifier = CELL_MODIFIERS['Hammer-on'];

		cleanupBefore();

		it('columns with single digit frets and snapping cell modifiers render in 2 wide rows.', () => {
			setSelectedColumnsFret(stringNumber, singleDigitFretNumber);
			setSelectedColumnsCellModifiers(hammerOnModifier);
			for (let i = 1; i < 7; i++) {
				if (i - 1 === stringNumber) {
					getColumnCell(columnIndex, i).should('be.text', `${singleDigitFretNumber}h`);
					continue;
				}
				getColumnCell(columnIndex, i).should('be.text', '--');
			}
		});

		it('columns with double digit frets and snapping cell modifiers render in 3 wide rows.', () => {
			setSelectedColumnsFret(stringNumber, doubleDigitFretNumber);
			setSelectedColumnsCellModifiers(hammerOnModifier);
			for (let i = 1; i < 7; i++) {
				if (i - 1 === stringNumber) {
					getColumnCell(columnIndex, i).should('be.text', `${doubleDigitFretNumber}h`);
					continue;
				}
				getColumnCell(columnIndex, i).should('be.text', '---');
			}
		});

		it('columns with single and double digit frets and snapping cell modifiers render in 3 wide rows, with the single digit in the middle', () => {
			setSelectedColumnsFret(stringNumber, singleDigitFretNumber);
			setSelectedColumnsFret(stringNumber - 1, doubleDigitFretNumber);
			setSelectedColumnsCellModifiers(hammerOnModifier);
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

describe('Column modifiers rendering', () => {
	const palmMuteModifier = COLUMN_MODIFIERS['Palm mute'] as Required<ColumnModifier>;
	const vibratoModifier = COLUMN_MODIFIERS['Vibrato'];

	describe('solo columns', () => {
		cleanupBefore();

		it('blank columns with vibrato modifier renders in 1 wide rows.', () => {
			setSelectedColumnsModifiers(vibratoModifier);
			getColumnCell(columnIndex, 0).should('be.text', vibratoModifier.filler);
			for (let i = 1; i < 7; i++) {
				getColumnCell(columnIndex, i).should('be.text', '-');
			}
		});

		it('blank column with palm mute modifier renders in 2 wide rows.', () => {
			setSelectedColumnsModifiers(palmMuteModifier);
			getColumnCell(columnIndex, 0).should('be.text', palmMuteModifier.start);
			for (let i = 1; i < 7; i++) {
				getColumnCell(columnIndex, i).should('be.text', '--');
			}
		});

		it('column with single digit frets and palm mute modifier renders in 2 wide rows.', () => {
			setSelectedColumnsFret(stringNumber, singleDigitFretNumber);
			setSelectedColumnsModifiers(palmMuteModifier);
			getColumnCell(columnIndex, 0).should('be.text', palmMuteModifier.start);
			for (let i = 1; i < 7; i++) {
				if (i - 1 === stringNumber) {
					getColumnCell(columnIndex, i).should('be.text', `${singleDigitFretNumber}-`);
					continue;
				}
				getColumnCell(columnIndex, i).should('be.text', '--');
			}
		});

		it('column with double digit frets and palm mute modifier renders in 3 wide rows.', () => {
			setSelectedColumnsFret(stringNumber, doubleDigitFretNumber);
			setSelectedColumnsModifiers(palmMuteModifier);
			getColumnCell(columnIndex, 0).should('be.text', palmMuteModifier.start);
			for (let i = 1; i < 7; i++) {
				if (i - 1 === stringNumber) {
					getColumnCell(columnIndex, i).should('be.text', `${doubleDigitFretNumber}-`);
					continue;
				}
				getColumnCell(columnIndex, i).should('be.text', '---');
			}
		});

		it('column with single and double digit frets and palm mute modifier renders in 3 wide rows. ', () => {
			setSelectedColumnsFret(stringNumber, singleDigitFretNumber);
			setSelectedColumnsFret(stringNumber - 1, doubleDigitFretNumber);
			setSelectedColumnsModifiers(palmMuteModifier);
			getColumnCell(columnIndex, 0).should('be.text', palmMuteModifier.start);

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

		const expectColumnModifiers = (start: string, middle: string, end: string) => {
			getColumnCell(columnIndex, 0).should('be.text', start);
			getColumnCell(columnIndex + 1, 0).should('be.text', middle);
			getColumnCell(columnIndex + 2, 0).should('be.text', end);
		};

		beforeEach(() => {
			setColumnSelection(0, columnIndex, columnIndex + 2);
		});

		it('each column with single digit frets and "Palm mute" modifiers render their column modifier according to column position.', () => {
			setSelectedColumnsFret(stringNumber, singleDigitFretNumber);
			setSelectedColumnsModifiers(palmMuteModifier);

			expectColumnModifiers(
				palmMuteModifier.start,
				palmMuteModifier.filler.padEnd(2, palmMuteModifier.filler),
				palmMuteModifier.end
			);
		});

		it('each column with double digit frets and "Palm mute" modifiers render their column modifier according to column position.', () => {
			setSelectedColumnsFret(stringNumber, doubleDigitFretNumber);
			setSelectedColumnsModifiers(palmMuteModifier);

			expectColumnModifiers(
				palmMuteModifier.start.padEnd(3, palmMuteModifier.filler),
				palmMuteModifier.filler.padEnd(3, palmMuteModifier.filler),
				palmMuteModifier.end.padStart(2, palmMuteModifier.filler)
			);
		});

		it('each column with mixed digit frets and "Palm mute" modifiers render their column modifier according to column position.', () => {
			setSelectedColumnsFret(stringNumber, singleDigitFretNumber);
			setSelectedColumnsModifiers(palmMuteModifier);
			setColumnSelection(0, columnIndex + 2, columnIndex + 2);
			setSelectedColumnsFret(stringNumber, doubleDigitFretNumber);

			expectColumnModifiers(
				palmMuteModifier.start.padEnd(2, palmMuteModifier.filler),
				palmMuteModifier.filler.padEnd(2, palmMuteModifier.filler),
				palmMuteModifier.end.padStart(2, palmMuteModifier.filler)
			);
		});
	});
});

import { BLANK_NOTE_CHAR } from '@modules/tablatureEditorStore/tablatureSlice/constants';

export class Instrument {
	readonly name: string;
	readonly amountOfStrings: number;
	readonly amountOfFrets: number;
	readonly defaultTuning: number[];
	readonly defaultTuningName: string;
	readonly commonTunings: { [i: string]: number[] };
	readonly BLANK_CELL: Cell;
	readonly BLANK_COLUMN: Column;
	readonly BLANK_SECTION: Section;
	readonly BLANK_TABLATURE: Tablature;

	constructor(
		name: string,
		amountOfStrings: number,
		amountOfFrets: number,
		defaultTuningName: string,
		defaultTuning: number[],
		commonTunings: { [i: string]: number[] }
	) {
		this.name = name;
		this.amountOfStrings = amountOfStrings;
		this.amountOfFrets = amountOfFrets;
		this.defaultTuning = defaultTuning;
		this.defaultTuningName = defaultTuningName;
		this.commonTunings = { [defaultTuningName]: defaultTuning, ...commonTunings };

		this.BLANK_CELL = { modifier: null, fret: -1 };
		this.BLANK_COLUMN = {
			modifier: null,
			cells: new Array<Cell>(amountOfStrings).fill(this.BLANK_CELL),
		};
		this.BLANK_SECTION = { columns: new Array(8).fill(this.BLANK_COLUMN) };
		this.BLANK_TABLATURE = { sections: [this.BLANK_SECTION] };
	}

	createInitialState(): TablatureSlice {
		return {
			instrument: this,
			tuning: this.defaultTuning,
			tablature: this.BLANK_TABLATURE,
		};
	}

	createColumnFromText(columnText: string): Column {
		if (columnText.length > this.amountOfStrings)
			throw new Error(
				`columnText has too many (${columnText.length}/${this.amountOfStrings}) characters: ${columnText}`
			);

		const columnCells = new Array<Cell>(this.amountOfStrings).fill(this.BLANK_CELL).map((_, i): Cell => {
			const fret = columnText[i] === BLANK_NOTE_CHAR ? -1 : parseInt(columnText[i]);
			return {
				modifier: null,
				fret,
			};
		});

		const column: Column = {
			modifier: null,
			cells: columnCells,
		};

		return column;
	}
}

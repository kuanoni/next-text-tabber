import { BLANK_NOTE_CHAR } from '@modules/editorStore/constants';

export class Instrument {
	readonly name: string;
	readonly amountOfStrings: number;
	readonly amountOfFrets: number;
	readonly defaultTuning: number[];
	readonly defaultTuningName: string;
	readonly commonTunings: { [i: string]: number[] };
	readonly BLANK_CELL: Cell;
	readonly BLANK_TABLATURE: Tablature;
	columnCounter: number;

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

		this.columnCounter = 0;

		this.BLANK_CELL = { modifier: null, fret: -1 };
		this.BLANK_TABLATURE = { sections: [this.createBlankSection()] };
	}

	createInitialState(): InstrumentState {
		return {
			instrument: this,
			tuning: this.defaultTuning,
			tablature: this.BLANK_TABLATURE,
		};
	}

	createBlankColumn(): Column {
		return {
			id: this.columnCounter++,
			modifier: null,
			cells: new Array<Cell>(this.amountOfStrings).fill(this.BLANK_CELL),
		};
	}

	createBlankSection(): Section {
		const columns: Column[] = [];
		for (let i = 0; i < 8; i++) columns.push(this.createBlankColumn());

		return {
			name: 'Section',
			columns,
		};
	}

	cloneColumn(column: Column): Column {
		return { ...column, id: this.columnCounter++ };
	}

	cloneColumnSelection(columns: Column[]): Column[] {
		return columns.map((column) => this.cloneColumn(column));
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
			id: this.columnCounter++,
			modifier: null,
			cells: columnCells,
		};

		return column;
	}
}

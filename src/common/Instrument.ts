export class Instrument {
	readonly name: string;
	readonly amountOfStrings: number;
	readonly amountOfFrets: number;
	readonly defaultTuning: number[];
	readonly defaultTuningName: string;
	readonly commonTunings: { [i: string]: number[] };
	readonly BLANK_CELL: Cell;
	readonly BLANK_COLUMN: Column;
	readonly BLANK_LINE: Line;
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
		this.BLANK_LINE = { columns: new Array(8).fill(this.BLANK_COLUMN) };
		this.BLANK_TABLATURE = { lines: [this.BLANK_LINE] };
	}

	createInitialState(): TablatureSlice {
		return {
			instrument: this,
			tuning: this.defaultTuning,
			tablature: this.BLANK_TABLATURE,
		};
	}
}

export class Instrument {
	readonly name: string;
	readonly amountOfStrings: number;
	readonly amountOfFrets: number;
	readonly defaultTuning: number[];
	readonly commonTunings: { [i: string]: number[] };
	readonly BLANK_CELL: Cell;
	readonly BLANK_COLUMN: Column;
	readonly BLANK_LINE: Line;
	readonly BLANK_TABLATURE: Tablature;

	constructor(
		name: string,
		amountOfStrings: number,
		amountOfFrets: number,
		defaultTuning: number[],
		commonTunings: { [i: string]: number[] }
	) {
		this.name = name;
		this.amountOfStrings = amountOfStrings;
		this.amountOfFrets = amountOfFrets;
		this.defaultTuning = defaultTuning;
		this.commonTunings = commonTunings;
		this.BLANK_CELL = { modifier: null, fret: -1 };
		this.BLANK_COLUMN = {
			modifier: null,
			cells: new Array<Cell>(amountOfStrings).fill(this.BLANK_CELL),
		};
		this.BLANK_LINE = { columns: [this.BLANK_COLUMN, this.BLANK_COLUMN] };
		this.BLANK_TABLATURE = { lines: [this.BLANK_LINE] };
	}

	createInitialState(): TablatureStore {
		return {
			instrument: this,
			tuning: this.defaultTuning,
			tablature: this.BLANK_TABLATURE,
		};
	}
}

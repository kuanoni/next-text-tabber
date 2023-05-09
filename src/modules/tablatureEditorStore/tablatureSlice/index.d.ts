interface Cell {
	modifier: CellModifier | null;
	fret: number;
}

interface Column {
	modifier: ColumnModifier | null;
	cells: Cell[];
}

interface Section {
	name?: string;
	columns: Column[];
}

interface Tablature {
	sections: Section[];
}

interface TablatureSlice {
	instrument: import('@common/Instrument').Instrument;
	tuning: import('@common/Instrument').Instrument['defaultTuning'];
	tablature: Tablature;
}

interface CellModifierSnap {
	behavior: 'snap';
	symbolRight: string;
}

interface CellModifierWrap {
	behavior: 'wrap';
	symbolLeft: string;
	symbolRight: string;
}

type CellModifier = CellModifierSnap | CellModifierWrap;

interface ColumnModifier {
	start?: string;
	middle?: string;
	end?: string;
	filler: string;
}

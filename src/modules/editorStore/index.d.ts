interface Cell {
	notation: CellNotation | null;
	fret: number;
}

interface Column {
	id: number;
	notation: ColumnNotation | null;
	cells: Cell[];
}

interface Section {
	name: string;
	columns: Column[];
}

interface Tablature {
	sections: Section[];
}

interface CellNotationSnap {
	behavior: 'snap';
	symbolRight: string;
}

interface CellNotationWrap {
	behavior: 'wrap';
	symbolLeft: string;
	symbolRight: string;
}

type CellNotation = CellNotationSnap | CellNotationWrap;

interface ColumnNotation {
	start?: string;
	end?: string;
	filler: string;
}

type ColumnNotationPosition = 'start' | 'end' | 'middle' | 'solo' | undefined;

interface BlankColumnSelection {
	section: null;
	start: null;
	end: null;
}

interface NonBlankColumnSelection {
	section: number;
	start: number;
	end: number;
}

type ColumnSelection = BlankColumnSelection | NonBlankColumnSelection;

interface EditorStore {
	instrument: import('@modules/editorStore/Instrument').Instrument;
	tuning: import('@modules/editorStore/Instrument').Instrument['defaultTuning'];
	tablature: Tablature;

	isSelecting: boolean;
	ghostSelection: ColumnSelection;
	currentSelection: ColumnSelection;
	clipboard: Column[];
}

type InstrumentState = Pick<EditorStore, 'instrument' | 'tuning' | 'tablature'>;

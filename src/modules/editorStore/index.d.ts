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

type ColumnModifierPosition = 'start' | 'end' | 'middle' | 'solo' | undefined;

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
	clipboard: Columns[];
}

type InstrumentState = Pick<EditorStore, 'instrument' | 'tuning' | 'tablature'>;

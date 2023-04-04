interface Cell {
	modifier: NoteModifier | null;
	fret: number;
}

interface Column {
	modifier: ColumnModifier | null;
	cells: Cell[];
}

interface Line {
	columns: Column[];
}

interface Tablature {
	lines: Line[];
}

interface TablatureStore {
	instrument: import('@common/Instrument').Instrument;
	tablature: Tablature;
}

interface NoteModifierSnap {
	behavior: 'snap';
	symbolRight: string;
}

interface NoteModifierWrap {
	behavior: 'wrap';
	symbolLeft: string;
	symbolRight: string;
}

type NoteModifier = NoteModifierSnap | NoteModifierWrap;

interface ColumnModifier {
	start?: string;
	middle?: string;
	end?: string;
	filler: string;
}

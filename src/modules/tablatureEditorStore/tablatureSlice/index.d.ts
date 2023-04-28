interface Cell {
	modifier: NoteModifier | null;
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

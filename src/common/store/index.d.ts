interface Cell {
	modifier: NoteModifier | null;
	fret: number;
}

interface Column {
	modifier: ColumnModifier | null;
	cells: Cell[];
}

interface TablatureStore {
	columns: Column[];
}

interface NoteModifierSnap {
	behavior: 'snap';
	symbolRight: string;
}

interface NoteModifierWrap extends NoteModifier {
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

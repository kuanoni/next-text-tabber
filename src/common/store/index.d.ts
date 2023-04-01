interface Cell {
	modifier: NoteModifier | null;
	fret: number;
}

interface Column {
	modifier: ColumnModifier | null;
	cells: Cell[];
}

type Line = Column[];

interface TablatureStore {
	tablature: Line[];
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

interface EditorSlice {
	isSelecting: boolean;
	ghostSelection: ColumnSelection;
	currentSelection: ColumnSelection;
}

interface BlankColumnSelection {
	section: null;
	start: null;
	end: null;
}

interface ValidColumnSelection {
	section: number;
	start: number;
	end: number;
}

type ColumnSelection = BlankColumnSelection | ValidColumnSelection;

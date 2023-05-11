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

interface NonBlankColumnSelection {
	section: number;
	start: number;
	end: number;
}

type ColumnSelection = BlankColumnSelection | NonBlankColumnSelection;

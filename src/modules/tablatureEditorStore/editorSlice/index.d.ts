interface EditorSlice {
	isSelecting: boolean;
	ghostSelection: ColumnSelection;
	currentSelection: ColumnSelection;
}

interface ColumnSelection {
	line: number | null;
	start: number | null;
	end: number | null;
}

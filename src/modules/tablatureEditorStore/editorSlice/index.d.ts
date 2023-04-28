interface EditorSlice {
	isSelecting: boolean;
	ghostSelection: ColumnSelection;
	currentSelection: ColumnSelection;
}

interface ColumnSelection {
	section: number | null;
	start: number | null;
	end: number | null;
}

interface EditorSlice {
	isSelecting: boolean;
	selectedColumns: ColumnSelection;
}

interface ColumnSelection {
	line: number;
	start: number;
	end: number;
}

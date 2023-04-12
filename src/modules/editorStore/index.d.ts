interface EditorStore {
	isSelecting: boolean;
	selectedColumns: ColumnSelection;
}

interface ColumnSelection {
	line: number;
	start: number;
	end: number;
}

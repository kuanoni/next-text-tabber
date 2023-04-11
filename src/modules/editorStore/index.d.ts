interface EditorStore {
	selectedColumns: ColumnSelection;
}

interface ColumnSelection {
	line: number;
	start: number;
	end: number;
}

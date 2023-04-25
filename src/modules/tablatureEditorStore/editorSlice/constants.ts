export const BLANK_SELECTION: ColumnSelection = { line: null, start: null, end: null };

export const initialState: EditorSlice = {
	isSelecting: false,
	ghostSelection: BLANK_SELECTION,
	currentSelection: BLANK_SELECTION,
};
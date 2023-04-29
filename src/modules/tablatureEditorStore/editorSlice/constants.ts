export const BLANK_SELECTION: ColumnSelection = { section: null, start: null, end: null };

export const editorInitialState: EditorSlice = {
	isSelecting: false,
	ghostSelection: BLANK_SELECTION,
	currentSelection: BLANK_SELECTION,
};

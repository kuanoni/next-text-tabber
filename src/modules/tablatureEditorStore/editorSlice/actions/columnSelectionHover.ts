import { useTablatureEditorStore } from '../../useTablatureEditorStore';

export const columnSelectionHover = (lineIndex: number, columnIndex: number) =>
	useTablatureEditorStore.setState((state) => {
		// if selection finishes on different line, or outside a column component
		if (lineIndex !== state.selectedColumns.line || columnIndex < 0) return;

		state.selectedColumns = { ...state.selectedColumns, end: columnIndex };
	});

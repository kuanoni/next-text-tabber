import { editorStoreBase } from '../useEditorStore';

export const columnSelectionFinish = (line: number, end: number) => {
	editorStoreBase.setState((state) => {
		// if selection finishes on different line, or outside a column component
		if (line !== state.selectedColumns.line || end < 0) {
			state.selectedColumns = { ...state.selectedColumns, end: state.selectedColumns.start };
			return;
		}

		let start = state.selectedColumns.start;
		// swap values if necessary so start is always smaller than end
		if (start > end) [start, end] = [end, start];

		state.selectedColumns = { line, start, end };
	});
};

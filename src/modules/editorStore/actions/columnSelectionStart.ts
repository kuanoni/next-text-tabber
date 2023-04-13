import { editorStoreBase } from '../useEditorStore';

export const columnSelectionStart = (lineIndex: number, columnIndex: number) => {
	editorStoreBase.setState((state) => {
		state.isSelecting = true;
		state.selectedColumns = {
			line: lineIndex,
			start: columnIndex,
			end: columnIndex,
		};
	});
};

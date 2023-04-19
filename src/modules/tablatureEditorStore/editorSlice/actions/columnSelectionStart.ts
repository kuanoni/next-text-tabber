import { useTablatureEditorStore } from '../../useTablatureEditorStore';

export const columnSelectionStart = (lineIndex: number, columnIndex: number) => {
	useTablatureEditorStore.setState((state) => {
		state.isSelecting = true;
		state.selectedColumns = {
			line: lineIndex,
			start: columnIndex,
			end: columnIndex,
		};
	});
};

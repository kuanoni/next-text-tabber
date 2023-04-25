import { useTablatureEditorStore } from '../../useTablatureEditorStore';
import { BLANK_SELECTION } from '../constants';

export const columnSelectionStart = (lineIndex: number, columnIndex: number) =>
	useTablatureEditorStore.setState((state) => {
		state.isSelecting = true;
		state.ghostSelection = {
			line: lineIndex,
			start: columnIndex,
			end: columnIndex,
		};
		state.currentSelection = BLANK_SELECTION;
	});

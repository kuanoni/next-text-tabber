import { useTablatureEditorStore } from '../../useTablatureEditorStore';
import { BLANK_SELECTION } from '../constants';

export const columnSelectionStart = (sectionIndex: number, columnIndex: number) =>
	useTablatureEditorStore.setState((state) => {
		state.isSelecting = true;
		state.ghostSelection = {
			section: sectionIndex,
			start: columnIndex,
			end: columnIndex,
		};
		state.currentSelection = BLANK_SELECTION;
	});

import { BLANK_SELECTION } from '../constants';
import { useTablatureEditorStore } from '../useTablatureEditorStore';

export const resetColumnSelection = () =>
	useTablatureEditorStore.setState((state) => {
		state.isSelecting = false;
		state.currentSelection = BLANK_SELECTION;
		state.ghostSelection = BLANK_SELECTION;
	});

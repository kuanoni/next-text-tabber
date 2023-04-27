import { useTablatureEditorStore } from '../../useTablatureEditorStore';
import { BLANK_SELECTION } from '../constants';

export const resetColumnSelection = () =>
	useTablatureEditorStore.setState((state) => {
		state.isSelecting = false;
		state.currentSelection = BLANK_SELECTION;
		state.ghostSelection = BLANK_SELECTION;
	});

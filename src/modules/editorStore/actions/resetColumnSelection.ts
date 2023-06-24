import { BLANK_SELECTION } from '../constants';
import { useEditorStore } from '../useEditorStore';

export const resetColumnSelection = () =>
	useEditorStore.setState((state) => {
		state.isSelecting = false;
		state.currentSelection = BLANK_SELECTION;
		state.ghostSelection = BLANK_SELECTION;
	});

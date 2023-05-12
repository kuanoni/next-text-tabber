import { BLANK_SELECTION } from '@modules/editorStore/constants';
import { useTablatureEditorStore } from '@modules/editorStore/useTablatureEditorStore';
import { validateColumnSelection } from '@modules/editorStore/utils/validateColumnSelection';

export const columnSelectionFinish = () =>
	useTablatureEditorStore.setState((state) => {
		const ghostSelection = validateColumnSelection(state.ghostSelection, state.tablature);

		const [start, end] =
			ghostSelection.start <= ghostSelection.end
				? [ghostSelection.start, ghostSelection.end]
				: [ghostSelection.end, ghostSelection.start];

		state.isSelecting = false;
		state.currentSelection = { ...ghostSelection, start, end };
		state.ghostSelection = BLANK_SELECTION;
	});

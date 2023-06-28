import { BLANK_SELECTION } from '@modules/editorStore/constants';
import { useEditorStore } from '@modules/editorStore/useEditorStore';

import { validateSelection } from '../utils';

export const selectionFinish = () =>
	useEditorStore.setState((state) => {
		const ghostSelection = validateSelection(state.ghostSelection, state.tablature);

		const [start, end] =
			ghostSelection.start <= ghostSelection.end
				? [ghostSelection.start, ghostSelection.end]
				: [ghostSelection.end, ghostSelection.start];

		state.isSelecting = false;
		state.currentSelection = { ...ghostSelection, start, end };
		state.ghostSelection = BLANK_SELECTION;
	});

import { useTablatureEditorStore } from '../../useTablatureEditorStore';
import { BLANK_SELECTION } from '../constants';

export const columnSelectionFinish = () =>
	useTablatureEditorStore.setState((state) => {
		const { ghostSelection } = state;

		if (ghostSelection.section === null || ghostSelection.start === null || ghostSelection.end === null)
			throw new Error(
				`Attempted to finish selection with a null value, section=${ghostSelection.section} start=${ghostSelection.start}, end=${ghostSelection.end}`
			);

		const [start, end] =
			ghostSelection.start <= ghostSelection.end
				? [ghostSelection.start, ghostSelection.end]
				: [ghostSelection.end, ghostSelection.start];

		state.isSelecting = false;
		state.currentSelection = { ...ghostSelection, start, end };
		state.ghostSelection = BLANK_SELECTION;
	});

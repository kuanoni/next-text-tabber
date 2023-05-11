import { useTablatureEditorStore } from '../../useTablatureEditorStore';
import { validateColumnSelection } from '../../utils/validateColumnSelection';
import { BLANK_SELECTION } from '../constants';

export const columnSelectionStart = (sectionIndex: number, columnIndex: number) =>
	useTablatureEditorStore.setState((state) => {
		const selection = validateColumnSelection(
			{
				section: sectionIndex,
				start: columnIndex,
				end: columnIndex,
			},
			state.tablature
		);

		state.isSelecting = true;
		state.ghostSelection = selection;
		state.currentSelection = BLANK_SELECTION;
	});

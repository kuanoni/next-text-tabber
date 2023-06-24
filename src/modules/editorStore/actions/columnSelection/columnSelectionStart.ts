import { BLANK_SELECTION } from '../../constants';
import { useEditorStore } from '../../useEditorStore';
import { validateColumnSelection } from '../../utils/validateColumnSelection';

export const columnSelectionStart = (sectionIndex: number, columnIndex: number) =>
	useEditorStore.setState((state) => {
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

import { BLANK_SELECTION } from '../../constants';
import { useEditorStore } from '../../useEditorStore';
import { validateSelection } from '../utils';

export const selectionStart = (sectionIndex: number, columnIndex: number) =>
	useEditorStore.setState((state) => {
		const selection = validateSelection(
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

import { useEditorStore } from '../../useEditorStore';
import { validateColumnSelection } from '../../utils/validateColumnSelection';

export const columnSelectionHover = (sectionIndex: number, columnIndex: number) =>
	useEditorStore.setState((state) => {
		// ignore if selection hovers on different section
		if (sectionIndex !== state.ghostSelection.section) return;

		const selection = validateColumnSelection({ ...state.ghostSelection, end: columnIndex }, state.tablature);

		state.ghostSelection = selection;
	});

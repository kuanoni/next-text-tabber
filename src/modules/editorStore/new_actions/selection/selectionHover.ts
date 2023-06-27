import { useEditorStore } from '../../useEditorStore';
import { validateSelection } from '../utils';

export const selectionHover = (sectionIndex: number, columnIndex: number) =>
	useEditorStore.setState((state) => {
		// ignore if selection hovers on different section
		if (sectionIndex !== state.ghostSelection.section) return;

		const selection = validateSelection({ ...state.ghostSelection, end: columnIndex }, state.tablature);

		state.ghostSelection = selection;
	});

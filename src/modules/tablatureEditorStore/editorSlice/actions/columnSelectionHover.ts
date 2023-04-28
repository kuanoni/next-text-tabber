import { useTablatureEditorStore } from '../../useTablatureEditorStore';

export const columnSelectionHover = (sectionIndex: number, columnIndex: number) =>
	useTablatureEditorStore.setState((state) => {
		// ignore if selection hovers on different section
		if (sectionIndex !== state.ghostSelection.section) return;

		const section = state.tablature.sections[sectionIndex];
		if (!section) throw new Error(`Attempted to hover on out of bounds sectionIndex: ${sectionIndex}`);

		// if hovered columnIndex is somehow outside the bounds of the section's columns
		if (columnIndex < 0 || columnIndex > section.columns.length - 1)
			throw new Error(
				`Attempted to hover on out of bounds columnIndex ${columnIndex} at sectionIndex ${sectionIndex}`
			);

		state.ghostSelection = { ...state.ghostSelection, end: columnIndex };
	});

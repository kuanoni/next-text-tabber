import { useTablatureEditorStore } from '../../useTablatureEditorStore';

export const columnSelectionHover = (lineIndex: number, columnIndex: number) =>
	useTablatureEditorStore.setState((state) => {
		// ignore if selection hovers on different line
		if (lineIndex !== state.ghostSelection.line) return;

		const line = state.tablature.lines[lineIndex];
		if (!line) throw new Error(`Attempted to hover on out of bounds lineIndex: ${lineIndex}`);

		// if hovered columnIndex is somehow outside the bounds of the line's columns
		if (columnIndex < 0 || columnIndex > line.columns.length - 1)
			throw new Error(`Attempted to hover on out of bounds columnIndex ${columnIndex} at lineIndex ${lineIndex}`);

		state.ghostSelection = { ...state.ghostSelection, end: columnIndex };
	});

import { useEditorStore } from '@modules/editorStore/useEditorStore';

import { validateSelection } from '../utils';

/**
 * For each column in the selection, assigns the provided `fretValue` to the cell at index of `cellIndex`.
 *
 * If the fret value of each of those cells is already equal to `fretValue`, instead set all of
 * those cells blank.
 *
 * @param cellIndex - the target cell's index AKA the instrument's string number.
 * @param fretValue - the fret value to assign the cell.
 */
export const toggleFret = (cellIndex: number, fretValue: number) =>
	useEditorStore.setState((state) => {
		const { section, start, end } = validateSelection(state.currentSelection, state.tablature);

		// Checks to see if all the targeted cell fret values are already equal to fretValue
		const shouldBeBlank = state.tablature.sections[section].columns
			.slice(start, end + 1)
			.every((col) => col.cells[cellIndex].fret === fretValue);

		for (let i = start; i < end + 1; i++) {
			if (shouldBeBlank) state.tablature.sections[section].columns[i].cells[cellIndex].fret = -1;
			else state.tablature.sections[section].columns[i].cells[cellIndex].fret = fretValue;
		}
	});

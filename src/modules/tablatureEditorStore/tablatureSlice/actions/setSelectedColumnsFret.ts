import { useTablatureEditorStore } from '@modules/tablatureEditorStore/useTablatureEditorStore';

import { iterateColumnSelection } from './utils/iterateColumnSelection';

export const setSelectedColumnsFret = (stringNumber: number, fretNumber: number) =>
	useTablatureEditorStore.setState((state) => {
		if (
			state.currentSelection.section === null ||
			state.currentSelection.start === null ||
			state.currentSelection.end === null
		)
			return console.warn(
				`Attempted to set frets of column selection with null value: ${state.currentSelection}`
			);

		iterateColumnSelection((i, currentSelection) => {
			state.tablature.sections[currentSelection.section].columns[i].cells[stringNumber].fret = fretNumber;
		});
	});

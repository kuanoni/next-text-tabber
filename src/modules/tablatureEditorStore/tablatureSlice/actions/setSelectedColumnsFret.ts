import { useTablatureEditorStore } from '@modules/tablatureEditorStore/useTablatureEditorStore';

import { iterateColumnSelection } from './utils/iterateColumnSelection';

export const setSelectedColumnsFret = (stringNumber: number, fretNumber: number) =>
	useTablatureEditorStore.setState((state) =>
		iterateColumnSelection((i, currentSelection) => {
			state.tablature.lines[currentSelection.line].columns[i].cells[stringNumber].fret = fretNumber;
		})
	);

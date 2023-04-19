import { useTablatureEditorStore } from '@modules/tablatureEditorStore/useTablatureEditorStore';

import { iterateColumnSelection } from './utils/iterateColumnSelection';

export const setSelectedColumnsFret = (stringNumber: number, fretNumber: number) =>
	useTablatureEditorStore.setState((state) => {
		const { line } = state.selectedColumns;

		iterateColumnSelection((i) => {
			state.tablature.lines[line].columns[i].cells[stringNumber].fret = fretNumber;
		});
	});

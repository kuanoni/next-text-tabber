import { useTablatureEditorStore } from '@modules/editorStore/useTablatureEditorStore';

import { useTablatureEditorStore } from '../../useTablatureEditorStore';
import { iterateColumnSelection } from './utils/iterateColumnSelection';

export const setSelectedColumnsFret = (stringNumber: number, fretNumber: number) => {
	const { line } = useTablatureEditorStore.getState().selectedColumns;

	useTablatureEditorStore.setState((state) => {
		iterateColumnSelection((i) => {
			state.tablature.lines[line].columns[i].cells[stringNumber].fret = fretNumber;
		});
	});
};

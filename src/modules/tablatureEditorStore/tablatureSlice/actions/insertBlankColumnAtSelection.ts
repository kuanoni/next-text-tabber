import { useTablatureEditorStore } from '../../useTablatureEditorStore';
import { insertColumns } from './utils/insertColumns';

export const insertBlankColumnAtSelection = () =>
	useTablatureEditorStore.setState((state) => {
		const { line, end } = state.currentSelection;

		if (line === null || end === null)
			return console.warn(`Attempting to insert column with null selection - line: ${line} - end: ${end}`);

		if (!state.tablature.lines[line]) throw new Error(`Tried to insert column in non-existant line: ${line}`);

		insertColumns(state, line, end, [state.instrument.BLANK_COLUMN]);
	});

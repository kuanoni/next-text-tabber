import { useTablatureEditorStore } from '../../useTablatureEditorStore';
import { insertColumns } from './utils/insertColumns';

export const insertColumnsAtSelection = (column?: Column[]) =>
	useTablatureEditorStore.setState((state) => {
		const { line, end } = state.currentSelection;

		if (line === null || end === null)
			return console.warn(`Attempting to insert column with null selection - line: ${line} - end: ${end}`);

		if (!state.tablature.lines[line]) throw new Error(`Tried to insert column in non-existant line: ${line}`);

		// by default, insert single blank column
		if (!column) column = [state.instrument.BLANK_COLUMN];

		insertColumns(state, line, end, column);
	});

import { useTablatureEditorStore } from '../../useTablatureEditorStore';
import { insertColumns } from './utils/insertColumns';

export const insertBlankColumnAtSelection = () =>
	useTablatureEditorStore.setState((state) => {
		const { line, end } = state.selectedColumns;
		if (!state.tablature.lines[line]) return console.error(`Tried to insert column in non-existant line: ${line}`);

		insertColumns(state, line, end, [state.instrument.BLANK_COLUMN]);
	});

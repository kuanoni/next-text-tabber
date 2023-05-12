import { insertColumns } from './insertColumns';
import { validateColumnSelection } from './validateColumnSelection';

export const replaceColumns = (state: EditorStore, selection: ColumnSelection, columnsToInsert: Column[]) => {
	const { section, start, end } = validateColumnSelection(selection, state.tablature);
	const selectionSize = end - start + 1;

	if (start - end === 0) return insertColumns(state, selection, columnsToInsert);

	state.tablature.sections[section].columns.splice(start, selectionSize, ...columnsToInsert);
	const newSelection = validateColumnSelection(
		{ section, start, end: start + columnsToInsert.length - 1 },
		state.tablature
	);
	state.currentSelection = newSelection;
};

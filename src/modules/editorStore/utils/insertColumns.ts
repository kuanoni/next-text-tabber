import { validateColumnSelection } from './validateColumnSelection';

export const insertColumns = (state: EditorStore, selection: ColumnSelection, columnsToInsert: Column[]) => {
	const { section, end } = validateColumnSelection(selection, state.tablature);

	state.tablature.sections[section].columns.splice(end + 1, 0, ...columnsToInsert);
};

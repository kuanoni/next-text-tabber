import { validateColumnSelection } from '@modules/tablatureEditorStore/utils/validateColumnSelection';

export const insertColumns = (state: TablatureEditorStore, selection: ColumnSelection, columnsToInsert: Column[]) => {
	const { section, end } = validateColumnSelection(selection, state.tablature);

	state.tablature.sections[section].columns.splice(end + 1, 0, ...columnsToInsert);
};

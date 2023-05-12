import { useTablatureEditorStore } from '../useTablatureEditorStore';
import { insertColumns } from '../utils/insertColumns';
import { validateColumnSelection } from '../utils/validateColumnSelection';

export const duplicateSelectedColumns = () =>
	useTablatureEditorStore.setState((state) => {
		const { section, start, end } = validateColumnSelection(state.currentSelection, state.tablature);

		const columns = state.tablature.sections[section].columns.slice(start, end + 1);

		insertColumns(state, state.currentSelection, columns);
	});

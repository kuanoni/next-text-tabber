import { useEditorStore } from '../useEditorStore';
import { insertColumns } from '../utils/insertColumns';
import { validateColumnSelection } from '../utils/validateColumnSelection';

export const duplicateSelectedColumns = () =>
	useEditorStore.setState((state) => {
		const { section, start, end } = validateColumnSelection(state.currentSelection, state.tablature);

		const columns = state.tablature.sections[section].columns.slice(start, end + 1);

		insertColumns(state, state.currentSelection, columns);
	});

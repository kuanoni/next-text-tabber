import { validateColumnSelection } from '@modules/tablatureEditorStore/utils/validateColumnSelection';

import { useTablatureEditorStore } from '../../useTablatureEditorStore';
import { insertColumns } from './utils/insertColumns';

export const duplicateSelectedColumns = () =>
	useTablatureEditorStore.setState((state) => {
		const { section, start, end } = validateColumnSelection(state.currentSelection, state.tablature);

		const columns = state.tablature.sections[section].columns.slice(start, end + 1);

		insertColumns(state, section, end, columns);
	});

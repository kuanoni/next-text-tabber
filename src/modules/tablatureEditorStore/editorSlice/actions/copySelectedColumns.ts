import { validateColumnSelection } from '@modules/tablatureEditorStore/utils/validateColumnSelection';

import { useTablatureEditorStore } from '../../useTablatureEditorStore';

export const copySelectedColumns = () =>
	useTablatureEditorStore.setState((state) => {
		const { section, start, end } = validateColumnSelection(state.currentSelection, state.tablature);

		const columns = state.tablature.sections[section].columns.slice(start, end + 1);

		state.clipboard = columns;
	});

import { useTablatureEditorStore } from '../useTablatureEditorStore';
import { validateColumnSelection } from '../utils/validateColumnSelection';

export const copySelectedColumns = () =>
	useTablatureEditorStore.setState((state) => {
		const { section, start, end } = validateColumnSelection(state.currentSelection, state.tablature);

		const columns = state.tablature.sections[section].columns.slice(start, end + 1);

		state.clipboard = columns;
	});

import { useEditorStore } from '../../useEditorStore';
import { validateColumnSelection } from '../../utils/validateColumnSelection';

export const copySelectedColumns = () =>
	useEditorStore.setState((state) => {
		const { section, start, end } = validateColumnSelection(state.currentSelection, state.tablature);

		const columns = state.tablature.sections[section].columns.slice(start, end + 1);

		state.clipboard = columns;
	});

import { useEditorStore } from '../../useEditorStore';
import { validateSelection } from '../utils';

export const copyColumns = () =>
	useEditorStore.setState((state) => {
		const { section, start, end } = validateSelection(state.currentSelection, state.tablature);
		const columns = state.tablature.sections[section].columns.slice(start, end + 1);
		state.clipboard = columns;
	});

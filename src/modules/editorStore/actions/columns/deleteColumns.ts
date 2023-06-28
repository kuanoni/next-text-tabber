import { useEditorStore } from '../../useEditorStore';
import { validateSelection } from '../utils';

export const deleteColumns = () =>
	useEditorStore.setState((state) => {
		const { section, start, end } = validateSelection(state.currentSelection, state.tablature);

		const selectionSize = end - start + 1;
		state.tablature.sections[section].columns.splice(start, selectionSize);
	});

import { useEditorStore } from '../../useEditorStore';
import { validateSelection } from '../utils';

export const deleteColumns = () =>
	useEditorStore.setState((state) => {
		const { section, start, end } = validateSelection(state.currentSelection, state.tablature);

		const selectionSize = end - start + 1;
		state.tablature.sections[section].columns.splice(start, selectionSize);

		const columnsLen = state.tablature.sections[section].columns.length - 1;

		if (start > columnsLen) {
			// If selection start is out of bounds, set selection to the last column of the section...
			state.currentSelection = {
				section,
				start: columnsLen,
				end: columnsLen,
			};
		} else {
			// ...otherwise, just shrink the selection size down to 1 column
			state.currentSelection = { section, start, end: start };
		}
	});

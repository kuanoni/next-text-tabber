import { useEditorStore } from '../../useEditorStore';
import { validateSelection } from '../utils';
import { replaceColumns } from './replaceColumns';

export const insertColumns = (...columns: Column[]) => {
	let shouldReplace = false;
	useEditorStore.setState((state) => {
		const { section, start, end } = validateSelection(state.currentSelection, state.tablature);
		const selectionSize = end - start + 1;
		if (selectionSize === 1) state.tablature.sections[section].columns.splice(start, 0, ...columns);
		else shouldReplace = true;
	});

	if (shouldReplace) replaceColumns(...columns);
};

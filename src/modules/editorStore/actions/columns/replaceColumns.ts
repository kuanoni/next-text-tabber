import { useEditorStore } from '../../useEditorStore';
import { validateSelection } from '../utils';

export const replaceColumns = (...columns: Column[]) =>
	useEditorStore.setState((state) => {
		const { section, start, end } = validateSelection(state.currentSelection, state.tablature);

		const selectionSize = end - start + 1;

		state.tablature.sections[section].columns.splice(
			start,
			selectionSize,
			...columns.map((c, i) => {
				if (i < selectionSize && i + start < state.tablature.sections[section].columns.length)
					return { ...c, id: state.tablature.sections[section].columns[i + start].id };
				else return c;
			})
		);
	});

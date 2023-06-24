import { useEditorStore } from '../useEditorStore';
import { validateColumnSelection } from '../utils/validateColumnSelection';

export const deleteColumns = (selection: ColumnSelection) =>
	useEditorStore.setState((state) => {
		const { section, start, end } = validateColumnSelection(selection, state.tablature);
		state.tablature.sections[section].columns.splice(start, end - start + 1);

		// Prevent columns array from becoming empty
		if (state.tablature.sections[section].columns.length === 0)
			state.tablature.sections[section].columns = [state.instrument.createBlankColumn()];

		// Reset currentSelection to prevent selection from being out of bounds
		if (start > state.tablature.sections[section].columns.length - 1)
			state.currentSelection = { section, start: start - 1, end: start - 1 };
		else state.currentSelection = { section, start: start, end: start };
	});

import { useEditorStore } from '../../useEditorStore';
import { validateSelection } from '../utils';

export const setColumnsNotation = (notation: ColumnNotation | null) =>
	useEditorStore.setState((state) => {
		const { section, start, end } = validateSelection(state.currentSelection, state.tablature);

		for (let i = start; i < end + 1; i++) state.tablature.sections[section].columns[i].notation = notation;
	});

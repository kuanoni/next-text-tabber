import { useEditorStore } from '../../useEditorStore';
import { validateSelection } from '../utils';

export const clearColumns = () =>
	useEditorStore.setState((state) => {
		const { section, start, end } = validateSelection(state.currentSelection, state.tablature);

		for (let i = start; i < end + 1; i++) {
			state.tablature.sections[section].columns[i].notation = null;
			for (let j = 0; j < state.tablature.sections[section].columns[i].cells.length; j++) {
				state.tablature.sections[section].columns[i].cells[j].notation = null;
				state.tablature.sections[section].columns[i].cells[j].fret = -1;
			}
		}
	});

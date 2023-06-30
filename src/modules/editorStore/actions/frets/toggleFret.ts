import { useEditorStore } from '@modules/editorStore/useEditorStore';

import { validateSelection } from '../utils';

export const toggleFret = (stringNumber: number, value: number) =>
	useEditorStore.setState((state) => {
		const { section, start, end } = validateSelection(state.currentSelection, state.tablature);

		for (let i = start; i < end + 1; i++) {
			if (state.tablature.sections[section].columns[i].cells[stringNumber].fret === value)
				state.tablature.sections[section].columns[i].cells[stringNumber].fret = -1;
			else state.tablature.sections[section].columns[i].cells[stringNumber].fret = value;
		}
	});

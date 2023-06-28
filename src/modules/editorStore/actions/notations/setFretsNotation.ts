import { useEditorStore } from '@modules/editorStore/useEditorStore';

import { validateSelection } from '../utils';

export const setFretsNotation = (notation: CellNotation) =>
	useEditorStore.setState((state) => {
		const { section, start, end } = validateSelection(state.currentSelection, state.tablature);

		for (let i = start; i < end + 1; i++)
			for (let j = 0; j < state.instrument.amountOfStrings; j++)
				if (state.tablature.sections[section].columns[i].cells[j].fret !== -1)
					state.tablature.sections[section].columns[i].cells[j].notation = notation;
	});

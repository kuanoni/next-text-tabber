import { useTablatureEditorStore } from '../../useTablatureEditorStore';
import { insertColumns } from './utils/insertColumns';

export const insertColumnsAtSelection = (column?: Column[]) =>
	useTablatureEditorStore.setState((state) => {
		const { section, end } = state.currentSelection;

		if (section === null || end === null)
			return console.warn(`Attempting to insert column with null selection - section: ${section} - end: ${end}`);

		if (!state.tablature.sections[section])
			throw new Error(`Tried to insert column in non-existant section: ${section}`);

		// by default, insert single blank column
		if (!column) column = [state.instrument.BLANK_COLUMN];

		insertColumns(state, section, end, column);
	});

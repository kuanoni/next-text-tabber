import { useTablatureEditorStore } from '../../useTablatureEditorStore';
import { insertColumns } from './utils/insertColumns';

export const insertColumnsAtSelection = (column?: Column[]) =>
	useTablatureEditorStore.setState((state) => {
		// by default, insert single blank column
		if (!column) column = [state.instrument.BLANK_COLUMN];

		insertColumns(state, state.currentSelection, column);
	});

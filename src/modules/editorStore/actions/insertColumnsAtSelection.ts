import { useTablatureEditorStore } from '../useTablatureEditorStore';
import { insertColumns } from '../utils/insertColumns';

export const insertColumnsAtSelection = (column?: Column[]) =>
	useTablatureEditorStore.setState((state) => {
		// by default, insert single blank column
		if (!column) column = [state.instrument.createBlankColumn()];

		insertColumns(state, state.currentSelection, column);
	});

import { useEditorStore } from '../useEditorStore';
import { insertColumns } from '../utils/insertColumns';

export const insertColumnsAtSelection = (column?: Column[]) =>
	useEditorStore.setState((state) => {
		// by default, insert single blank column
		if (!column) column = [state.instrument.createBlankColumn()];

		insertColumns(state, state.currentSelection, column);
	});

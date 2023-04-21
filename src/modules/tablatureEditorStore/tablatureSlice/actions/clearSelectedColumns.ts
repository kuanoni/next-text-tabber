import { useTablatureEditorStore } from '@modules/tablatureEditorStore/useTablatureEditorStore';

import { iterateColumnSelection } from './utils/iterateColumnSelection';

export const clearSelectedColumns = () =>
	useTablatureEditorStore.setState((state) => {
		const { line } = state.selectedColumns;

		iterateColumnSelection((i) => {
			state.tablature.lines[line].columns[i] = state.instrument.BLANK_COLUMN;
		});
	});

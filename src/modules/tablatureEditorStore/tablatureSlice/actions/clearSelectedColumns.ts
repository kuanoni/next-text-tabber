import { useTablatureEditorStore } from '@modules/tablatureEditorStore/useTablatureEditorStore';

import { iterateColumnSelection } from './utils/iterateColumnSelection';

export const clearSelectedColumns = () =>
	useTablatureEditorStore.setState((state) =>
		iterateColumnSelection((i, currentSelection) => {
			state.tablature.sections[currentSelection.section].columns[i] = state.instrument.BLANK_COLUMN;
		})
	);

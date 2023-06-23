import { useTablatureEditorStore } from '../useTablatureEditorStore';
import { iterateColumnSelection } from '../utils/iterateColumnSelection';

export const clearSelectedColumns = () =>
	useTablatureEditorStore.setState((state) =>
		iterateColumnSelection((i, currentSelection) => {
			state.tablature.sections[currentSelection.section].columns[i] = state.instrument.createBlankColumn();
		})
	);

import { useEditorStore } from '../useEditorStore';
import { iterateColumnSelection } from '../utils/iterateColumnSelection';

export const clearSelectedColumns = () =>
	useEditorStore.setState((state) =>
		iterateColumnSelection((i, currentSelection) => {
			state.tablature.sections[currentSelection.section].columns[i] = state.instrument.createBlankColumn();
		})
	);

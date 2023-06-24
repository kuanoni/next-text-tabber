import { useEditorStore } from '../useEditorStore';
import { iterateColumnSelection } from '../utils/iterateColumnSelection';

export const clearSelectedColumnsModifiers = () =>
	useEditorStore.setState((state) =>
		iterateColumnSelection((i, currentSelection) => {
			state.tablature.sections[currentSelection.section].columns[i].modifier = null;
		})
	);

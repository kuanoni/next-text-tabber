import { useEditorStore } from '../useEditorStore';
import { iterateColumnSelection } from '../utils/iterateColumnSelection';

export const setSelectedColumnsModifiers = (modifier: ColumnModifier) =>
	useEditorStore.setState((state) =>
		iterateColumnSelection((i, currentSelection) => {
			state.tablature.sections[currentSelection.section].columns[i].modifier = modifier;
		})
	);

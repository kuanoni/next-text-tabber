import { useTablatureEditorStore } from '../useTablatureEditorStore';
import { iterateColumnSelection } from '../utils/iterateColumnSelection';

export const setSelectedColumnsModifiers = (modifier: ColumnModifier) =>
	useTablatureEditorStore.setState((state) =>
		iterateColumnSelection((i, currentSelection) => {
			state.tablature.sections[currentSelection.section].columns[i].modifier = modifier;
		})
	);

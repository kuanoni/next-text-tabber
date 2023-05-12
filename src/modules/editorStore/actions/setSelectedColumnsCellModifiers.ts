import { useTablatureEditorStore } from '../useTablatureEditorStore';
import { iterateColumnSelection } from '../utils/iterateColumnSelection';

export const setSelectedColumnsCellModifiers = (modifier: CellModifier) =>
	useTablatureEditorStore.setState((state) =>
		iterateColumnSelection((i, currentSelection) => {
			const newCells = state.tablature.sections[currentSelection.section].columns[i].cells.map((cell) => {
				if (cell.fret === -1) return cell;
				return { ...cell, modifier };
			});

			state.tablature.sections[currentSelection.section].columns[i].cells = newCells;
		})
	);

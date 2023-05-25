import { useTablatureEditorStore } from '../useTablatureEditorStore';
import { deleteColumns } from './deleteColumns';

export const deleteSelectedColumns = () => {
	const currentSelection = useTablatureEditorStore.getState().currentSelection;
	deleteColumns(currentSelection);
};

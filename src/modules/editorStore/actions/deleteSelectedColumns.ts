import { useEditorStore } from '../useEditorStore';
import { deleteColumns } from './deleteColumns';

export const deleteSelectedColumns = () => {
	const currentSelection = useEditorStore.getState().currentSelection;
	deleteColumns(currentSelection);
};

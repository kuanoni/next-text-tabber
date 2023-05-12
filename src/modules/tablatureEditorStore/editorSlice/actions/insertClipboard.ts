import { insertColumns } from '@modules/tablatureEditorStore/tablatureSlice/actions/utils/insertColumns';
import { useTablatureEditorStore } from '@modules/tablatureEditorStore/useTablatureEditorStore';

export const insertClipboard = () =>
	useTablatureEditorStore.setState((state) => {
		insertColumns(state, state.currentSelection, state.clipboard);
	});

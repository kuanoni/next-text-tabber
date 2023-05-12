import { useTablatureEditorStore } from '../useTablatureEditorStore';
import { insertColumns } from '../utils/insertColumns';

export const insertClipboard = () =>
	useTablatureEditorStore.setState((state) => {
		insertColumns(state, state.currentSelection, state.clipboard);
	});

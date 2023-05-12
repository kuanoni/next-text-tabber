import { useTablatureEditorStore } from '@modules/tablatureEditorStore/useTablatureEditorStore';

export const setClipboard = (columns: Column[]) =>
	useTablatureEditorStore.setState((state) => {
		state.clipboard = columns;
	});

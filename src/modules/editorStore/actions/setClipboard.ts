import { useTablatureEditorStore } from '../useTablatureEditorStore';

export const setClipboard = (columns: Column[]) =>
	useTablatureEditorStore.setState((state) => {
		state.clipboard = columns;
	});

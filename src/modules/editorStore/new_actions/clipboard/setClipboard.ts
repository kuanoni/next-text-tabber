import { useEditorStore } from '../../useEditorStore';

export const setClipboard = (columns: Column[]) =>
	useEditorStore.setState((state) => {
		state.clipboard = columns;
	});

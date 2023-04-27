import { useTablatureEditorStore } from '../../useTablatureEditorStore';

export const setColumnSelection = (line: number, start: number, end: number) =>
	useTablatureEditorStore.setState((state) => {
		state.currentSelection = { line, start, end };
	});

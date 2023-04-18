import { useTablatureEditorStore } from '../../useTablatureEditorStore';

export const setColumnSelection = (line: number, start: number, end: number) => {
	useTablatureEditorStore.setState((state) => {
		state.selectedColumns = { line, start, end };
	});
};

import { useTablatureEditorStore } from '../../useTablatureEditorStore';

export const setColumnSelection = (line: number, start: number, end: number) =>
	useTablatureEditorStore.setState((state) => {
		// make sure start is smaller or equal to end
		const [start_, end_] = start <= end ? [start, end] : [end, start];

		state.currentSelection = { line, start: start_, end: end_ };
	});

import { useEditorStore } from '../../useEditorStore';

export const setColumnSelection = (section: number, start: number, end: number) =>
	useEditorStore.setState((state) => {
		// make sure start is smaller or equal to end
		const [start_, end_] = start <= end ? [start, end] : [end, start];

		state.currentSelection = { section, start: start_, end: end_ };
	});

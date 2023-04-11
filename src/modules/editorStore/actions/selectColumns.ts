import { editorStoreBase } from '../useEditorStore';

export const selectColumns = (line: number, start: number, end: number) => {
	editorStoreBase.setState((state) => {
		// swap values so start is always smaller than end
		if (start > end) [start, end] = [end, start];
		state.selectedColumns = { line, start, end };
	});
};

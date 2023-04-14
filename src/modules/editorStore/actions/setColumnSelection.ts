import { editorStoreBase } from '../useEditorStore';

export const setColumnSelection = (line: number, start: number, end: number) => {
	editorStoreBase.setState((state) => {
		state.selectedColumns = { line, start, end };
	});
};

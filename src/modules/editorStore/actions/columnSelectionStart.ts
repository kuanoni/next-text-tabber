import { editorStoreBase } from '../useEditorStore';

export const columnSelectionStart = (line: number, start: number) => {
	editorStoreBase.setState((state) => {
		state.selectedColumns = {
			line,
			start,
			end: start,
		};
	});
};

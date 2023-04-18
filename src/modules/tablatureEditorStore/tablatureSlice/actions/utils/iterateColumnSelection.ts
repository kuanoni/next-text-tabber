import { useTablatureEditorStore } from '@modules/editorStore/useTablatureEditorStore';

export const iterateColumnSelection = (cb: (i: number) => void) => {
	const selectedColumns = useTablatureEditorStore.getState().selectedColumns;

	if (selectedColumns.line < 0 || selectedColumns.start < 0 || selectedColumns.end < 0) return;

	const [start, end] =
		selectedColumns.start < selectedColumns.end
			? [selectedColumns.start, selectedColumns.end]
			: [selectedColumns.end, selectedColumns.start];

	for (let i = start; i < end + 1; i++) cb(i);
};

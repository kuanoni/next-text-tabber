import { useEditorStore } from '../../useEditorStore';
import { insertColumns } from '../../utils/insertColumns';

export const insertClipboard = () =>
	useEditorStore.setState((state) => {
		insertColumns(state, state.currentSelection, state.clipboard);
	});

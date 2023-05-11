import { replaceColumns } from '@modules/tablatureEditorStore/tablatureSlice/actions/utils/replaceColumns';
import { useTablatureEditorStore } from '@modules/tablatureEditorStore/useTablatureEditorStore';

export const pasteClipboard = () =>
	useTablatureEditorStore.setState((state) => {
		replaceColumns(state, state.currentSelection, state.clipboard);
	});

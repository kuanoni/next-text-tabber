import { useTablatureEditorStore } from '../../useTablatureEditorStore';
import { replaceColumns } from '../../utils/replaceColumns';

export const pasteClipboard = () =>
	useTablatureEditorStore.setState((state) => {
		replaceColumns(state, state.currentSelection, state.clipboard);
	});

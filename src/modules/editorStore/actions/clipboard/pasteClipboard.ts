import { useEditorStore } from '../../useEditorStore';
import { replaceColumns } from '../../utils/replaceColumns';

export const pasteClipboard = () =>
	useEditorStore.setState((state) => {
		replaceColumns(state, state.currentSelection, state.clipboard);
	});

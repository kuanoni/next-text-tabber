import { appendColumns } from '../';
import { useEditorStore } from '../../useEditorStore';

export const pasteClipboard = () =>
	useEditorStore.setState((state) => {
		appendColumns(...state.clipboard);
	});

import { appendColumns } from '../';
import { useEditorStore } from '../../useEditorStore';

export const appendClipboard = () => {
	const clipboard = useEditorStore.getState().clipboard;
	appendColumns(...clipboard);
};

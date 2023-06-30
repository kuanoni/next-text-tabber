import { insertColumns } from '../';
import { useEditorStore } from '../../useEditorStore';

export const insertClipboard = () => {
	const clipboard = useEditorStore.getState().clipboard;
	insertColumns(...clipboard);
};

import { editorStoreBase } from '../useEditorStore';

export const columnSelectionFinish = () => {
	editorStoreBase.setState((state) => {
		state.isSelecting = false;
	});
};

import { editorInitialState } from '../constants';
import { useEditorStore } from '../useEditorStore';

export const resetStore = () => {
	useEditorStore.setState(() => ({ ...editorInitialState }), true);
	useEditorStore.temporal.getState().clear();
};

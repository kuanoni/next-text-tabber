import { editorInitialState } from '../constants';
import { useTablatureEditorStore } from '../useTablatureEditorStore';

export const resetStore = () => {
	useTablatureEditorStore.setState(() => ({ ...editorInitialState, ...editorInitialState }), true);
	useTablatureEditorStore.temporal.getState().clear();
};

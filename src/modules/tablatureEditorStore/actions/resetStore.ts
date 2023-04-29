import { editorInitialState } from '../editorSlice/constants';
import { tablatureInitialState } from '../tablatureSlice/constants';
import { useTablatureEditorStore } from '../useTablatureEditorStore';

export const resetStore = () =>
	useTablatureEditorStore.setState(() => ({ ...editorInitialState, ...tablatureInitialState }), true);

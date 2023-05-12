import { editorInitialState } from '../constants';
import { useTablatureEditorStore } from '../useTablatureEditorStore';

export const resetEditor = () => useTablatureEditorStore.setState(() => editorInitialState);

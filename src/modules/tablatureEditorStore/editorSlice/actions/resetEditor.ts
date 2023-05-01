import { useTablatureEditorStore } from '../../useTablatureEditorStore';
import { editorInitialState } from '../constants';

export const resetEditor = () => useTablatureEditorStore.setState(() => editorInitialState);

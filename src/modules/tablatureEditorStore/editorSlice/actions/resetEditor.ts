import { useTablatureEditorStore } from '../../useTablatureEditorStore';
import { initialState } from '../constants';

export const resetEditor = () => useTablatureEditorStore.setState(() => initialState);

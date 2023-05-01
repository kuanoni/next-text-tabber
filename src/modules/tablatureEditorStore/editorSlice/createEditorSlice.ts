import { StateCreator } from 'zustand';

import { editorInitialState } from './constants';

export const createEditorSlice: StateCreator<TablatureEditorStore, [['zustand/immer', never]], [], EditorSlice> = () =>
	editorInitialState;

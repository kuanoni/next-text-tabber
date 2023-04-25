import { StateCreator } from 'zustand';

import { initialState } from './constants';

export const createEditorSlice: StateCreator<TablatureEditorStore, [['zustand/immer', never]], [], EditorSlice> = () =>
	initialState;

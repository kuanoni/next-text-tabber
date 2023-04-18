import { StateCreator } from 'zustand';

import { initialState } from './constants';

export const createEditorSlice: StateCreator<
	EditorSlice & TablatureSlice,
	[['zustand/immer', never]],
	[],
	EditorSlice
> = () => initialState;

import { StateCreator } from 'zustand';

import { tablatureInitialState } from './constants';

export const createTablatureSlice: StateCreator<
	TablatureEditorStore,
	[['zustand/immer', never]],
	[],
	TablatureSlice
> = () => tablatureInitialState;

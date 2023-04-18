import { StateCreator } from 'zustand';

import { electricGuitar } from './constants';

const initialState = electricGuitar.createInitialState();

export const createTablatureSlice: StateCreator<
	TablatureSlice & EditorSlice,
	[['zustand/immer', never]],
	[],
	TablatureSlice
> = () => initialState;

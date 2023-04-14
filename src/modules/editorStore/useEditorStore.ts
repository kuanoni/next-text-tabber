import { create, StoreApi, UseBoundStore } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { initialState } from './constants';
import { logger } from './logger';

export const editorStoreBase = create(logger(immer<EditorStore>(() => initialState)));

type WithSelectors<S> = S extends { getState: () => infer T } ? S & { use: { [K in keyof T]: () => T[K] } } : never;

const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(_store: S) => {
	const store = _store as WithSelectors<typeof _store>;
	store.use = {};
	for (const k of Object.keys(store.getState())) {
		// eslint-disable-next-line
		(store.use as any)[k] = () => store((s) => s[k as keyof typeof s]);
	}

	return store;
};

export const useEditorStore = createSelectors(editorStoreBase);

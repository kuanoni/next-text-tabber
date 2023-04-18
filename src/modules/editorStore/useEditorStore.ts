import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { initialState } from './constants';
import { logger } from './logger';

export const editorStoreBase = create(logger(immer<EditorStore>(() => initialState)));

export const useEditorStore = editorStoreBase;

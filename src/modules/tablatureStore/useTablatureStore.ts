import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { electricGuitar } from './constants';
import { logger } from './logger';

const initialState = electricGuitar.createInitialState();

export const tablatureStoreBase = create(logger(immer<TablatureStore>(() => initialState)));

export const useTablatureStore = tablatureStoreBase;

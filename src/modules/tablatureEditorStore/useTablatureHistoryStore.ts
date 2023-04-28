import type { TemporalState } from 'zundo';
import { useStore } from 'zustand';

import { useTablatureEditorStore } from './useTablatureEditorStore';

export const useTablatureHistoryStore = <T>(
	selector: (state: TemporalState<{ tablature: Tablature }>) => T,
	equality?: (a: T, b: T) => boolean
) => useStore(useTablatureEditorStore.temporal, selector, equality);

import type { TemporalState } from 'zundo';
import { useStore } from 'zustand';

import { useEditorStore } from './useEditorStore';

export const useEditorHistoryStore = <T>(
	selector: (state: TemporalState<Pick<EditorStore, 'tablature' | 'currentSelection'>>) => T,
	equality?: (a: T, b: T) => boolean
) => useStore(useEditorStore.temporal, selector, equality);

import { temporal } from 'zundo';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { shallow } from 'zustand/shallow';

import { editorInitialState } from './constants';

export const useTablatureEditorStore = create(
	temporal(
		immer<EditorStore>(() => ({
			...editorInitialState,
		})),
		{
			// Only store the tablature, instrument, and currentSelection in the temporal store
			partialize: (state): Pick<EditorStore, 'tablature' | 'currentSelection'> => {
				const { tablature, currentSelection } = state;
				return { tablature, currentSelection };
			},
			// Only update the change history when tablature or instrument change
			equality: (currentState, pastState) => shallow(currentState.tablature, pastState.tablature),
			limit: 50,
		}
	)
);

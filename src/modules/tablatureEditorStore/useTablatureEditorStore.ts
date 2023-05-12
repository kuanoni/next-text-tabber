import { temporal } from 'zundo';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { shallow } from 'zustand/shallow';

import { createEditorSlice } from './editorSlice/createEditorSlice';
import { createTablatureSlice } from './tablatureSlice/createTablatureSlice';

export const useTablatureEditorStore = create(
	temporal(
		immer<TablatureEditorStore>((...a) => ({
			...createTablatureSlice(...a),
			...createEditorSlice(...a),
		})),
		{
			// Only store the tablature, instrument, and currentSelection in the temporal store
			partialize: (state): Pick<TablatureEditorStore, 'tablature' | 'instrument' | 'currentSelection'> => {
				const { tablature, instrument, currentSelection } = state;
				return { tablature, instrument, currentSelection };
			},
			// Only update the change history when tablature or instrument change
			equality: (currentState, pastState) => {
				return (
					shallow(currentState.tablature, pastState.tablature) &&
					shallow(currentState.instrument, pastState.instrument)
				);
			},
			limit: 50,
		}
	)
);

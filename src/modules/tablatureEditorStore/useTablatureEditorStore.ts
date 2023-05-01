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
			// don't save change history of 'ghostSelection' or 'isSelecting'
			partialize: (state): Omit<TablatureEditorStore, 'ghostSelection' | 'isSelecting'> => {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				const { ghostSelection, isSelecting, ...rest } = state;
				return rest;
			},
			equality: shallow,
			limit: 50,
		}
	)
);

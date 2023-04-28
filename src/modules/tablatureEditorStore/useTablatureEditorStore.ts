import { temporal } from 'zundo';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { createEditorSlice } from './editorSlice/createEditorSlice';
import { createTablatureSlice } from './tablatureSlice/createTablatureSlice';

export const useTablatureEditorStore = create(
	temporal(
		immer<TablatureEditorStore>((...a) => ({
			...createTablatureSlice(...a),
			...createEditorSlice(...a),
		})),
		{
			partialize: (state) => ({ tablature: state.tablature }),
		}
	)
);

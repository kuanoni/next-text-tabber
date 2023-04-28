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
			partialize: (state) => ({ tablature: state.tablature }),
			equality: shallow,
			limit: 50,
		}
	)
);

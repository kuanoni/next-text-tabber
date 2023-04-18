import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { createEditorSlice } from './editorSlice/createEditorSlice';
import { createTablatureSlice } from './tablatureSlice/createTablatureSlice';

export const useTablatureEditorStore = create(
	immer<TablatureSlice & EditorSlice>((...a) => ({
		...createTablatureSlice(...a),
		...createEditorSlice(...a),
	}))
);

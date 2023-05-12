import { insertColumns } from '@modules/tablatureEditorStore/utils/insertColumns';

import { useTablatureEditorStore } from '../useTablatureEditorStore';

export const insertClipboard = () =>
	useTablatureEditorStore.setState((state) => {
		insertColumns(state, state.currentSelection, state.clipboard);
	});

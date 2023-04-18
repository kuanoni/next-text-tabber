import { editorStoreBase } from '@modules/editorStore/useEditorStore';

import { tablatureStoreBase } from '../useTablatureStore';
import { iterateColumnSelection } from './utils/iterateColumnSelection';

export const clearSelectedColumns = () => {
	const { line } = editorStoreBase.getState().selectedColumns;

	tablatureStoreBase.setState((state) => {
		iterateColumnSelection((i) => {
			state.tablature.lines[line].columns[i] = state.instrument.BLANK_COLUMN;
		});
	});
};

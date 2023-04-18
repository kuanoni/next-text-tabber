import type { Instrument } from '@common/Instrument';

import { resetEditor } from '@modules/tablatureEditorStore/editorSlice/actions/resetEditor';

import { useTablatureEditorStore } from '../../useTablatureEditorStore';

export const changeInstrument = (instrument: Instrument) => {
	useTablatureEditorStore.setState(instrument.createInitialState());
	resetEditor();
};

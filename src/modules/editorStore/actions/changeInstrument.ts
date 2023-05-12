import type { Instrument } from '@modules/editorStore/Instrument';

import { useTablatureEditorStore } from '../useTablatureEditorStore';
import { resetEditor } from './resetEditor';

export const changeInstrument = (instrument: Instrument) => {
	useTablatureEditorStore.setState(instrument.createInitialState());
	resetEditor();
};

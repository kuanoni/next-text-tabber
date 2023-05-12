import type { Instrument } from '@modules/editorStore/Instrument';

import { useTablatureEditorStore } from '../useTablatureEditorStore';
import { resetEditor } from './resetEditor';

export const setInstrument = (instrument: Instrument) => {
	useTablatureEditorStore.setState(instrument.createInitialState());
	resetEditor();
};

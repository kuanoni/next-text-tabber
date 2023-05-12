import type { Instrument } from '@modules/editorStore/Instrument';

import { useTablatureEditorStore } from '../useTablatureEditorStore';
import { resetColumnSelection } from './resetColumnSelection';

export const setInstrument = (instrument: Instrument) => {
	useTablatureEditorStore.setState(instrument.createInitialState());
	resetColumnSelection();
};

import type { Instrument } from '@modules/editorStore/Instrument';

import { useTablatureEditorStore } from '../useTablatureEditorStore';
import { resetStore } from './resetStore';

export const setInstrument = (instrument: Instrument) => {
	resetStore();
	useTablatureEditorStore.setState(instrument.createInitialState());
	useTablatureEditorStore.temporal.getState().clear();
};

import type { Instrument } from '@modules/editorStore/Instrument';

import { useEditorStore } from '../useEditorStore';
import { resetStore } from './resetStore';

export const setInstrument = (instrument: Instrument) => {
	resetStore();
	useEditorStore.setState(instrument.createInitialState());
	useEditorStore.temporal.getState().clear();
};

import type { Instrument } from '@modules/editorStore/Instrument';

import { resetStore } from '../';
import { useEditorStore } from '../../useEditorStore';

export const setInstrument = (instrument: Instrument) => {
	resetStore();
	useEditorStore.setState(instrument.createInitialState());
	useEditorStore.temporal.getState().clear();
};

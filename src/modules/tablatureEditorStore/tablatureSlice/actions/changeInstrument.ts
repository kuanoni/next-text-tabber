import type { Instrument } from '@common/Instrument';
import { resetEditor } from '@modules/editorStore/actions/resetEditor';

import { tablatureStoreBase } from '../useTablatureStore';

export const changeInstrument = (instrument: Instrument) => {
	tablatureStoreBase.setState(instrument.createInitialState());
	resetEditor();
};

import type { Instrument } from '@common/Instrument';
import { tablatureStoreBase } from '../useTablatureStore';

export const changeInstrument = (instrument: Instrument) =>
	tablatureStoreBase.setState((state) => {
		state.instrument = instrument;
		state.tablature = instrument.BLANK_TABLATURE;
	});

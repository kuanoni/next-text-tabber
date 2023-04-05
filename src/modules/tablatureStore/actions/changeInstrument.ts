import type { Instrument } from '@common/Instrument';
import { tablatureStoreBase } from '../useTablatureStore';

export const changeInstrument = (instrument: Instrument) =>
	tablatureStoreBase.setState(instrument.createInitialState());

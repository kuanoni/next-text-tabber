import type { Instrument } from '@common/Instrument';

import { tablatureStoreBase } from '../useTablatureStore';

export const changeTuning = (tuning: Instrument['defaultTuning']) =>
	tablatureStoreBase.setState((state) => {
		state.tuning = tuning;
	});

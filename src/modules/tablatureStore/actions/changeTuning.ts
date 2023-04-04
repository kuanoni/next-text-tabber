import type { Instrument } from '@common/Instrument';

import { tablatureStoreBase } from '../useTablatureStore';

export const changeTuning = (tuning: Instrument['defaultTuning']) =>
	tablatureStoreBase.setState((state) => {
		if (tuning.length !== state.instrument.defaultTuning.length)
			throw new Error(
				`[changeTuning]: invalid length of tuning array (${tuning.length}). Should be ${state.instrument.defaultTuning.length}.`
			);
		state.tuning = tuning;
	});

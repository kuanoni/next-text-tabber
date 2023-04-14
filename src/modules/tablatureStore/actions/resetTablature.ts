import { tablatureStoreBase } from '../useTablatureStore';

export const resetTablature = () =>
	tablatureStoreBase.setState((state) => {
		state.tablature = state.instrument.BLANK_TABLATURE;
	});

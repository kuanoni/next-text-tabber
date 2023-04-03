import { tablatureStoreBase } from '../useTablatureStore';

export const clearTablature = () =>
	tablatureStoreBase.setState((state) => {
		state.tablature = state.instrument.BLANK_TABLATURE;
	});

import { BLANK_TABLATURE } from '../constants';
import { tablatureStoreBase } from '../useTablatureStore';

export const clearTablature = () =>
	tablatureStoreBase.setState((state) => {
		state.columns = BLANK_TABLATURE;
	});

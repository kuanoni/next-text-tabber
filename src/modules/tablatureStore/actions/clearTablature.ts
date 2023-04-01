import { BLANK_TABLATURE } from '../constants';
import { tablatureStoreBase } from '../useTablatureStore';

export const clearTablature = () =>
	tablatureStoreBase.setState((state) => {
		state.tablatureLines = BLANK_TABLATURE;
	});

import { BLANK_COLUMN } from '../constants';
import { tablatureStoreBase } from '../useTablatureStore';

export const addBlankColumn = () =>
	tablatureStoreBase.setState((state) => {
		state.columns.push(BLANK_COLUMN);
	});

import { BLANK_LINE } from '../constants';
import { tablatureStoreBase } from '../useTablatureStore';

export const pushBlankLine = () =>
	tablatureStoreBase.setState((state) => {
		state.tablature.push(BLANK_LINE);
	});

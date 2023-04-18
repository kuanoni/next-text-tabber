import { tablatureStoreBase } from '../useTablatureStore';

export const pushBlankLine = () =>
	tablatureStoreBase.setState((state) => {
		state.tablature.lines.push(state.instrument.BLANK_LINE);
	});

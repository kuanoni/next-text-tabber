import { BLANK_COLUMN } from '../constants';
import { tablatureStoreBase } from '../useTablatureStore';

export const pushBlankColumn = (line: number) =>
	tablatureStoreBase.setState((state) => {
		if (!state.tablature[line]) return console.error(`Tried to push column to non-existant line: ${line}`);

		state.tablature[line].push(BLANK_COLUMN);
	});

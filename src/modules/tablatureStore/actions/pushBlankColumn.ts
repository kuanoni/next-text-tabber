import { BLANK_COLUMN } from '../constants';
import { tablatureStoreBase } from '../useTablatureStore';

export const pushBlankColumn = (line: number) =>
	tablatureStoreBase.setState((state) => {
		if (!state.tablatureLines[line]) return console.error(`Tried to push column to non-existant line: ${line}`);

		state.tablatureLines[line].push(BLANK_COLUMN);
	});

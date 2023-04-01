import { BLANK_COLUMN } from '../constants';
import { tablatureStoreBase } from '../useTablatureStore';

export const insertBlankColumn = (line: number, at: number) =>
	tablatureStoreBase.setState((state) => {
		if (!state.tablatureLines[line]) return console.error(`Tried to insert column in non-existant line: ${line}`);

		state.tablatureLines[line].splice(at, 0, BLANK_COLUMN);
	});

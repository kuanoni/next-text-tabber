import { tablatureStoreBase } from '../useTablatureStore';

export const insertBlankColumn = (lineIndex: number, columnIndex: number) =>
	tablatureStoreBase.setState((state) => {
		if (!state.tablature.lines[lineIndex])
			return console.error(`Tried to insert column in non-existant line: ${lineIndex}`);

		state.tablature.lines[lineIndex].columns.splice(columnIndex, 0, state.instrument.BLANK_COLUMN);
	});

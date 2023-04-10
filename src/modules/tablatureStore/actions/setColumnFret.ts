import { tablatureStoreBase } from '../useTablatureStore';

export const setColumnFret = (stringNumber: number, fretNumber: number) => {
	console.log(stringNumber, ' | ', fretNumber);

	// tablatureStoreBase.setState((state) => {
	// 	state.tablature.lines.push(state.instrument.BLANK_LINE);
	// });
};

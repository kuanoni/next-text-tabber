import { StateCreator, StoreMutatorIdentifier } from 'zustand';

type Logger = <
	T extends TablatureSlice,
	Mps extends [StoreMutatorIdentifier, unknown][] = [],
	Mcs extends [StoreMutatorIdentifier, unknown][] = []
>(
	f: StateCreator<T, Mps, Mcs>,
	name?: string
) => StateCreator<T, Mps, Mcs>;

type LoggerImpl = <T extends TablatureSlice>(f: StateCreator<T, [], []>, name?: string) => StateCreator<T, [], []>;

const loggerImpl: LoggerImpl = (f, name) => (set, get, store) => {
	const loggedSet: typeof set = (...a) => {
		set(...a);
		console.log(...(name ? [`${name}:`] : []), get());
		get().tablature.sections.forEach((section) =>
			console.table(section.columns.map((column) => column.cells.map((cell) => cell.fret)))
		);
	};
	store.setState = loggedSet;

	return f(loggedSet, get, store);
};

export const logger = loggerImpl as unknown as Logger;

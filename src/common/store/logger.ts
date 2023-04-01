import { StateCreator, StoreMutatorIdentifier } from 'zustand';

type Logger = <
	T extends TablatureStore,
	Mps extends [StoreMutatorIdentifier, unknown][] = [],
	Mcs extends [StoreMutatorIdentifier, unknown][] = []
>(
	f: StateCreator<T, Mps, Mcs>,
	name?: string
) => StateCreator<T, Mps, Mcs>;

type LoggerImpl = <T extends TablatureStore>(f: StateCreator<T, [], []>, name?: string) => StateCreator<T, [], []>;

const loggerImpl: LoggerImpl = (f, name) => (set, get, store) => {
	const loggedSet: typeof set = (...a) => {
		set(...a);
		console.log(...(name ? [`${name}:`] : []), get());
		get().tablature.forEach((line) => console.table(line.map((column) => column.cells.map((cell) => cell.fret))));
	};
	store.setState = loggedSet;

	return f(loggedSet, get, store);
};

export const logger = loggerImpl as unknown as Logger;

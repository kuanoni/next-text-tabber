import numIsBetweenRange from '@common/utils/numBetweenRange';
import { beforeAll, describe, expect, jest } from '@jest/globals';
import { act, cleanup, renderHook } from '@testing-library/react';

import { setColumnSelection } from '../actions/columnSelection/setColumnSelection';
import { insertColumnsAtSelection } from '../actions/insertColumnsAtSelection';
import { resetStore } from '../actions/resetStore';
import { setInstrument } from '../actions/setInstrument';
import { setSelectedColumnsFret } from '../actions/setSelectedColumnsFret';
import { setTuning } from '../actions/setTuning';
import { electricBass, electricGuitar } from '../constants';
import { useTablatureEditorStore } from '../useTablatureEditorStore';
import { useTablatureHistoryStore } from '../useTablatureHistoryStore';

const getTablatureStore = () => {
	const { result } = renderHook(() => useTablatureEditorStore((state) => state));
	return result;
};

const getHistoryFns = () => {
	const { result } = renderHook(() => useTablatureHistoryStore((state) => state));
	return result.current;
};

const cleanupStore = () =>
	beforeAll(() => {
		jest.clearAllMocks();
		cleanup();
		resetStore();
	});

describe('Undo/redo temporal store actions', () => {
	describe('[setInstrument]', () => {
		cleanupStore();

		it('does NOT undo change to instrument.', () => {
			const store = getTablatureStore();
			const { undo } = getHistoryFns();

			expect(store.current.instrument).toEqual(electricGuitar);

			act(() => {
				setInstrument(electricBass);
			});

			expect(store.current.instrument).toEqual(electricBass);

			act(() => {
				undo();
			});

			expect(store.current.instrument).toEqual(electricBass);
		});
	});

	describe('[setTuning]', () => {
		cleanupStore();

		it('does NOT undo change to tuning.', () => {
			const store = getTablatureStore();
			const { undo } = getHistoryFns();

			const tuning = electricGuitar.commonTunings['Drop D'];

			expect(store.current.tuning).toEqual(electricGuitar.defaultTuning);

			act(() => {
				setTuning(tuning);
			});

			expect(store.current.tuning).toEqual(tuning);

			act(() => {
				undo();
			});

			expect(store.current.tuning).toEqual(tuning);
		});
	});

	describe('[setSelectedColumnFret]', () => {
		cleanupStore();
		const stringNumber = 3;
		const fretNumber = 7;
		const section = 0;
		const start = 1;
		const end = 4;

		it('undoes setting column frets.', () => {
			const store = getTablatureStore();
			const { undo } = getHistoryFns();

			act(() => {
				setColumnSelection(section, start, end);
				setSelectedColumnsFret(stringNumber, fretNumber);
			});

			store.current.tablature.sections[section].columns.forEach((column, i) => {
				if (numIsBetweenRange(i, start, end)) expect(column.cells[stringNumber].fret).toEqual(fretNumber);
				else expect(column).toEqual(store.current.instrument.BLANK_COLUMN);
			});

			act(() => {
				undo();
			});

			store.current.tablature.sections[section].columns.forEach((column) => {
				expect(column).toEqual(store.current.instrument.BLANK_COLUMN);
			});
		});

		it('redoes setting column frets.', () => {
			const store = getTablatureStore();
			const { redo } = getHistoryFns();

			store.current.tablature.sections[section].columns.forEach((column) => {
				expect(column).toEqual(store.current.instrument.BLANK_COLUMN);
			});

			act(() => {
				redo();
			});
			store.current.tablature.sections[section].columns.forEach((column, i) => {
				if (numIsBetweenRange(i, start, end)) expect(column.cells[stringNumber].fret).toEqual(fretNumber);
				else expect(column).toEqual(store.current.instrument.BLANK_COLUMN);
			});
		});
	});

	describe('[insertColumnsAtSelection]', () => {
		cleanupStore();

		it('undoes inserting column.', () => {
			const store = getTablatureStore();
			const { undo } = getHistoryFns();

			const column: Column = store.current.instrument.createColumnFromText('--2---');

			act(() => {
				setColumnSelection(0, 1, 1);
				insertColumnsAtSelection([column]);
			});

			expect(store.current.tablature.sections[0].columns[2]).toEqual(column);

			act(() => {
				undo();
			});

			expect(store.current.tablature.sections[0].columns[2]).toEqual(store.current.instrument.BLANK_COLUMN);
		});

		it('redoes inserting column.', () => {
			const store = getTablatureStore();
			const { redo } = getHistoryFns();

			const column: Column = store.current.instrument.createColumnFromText('--2---');

			expect(store.current.tablature.sections[0].columns[2]).toEqual(store.current.instrument.BLANK_COLUMN);

			act(() => {
				redo();
			});

			expect(store.current.tablature.sections[0].columns[2]).toEqual(column);
		});
	});
});

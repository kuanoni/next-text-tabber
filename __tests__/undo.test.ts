import numIsBetweenRange from '@common/utils/numBetweenRange';
import { beforeAll, describe, expect, jest } from '@jest/globals';
import { resetStore } from '@modules/tablatureEditorStore/actions/resetStore';
import { columnSelectionFinish } from '@modules/tablatureEditorStore/editorSlice/actions/columnSelectionFinish';
import { columnSelectionHover } from '@modules/tablatureEditorStore/editorSlice/actions/columnSelectionHover';
import { columnSelectionStart } from '@modules/tablatureEditorStore/editorSlice/actions/columnSelectionStart';
import { resetColumnSelection } from '@modules/tablatureEditorStore/editorSlice/actions/resetColumnSelection';
import { setColumnSelection } from '@modules/tablatureEditorStore/editorSlice/actions/setColumnSelection';
import { BLANK_SELECTION } from '@modules/tablatureEditorStore/editorSlice/constants';
import { changeInstrument } from '@modules/tablatureEditorStore/tablatureSlice/actions/changeInstrument';
import { changeTuning } from '@modules/tablatureEditorStore/tablatureSlice/actions/changeTuning';
import { insertColumnsAtSelection } from '@modules/tablatureEditorStore/tablatureSlice/actions/insertColumnsAtSelection';
import { setSelectedColumnsFret } from '@modules/tablatureEditorStore/tablatureSlice/actions/setSelectedColumnsFret';
import { electricBass, electricGuitar } from '@modules/tablatureEditorStore/tablatureSlice/constants';
import { useTablatureEditorStore } from '@modules/tablatureEditorStore/useTablatureEditorStore';
import { useTablatureHistoryStore } from '@modules/tablatureEditorStore/useTablatureHistoryStore';
import { act, cleanup, renderHook } from '@testing-library/react';

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
		act(() => {
			resetStore();
		});
	});

describe('[columnSelection(start/hover/finish)]', () => {
	cleanupStore();

	it('undoes selection.', () => {
		const store = getTablatureStore();
		const { undo } = getHistoryFns();

		act(() => {
			columnSelectionStart(0, 0);
			columnSelectionHover(0, 6);
			columnSelectionFinish();
		});

		expect(store.current.currentSelection).toEqual({ section: 0, start: 0, end: 6 });

		act(() => {
			undo();
		});

		expect(store.current.currentSelection).toEqual(BLANK_SELECTION);
	});

	it('redoes selection.', () => {
		const store = getTablatureStore();
		const { redo } = getHistoryFns();

		expect(store.current.currentSelection).toEqual(BLANK_SELECTION);

		act(() => {
			redo();
		});

		expect(store.current.currentSelection).toEqual({ section: 0, start: 0, end: 6 });
	});
});

describe('[setColumnSelection]', () => {
	cleanupStore();

	it('undoes selection.', () => {
		const store = getTablatureStore();
		const { undo } = getHistoryFns();

		act(() => {
			setColumnSelection(0, 1, 4);
		});

		expect(store.current.currentSelection).toEqual({ section: 0, start: 1, end: 4 });

		act(() => {
			undo();
		});

		expect(store.current.currentSelection).toEqual(BLANK_SELECTION);
	});

	it('redoes selection.', () => {
		const store = getTablatureStore();
		const { redo } = getHistoryFns();

		expect(store.current.currentSelection).toEqual(BLANK_SELECTION);

		act(() => {
			redo();
		});

		expect(store.current.currentSelection).toEqual({ section: 0, start: 1, end: 4 });
	});
});

describe('[resetColumnSelection]', () => {
	cleanupStore();

	it('undoes selection reset.', () => {
		const store = getTablatureStore();
		const { undo } = getHistoryFns();

		act(() => {
			setColumnSelection(0, 1, 4);
		});

		expect(store.current.currentSelection).toEqual({ section: 0, start: 1, end: 4 });

		act(() => {
			resetColumnSelection();
		});

		expect(store.current.currentSelection).toEqual(BLANK_SELECTION);

		act(() => {
			undo();
		});

		expect(store.current.currentSelection).toEqual({ section: 0, start: 1, end: 4 });
	});

	it('redoes selection reset.', () => {
		const store = getTablatureStore();
		const { redo } = getHistoryFns();

		expect(store.current.currentSelection).toEqual({ section: 0, start: 1, end: 4 });

		act(() => {
			redo();
		});

		expect(store.current.currentSelection).toEqual(BLANK_SELECTION);
	});
});

describe('[changeInstrument]', () => {
	cleanupStore();

	it('undoes change to electricBass.', () => {
		const store = getTablatureStore();
		const { undo } = getHistoryFns();

		expect(store.current.instrument).toEqual(electricGuitar);

		act(() => {
			changeInstrument(electricBass);
		});

		expect(store.current.instrument).toEqual(electricBass);

		act(() => {
			undo();
		});

		expect(store.current.instrument).toEqual(electricGuitar);
	});

	it('redoes change to electricBass.', () => {
		const store = getTablatureStore();
		const { redo } = getHistoryFns();

		expect(store.current.instrument).toEqual(electricGuitar);

		act(() => {
			redo();
		});

		expect(store.current.instrument).toEqual(electricBass);
	});
});

describe('[changeTuning]', () => {
	cleanupStore();

	it('undoes change to tuning.', () => {
		const store = getTablatureStore();
		const { undo } = getHistoryFns();

		expect(store.current.tuning).toEqual(store.current.instrument.defaultTuning);

		act(() => {
			changeTuning([26, 33, 38, 43, 47, 52]);
		});

		expect(store.current.tuning).toEqual([26, 33, 38, 43, 47, 52]);

		act(() => {
			undo();
		});

		expect(store.current.tuning).toEqual(store.current.instrument.defaultTuning);
	});

	it('redoes change to tuning.', () => {
		const store = getTablatureStore();
		const { redo } = getHistoryFns();

		expect(store.current.tuning).toEqual(store.current.instrument.defaultTuning);

		act(() => {
			redo();
		});

		expect(store.current.tuning).toEqual([26, 33, 38, 43, 47, 52]);
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

	it('redoes change to tuning.', () => {
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

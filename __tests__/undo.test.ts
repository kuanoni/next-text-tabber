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

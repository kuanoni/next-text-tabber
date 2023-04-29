import { describe, expect, jest } from '@jest/globals';
import { columnSelectionFinish } from '@modules/tablatureEditorStore/editorSlice/actions/columnSelectionFinish';
import { columnSelectionHover } from '@modules/tablatureEditorStore/editorSlice/actions/columnSelectionHover';
import { columnSelectionStart } from '@modules/tablatureEditorStore/editorSlice/actions/columnSelectionStart';
import { resetEditor } from '@modules/tablatureEditorStore/editorSlice/actions/resetEditor';
import { setColumnSelection } from '@modules/tablatureEditorStore/editorSlice/actions/setColumnSelection';
import { BLANK_SELECTION } from '@modules/tablatureEditorStore/editorSlice/constants';
import { changeInstrument } from '@modules/tablatureEditorStore/tablatureSlice/actions/changeInstrument';
import { changeTuning } from '@modules/tablatureEditorStore/tablatureSlice/actions/changeTuning';
import { resetTablature } from '@modules/tablatureEditorStore/tablatureSlice/actions/resetTablature';
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

beforeEach(() => {
	jest.clearAllMocks();
	cleanup();
	resetEditor();
	resetTablature();
});

describe('[columnSelection(start/hover/finish)]', () => {
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

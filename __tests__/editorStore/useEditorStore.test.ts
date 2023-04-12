import { describe, expect, jest } from '@jest/globals';
import { columnSelectionFinish } from '@modules/editorStore/actions/columnSelectionFinish';
import { columnSelectionHover } from '@modules/editorStore/actions/columnSelectionHover';
import { columnSelectionStart } from '@modules/editorStore/actions/columnSelectionStart';
import { resetEditor } from '@modules/editorStore/actions/resetEditor';
import { initialState } from '@modules/editorStore/constants';
import { useEditorStore } from '@modules/editorStore/useEditorStore';
import { act, cleanup, renderHook } from '@testing-library/react';

describe('useTablatureStore', () => {
	afterEach(() => {
		jest.resetAllMocks();
		cleanup();
		resetEditor();
	});

	it('[resetEditor] reset the entire state to the initial state.', () => {
		const { result } = renderHook(() => useEditorStore((state) => state));

		act(() => {
			resetEditor();
		});

		expect(result.current).toEqual(initialState);
	});

	it('[columnSelectionStart] sets "isSelecting" flag true, sets "selectedColumns" appropriately.', () => {
		const { result } = renderHook(() => useEditorStore((state) => state));

		act(() => {
			columnSelectionStart(0, 1);
		});

		expect(result.current.isSelecting).toEqual(true);
		expect(result.current.selectedColumns).toEqual({ line: 0, start: 1, end: 1 });
	});

	it('[columnSelectionHover] sets "selectedColumns.end" appropriately.', () => {
		const { result } = renderHook(() => useEditorStore((state) => state));

		act(() => {
			columnSelectionStart(0, 1);
			columnSelectionHover(0, 5);
		});

		expect(result.current.isSelecting).toEqual(true);
		expect(result.current.selectedColumns).toEqual({ line: 0, start: 1, end: 5 });
	});

	it('[columnSelectionFinish] sets "isSelecting" flag false.', () => {
		const { result } = renderHook(() => useEditorStore((state) => state));

		act(() => {
			columnSelectionStart(0, 1);
			columnSelectionHover(0, 5);
			columnSelectionFinish();
		});

		expect(result.current.isSelecting).toEqual(false);
		expect(result.current.selectedColumns).toEqual({ line: 0, start: 1, end: 5 });
	});

	it('[columnSelection(Start/Hover/Finish)] handles hovering on different line.', () => {
		const { result } = renderHook(() => useEditorStore((state) => state));

		act(() => {
			columnSelectionStart(0, 1);
			columnSelectionHover(1, 3);
			columnSelectionFinish();
		});

		expect(result.current.isSelecting).toEqual(false);
		expect(result.current.selectedColumns).toEqual({ line: 0, start: 1, end: 1 });
	});
});

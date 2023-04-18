import { describe, expect, jest } from '@jest/globals';
import { columnSelectionFinish } from '@modules/tablatureEditorStore/editorSlice/actions/columnSelectionFinish';
import { columnSelectionHover } from '@modules/tablatureEditorStore/editorSlice/actions/columnSelectionHover';
import { columnSelectionStart } from '@modules/tablatureEditorStore/editorSlice/actions/columnSelectionStart';
import { resetEditor } from '@modules/tablatureEditorStore/editorSlice/actions/resetEditor';
import { initialState } from '@modules/tablatureEditorStore/editorSlice/constants';
import { useTablatureEditorStore } from '@modules/tablatureEditorStore/useTablatureEditorStore';
import { act, cleanup, renderHook } from '@testing-library/react';

describe('useTablatureEditorStore', () => {
	afterEach(() => {
		jest.resetAllMocks();
		cleanup();
		resetEditor();
	});

	it('[resetEditor] reset the entire state to the initial state.', () => {
		const { result } = renderHook(() => useTablatureEditorStore((state) => state));

		act(() => {
			resetEditor();
		});

		for (const key of Object.keys(initialState))
			expect(result.current[key as keyof EditorSlice]).toEqual(initialState[key as keyof EditorSlice]);
	});

	it('[columnSelectionStart] sets "isSelecting" flag true, sets "selectedColumns" appropriately.', () => {
		const { result } = renderHook(() => useTablatureEditorStore((state) => state));

		act(() => {
			columnSelectionStart(0, 1);
		});

		expect(result.current.isSelecting).toEqual(true);
		expect(result.current.selectedColumns).toEqual({ line: 0, start: 1, end: 1 });
	});

	it('[columnSelectionHover] sets "selectedColumns.end" appropriately.', () => {
		const { result } = renderHook(() => useTablatureEditorStore((state) => state));

		act(() => {
			columnSelectionStart(0, 1);
			columnSelectionHover(0, 5);
		});

		expect(result.current.isSelecting).toEqual(true);
		expect(result.current.selectedColumns).toEqual({ line: 0, start: 1, end: 5 });
	});

	it('[columnSelectionFinish] sets "isSelecting" flag false.', () => {
		const { result } = renderHook(() => useTablatureEditorStore((state) => state));

		act(() => {
			columnSelectionStart(0, 1);
			columnSelectionHover(0, 5);
			columnSelectionFinish();
		});

		expect(result.current.isSelecting).toEqual(false);
		expect(result.current.selectedColumns).toEqual({ line: 0, start: 1, end: 5 });
	});

	it('[columnSelection(Start/Hover/Finish)] handles hovering on different line.', () => {
		const { result } = renderHook(() => useTablatureEditorStore((state) => state));

		act(() => {
			columnSelectionStart(0, 1);
			columnSelectionHover(1, 3);
			columnSelectionFinish();
		});

		expect(result.current.isSelecting).toEqual(false);
		expect(result.current.selectedColumns).toEqual({ line: 0, start: 1, end: 1 });
	});
});

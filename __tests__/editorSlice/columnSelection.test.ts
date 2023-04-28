import { describe, expect, jest } from '@jest/globals';
import { columnSelectionFinish } from '@modules/tablatureEditorStore/editorSlice/actions/columnSelectionFinish';
import { columnSelectionHover } from '@modules/tablatureEditorStore/editorSlice/actions/columnSelectionHover';
import { columnSelectionStart } from '@modules/tablatureEditorStore/editorSlice/actions/columnSelectionStart';
import { resetColumnSelection } from '@modules/tablatureEditorStore/editorSlice/actions/resetColumnSelection';
import { resetEditor } from '@modules/tablatureEditorStore/editorSlice/actions/resetEditor';
import { setColumnSelection } from '@modules/tablatureEditorStore/editorSlice/actions/setColumnSelection';
import { BLANK_SELECTION } from '@modules/tablatureEditorStore/editorSlice/constants';
import { useTablatureEditorStore } from '@modules/tablatureEditorStore/useTablatureEditorStore';
import { act, cleanup, renderHook } from '@testing-library/react';

describe('Column Selection Tests', () => {
	afterEach(() => {
		jest.resetAllMocks();
		cleanup();
		resetEditor();
	});

	describe('[resetColumnSelection]', () => {
		it('sets currentSelection and ghostSelection to blank selection.', () => {
			const { result } = renderHook(() => useTablatureEditorStore((state) => state));

			act(() => {
				setColumnSelection(0, 1, 4);
				resetColumnSelection();
			});

			expect(result.current.isSelecting).toBe(false);
			expect(result.current.currentSelection).toEqual(BLANK_SELECTION);
			expect(result.current.ghostSelection).toEqual(BLANK_SELECTION);
		});
	});

	describe('[columnSelectionStart]', () => {
		it('sets "isSelecting" true.', () => {
			const { result } = renderHook(() => useTablatureEditorStore((state) => state));

			act(() => columnSelectionStart(0, 1));

			expect(result.current.isSelecting).toBe(true);
		});

		it('sets "ghostSelection" appropriately.', () => {
			const { result } = renderHook(() => useTablatureEditorStore((state) => state));

			act(() => columnSelectionStart(0, 1));

			expect(result.current.ghostSelection).toEqual({ section: 0, start: 1, end: 1 });
		});
	});

	describe('[columnSelectionHover]', () => {
		it('sets "ghostSelection.end" appropriately.', () => {
			const { result } = renderHook(() => useTablatureEditorStore((state) => state));

			act(() => {
				columnSelectionStart(0, 1);
				columnSelectionHover(0, 5);
			});

			expect(result.current.ghostSelection).toEqual({ section: 0, start: 1, end: 5 });
		});

		it('ignores hovering on different section.', () => {
			const { result } = renderHook(() => useTablatureEditorStore((state) => state));

			act(() => {
				columnSelectionStart(0, 1);
				columnSelectionHover(1, 3);
			});

			expect(result.current.ghostSelection).toEqual({ section: 0, start: 1, end: 1 });
		});

		it('throws error on out of bounds columnIndex.', () => {
			const selectionHoverOutOfBounds = () =>
				act(() => {
					columnSelectionStart(0, 1);
					columnSelectionHover(0, 500);
				});

			expect(selectionHoverOutOfBounds).toThrow('out of bounds');
		});
	});

	describe('[columnSelectionFinish]', () => {
		it('sets "isSelecting" flag false.', () => {
			const { result } = renderHook(() => useTablatureEditorStore((state) => state));

			act(() => {
				columnSelectionStart(0, 1);
				columnSelectionHover(0, 5);
				columnSelectionFinish();
			});

			expect(result.current.isSelecting).toEqual(false);
		});

		it('sets "currentSelection" to equal "ghostSelection".', () => {
			const { result } = renderHook(() => useTablatureEditorStore((state) => state));

			act(() => {
				columnSelectionStart(0, 1);
				columnSelectionHover(0, 5);
				columnSelectionFinish();
			});

			expect(result.current.currentSelection).toEqual({ section: 0, start: 1, end: 5 });
		});

		it('resets "ghostSelection" to blank selection.', () => {
			const { result } = renderHook(() => useTablatureEditorStore((state) => state));

			act(() => {
				columnSelectionStart(0, 1);
				columnSelectionHover(0, 5);
				columnSelectionFinish();
			});

			expect(result.current.ghostSelection).toEqual(BLANK_SELECTION);
		});

		it('throws error on "ghostSelection" with null values.', () => {
			const { result } = renderHook(() => useTablatureEditorStore((state) => state));

			expect(result.current.ghostSelection).toEqual(BLANK_SELECTION);

			const finishWithNullSelection = () => act(() => columnSelectionFinish());
			expect(finishWithNullSelection).toThrow('null value');
		});

		it('finish with "start" > "end".', () => {
			const { result } = renderHook(() => useTablatureEditorStore((state) => state));

			act(() => {
				columnSelectionStart(0, 6);
				columnSelectionHover(0, 2);
				columnSelectionFinish();
			});

			expect(result.current.currentSelection).toEqual({ section: 0, start: 2, end: 6 });
		});
	});
});

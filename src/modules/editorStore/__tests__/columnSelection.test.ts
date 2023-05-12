import { describe, expect, jest } from '@jest/globals';
import { act, cleanup, renderHook } from '@testing-library/react';

import { columnSelectionFinish } from '../actions/columnSelection/columnSelectionFinish';
import { columnSelectionHover } from '../actions/columnSelection/columnSelectionHover';
import { columnSelectionStart } from '../actions/columnSelection/columnSelectionStart';
import { setColumnSelection } from '../actions/columnSelection/setColumnSelection';
import { resetColumnSelection } from '../actions/resetColumnSelection';
import { resetEditor } from '../actions/resetEditor';
import { BLANK_SELECTION } from '../constants';
import { useTablatureEditorStore } from '../useTablatureEditorStore';

describe('Column Selection Tests', () => {
	afterEach(() => {
		jest.resetAllMocks();
		cleanup();
		resetEditor();
	});

	it('[resetColumnSelection] sets currentSelection and ghostSelection blank.', () => {
		const { result } = renderHook(() => useTablatureEditorStore((state) => state));

		act(() => {
			setColumnSelection(0, 1, 4);
			resetColumnSelection();
		});

		expect(result.current.isSelecting).toBe(false);
		expect(result.current.currentSelection).toEqual(BLANK_SELECTION);
		expect(result.current.ghostSelection).toEqual(BLANK_SELECTION);
	});

	it('[columnSelectionStart] sets "isSelecting" true, "currentSelection" blank, and "ghostSelection" appropriately.', () => {
		const { result } = renderHook(() => useTablatureEditorStore((state) => state));

		act(() => columnSelectionStart(0, 1));

		expect(result.current.isSelecting).toBe(true);
		expect(result.current.ghostSelection).toEqual({ section: 0, start: 1, end: 1 });
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
		it('sets "isSelecting" false, "currentSelection" to "ghostSelection", and "ghostSelection" to blank.', () => {
			const { result } = renderHook(() => useTablatureEditorStore((state) => state));

			act(() => {
				columnSelectionStart(0, 1);
				columnSelectionHover(0, 5);
				columnSelectionFinish();
			});

			expect(result.current.isSelecting).toEqual(false);
			expect(result.current.currentSelection).toEqual({ section: 0, start: 1, end: 5 });
			expect(result.current.ghostSelection).toEqual(BLANK_SELECTION);
		});

		it('throws error on "ghostSelection" with null values.', () => {
			const { result } = renderHook(() => useTablatureEditorStore((state) => state));

			expect(result.current.ghostSelection).toEqual(BLANK_SELECTION);

			const finishWithNullSelection = () => act(() => columnSelectionFinish());
			expect(finishWithNullSelection).toThrow('section is null');
		});

		it('"currentSelection.start" <= "currentSelection.end".', () => {
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

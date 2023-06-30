import { act } from 'react-dom/test-utils';

import { expect, jest } from '@jest/globals';
import { BLANK_SELECTION } from '@modules/editorStore/constants';
import { cleanup, renderHook } from '@testing-library/react';

import { useEditorStore } from '../../useEditorStore';
import { resetStore } from '../resets/resetStore';
import { selectionFinish } from './selectionFinish';

beforeEach(() => {
	jest.clearAllMocks();
	cleanup();
	act(() => {
		resetStore();
	});
});

it('sets {currentSelection}. Resets {ghostSelection} and {isSelecting}.', () => {
	const { result } = renderHook(() => useEditorStore((state) => state));

	act(() => {
		useEditorStore.setState((state) => {
			state.isSelecting = true;
			state.ghostSelection = { section: 0, start: 0, end: 0 };
		});
		selectionFinish();
	});

	expect(result.current.isSelecting).toBe(false);
	expect(result.current.ghostSelection).toStrictEqual(BLANK_SELECTION);
	expect(result.current.currentSelection).toStrictEqual({ section: 0, start: 0, end: 0 });

	act(() => {
		useEditorStore.setState((state) => {
			state.isSelecting = true;
			state.currentSelection = BLANK_SELECTION;
			state.ghostSelection = { section: 0, start: 7, end: 7 };
		});
		selectionFinish();
	});

	expect(result.current.isSelecting).toBe(false);
	expect(result.current.ghostSelection).toStrictEqual(BLANK_SELECTION);
	expect(result.current.currentSelection).toStrictEqual({ section: 0, start: 7, end: 7 });

	act(() => {
		useEditorStore.setState((state) => {
			state.isSelecting = true;
			state.currentSelection = BLANK_SELECTION;
			state.ghostSelection = { section: 0, start: 2, end: 5 };
		});
		selectionFinish();
	});

	expect(result.current.isSelecting).toBe(false);
	expect(result.current.ghostSelection).toStrictEqual(BLANK_SELECTION);
	expect(result.current.currentSelection).toStrictEqual({ section: 0, start: 2, end: 5 });
});

it('when {start} is greater than {end}, swaps their values.', () => {
	const { result } = renderHook(() => useEditorStore((state) => state));

	act(() => {
		useEditorStore.setState((state) => {
			state.isSelecting = true;
			state.ghostSelection = { section: 0, start: 6, end: 4 };
		});
		selectionFinish();
	});

	expect(result.current.isSelecting).toBe(false);
	expect(result.current.ghostSelection).toStrictEqual(BLANK_SELECTION);
	expect(result.current.currentSelection).toStrictEqual({ section: 0, start: 4, end: 6 });
});

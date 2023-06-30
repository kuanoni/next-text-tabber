import { act } from 'react-dom/test-utils';

import { expect, jest } from '@jest/globals';
import { BLANK_SELECTION } from '@modules/editorStore/constants';
import { cleanup, renderHook } from '@testing-library/react';

import { useEditorStore } from '../../useEditorStore';
import { resetStore } from '../resets/resetStore';
import { selectionStart } from './selectionStart';

beforeEach(() => {
	jest.clearAllMocks();
	cleanup();
	act(() => {
		resetStore();
	});
});

it('sets {isSelecting}, {ghostSelection}, and resets {currentSelection}.', () => {
	const { result } = renderHook(() => useEditorStore((state) => state));

	expect(result.current.isSelecting).toBe(false);
	expect(result.current.ghostSelection).toBe(BLANK_SELECTION);
	expect(result.current.currentSelection).toBe(BLANK_SELECTION);

	act(() => selectionStart(0, 6));

	expect(result.current.isSelecting).toBe(true);
	expect(result.current.ghostSelection).toStrictEqual({ section: 0, start: 6, end: 6 });
	expect(result.current.currentSelection).toBe(BLANK_SELECTION);

	act(() => {
		resetStore();
		selectionStart(0, 0);
	});

	expect(result.current.isSelecting).toBe(true);
	expect(result.current.ghostSelection).toStrictEqual({ section: 0, start: 0, end: 0 });
	expect(result.current.currentSelection).toBe(BLANK_SELECTION);
});

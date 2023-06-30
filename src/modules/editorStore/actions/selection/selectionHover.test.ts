import { act } from 'react-dom/test-utils';

import { expect, jest } from '@jest/globals';
import { BLANK_SELECTION } from '@modules/editorStore/constants';
import { cleanup, renderHook } from '@testing-library/react';

import { useEditorStore } from '../../useEditorStore';
import { resetStore } from '../resets/resetStore';
import { selectionHover } from './selectionHover';

beforeEach(() => {
	jest.clearAllMocks();
	cleanup();
	act(() => {
		resetStore();
		useEditorStore.setState((state) => {
			state.isSelecting = true;
			state.ghostSelection = { section: 0, start: 1, end: 1 };
		});
	});
});

it('sets {end} of {ghostSelection}.', () => {
	const { result } = renderHook(() => useEditorStore((state) => state));

	act(() => selectionHover(0, 6));

	expect(result.current.isSelecting).toBe(true);
	expect(result.current.ghostSelection).toStrictEqual({ section: 0, start: 1, end: 6 });
	expect(result.current.currentSelection).toBe(BLANK_SELECTION);

	act(() => selectionHover(0, 0));

	expect(result.current.ghostSelection).toStrictEqual({ section: 0, start: 1, end: 0 });
});

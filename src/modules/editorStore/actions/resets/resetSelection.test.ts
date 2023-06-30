import { act } from 'react-dom/test-utils';

import { expect, jest } from '@jest/globals';
import { BLANK_SELECTION } from '@modules/editorStore/constants';
import { cleanup, renderHook } from '@testing-library/react';

import { useEditorStore } from '../../useEditorStore';
import { resetStore } from '../resets/resetStore';
import { resetSelection } from './resetSelection';

beforeEach(() => {
	jest.clearAllMocks();
	cleanup();
	act(() => {
		resetStore();
	});
});

it('resets {isSelecting}, {ghostSelection}, and {currentSelection}.', () => {
	const { result } = renderHook(() => useEditorStore((state) => state));

	act(() =>
		useEditorStore.setState((state) => {
			state.isSelecting = true;
			state.currentSelection = { section: 4, start: 7, end: 8 };
			state.ghostSelection = { section: 0, start: 1, end: 5 };
		})
	);

	expect(result.current.isSelecting).toBe(true);
	expect(result.current.currentSelection).toStrictEqual({ section: 4, start: 7, end: 8 });
	expect(result.current.ghostSelection).toStrictEqual({ section: 0, start: 1, end: 5 });

	act(() => resetSelection());

	expect(result.current.isSelecting).toBe(false);
	expect(result.current.currentSelection).toStrictEqual(BLANK_SELECTION);
	expect(result.current.ghostSelection).toStrictEqual(BLANK_SELECTION);
});

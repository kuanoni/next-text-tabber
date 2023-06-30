import { act } from 'react-dom/test-utils';

import { expect, jest } from '@jest/globals';
import { cleanup, renderHook } from '@testing-library/react';

import { useEditorStore } from '../../useEditorStore';
import { resetStore } from '../resets/resetStore';
import { test_setSelection } from '../testUtils';
import { yankClipboard } from './yankClipboard';

const partialBlankColumn = {
	notation: null,
	cells: [
		{ notation: null, fret: -1 },
		{ notation: null, fret: -1 },
		{ notation: null, fret: -1 },
		{ notation: null, fret: -1 },
		{ notation: null, fret: -1 },
		{ notation: null, fret: -1 },
	],
};

beforeEach(() => {
	jest.clearAllMocks();
	cleanup();
	act(() => {
		resetStore();
	});
});

it('yanks selected columns to the clipboard.', () => {
	const { result } = renderHook(() => useEditorStore((state) => state.clipboard));

	act(() => {
		test_setSelection(0, 0, 0);
		yankClipboard();
	});

	expect(result.current).toStrictEqual([{ id: 0, ...partialBlankColumn }]);

	act(() => {
		test_setSelection(0, 7, 7);
		yankClipboard();
	});

	expect(result.current).toStrictEqual([{ id: 7, ...partialBlankColumn }]);

	act(() => {
		test_setSelection(0, 3, 4);
		yankClipboard();
	});

	expect(result.current).toStrictEqual([
		{ id: 3, ...partialBlankColumn },
		{ id: 4, ...partialBlankColumn },
	]);
});

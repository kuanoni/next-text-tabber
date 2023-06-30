import { act } from 'react-dom/test-utils';

import { expect, jest } from '@jest/globals';
import { cleanup, renderHook } from '@testing-library/react';

import { useEditorStore } from '../../useEditorStore';
import { resetStore } from '../resets/resetStore';
import { setClipboard } from './setClipboard';

const testColumn: Column = {
	id: 99,
	notation: null,
	cells: [
		{ notation: null, fret: 7 },
		{ notation: null, fret: -1 },
		{ notation: null, fret: -1 },
		{ notation: null, fret: -1 },
		{ notation: null, fret: -1 },
		{ notation: null, fret: -1 },
	],
};

const testColumns = new Array(3).fill(testColumn);

beforeEach(() => {
	jest.clearAllMocks();
	cleanup();
	act(() => {
		resetStore();
	});
});

it('sets clipboard columns.', () => {
	const { result } = renderHook(() => useEditorStore((state) => state.clipboard));

	act(() => setClipboard(testColumns));

	expect(result.current).toStrictEqual(testColumns);

	act(() => setClipboard([]));

	expect(result.current).toStrictEqual([]);
});

import { act } from 'react-dom/test-utils';

import { expect, jest } from '@jest/globals';
import { cleanup, renderHook } from '@testing-library/react';

import { useEditorStore } from '../../useEditorStore';
import { resetStore } from '../resets/resetStore';
import { setSelection } from './setSelection';

beforeEach(() => {
	jest.clearAllMocks();
	cleanup();
	act(() => {
		resetStore();
	});
});

it('sets {currentSelection}.', () => {
	const { result } = renderHook(() => useEditorStore((state) => state));

	expect(result.current.currentSelection).toStrictEqual({ section: null, start: null, end: null });

	act(() => setSelection(0, 0, 0));
	expect(result.current.currentSelection).toStrictEqual({ section: 0, start: 0, end: 0 });

	act(() => setSelection(0, 7, 7));
	expect(result.current.currentSelection).toStrictEqual({ section: 0, start: 7, end: 7 });

	act(() => setSelection(0, 1, 5));
	expect(result.current.currentSelection).toStrictEqual({ section: 0, start: 1, end: 5 });

	act(() => setSelection(0, 0, 3));
	expect(result.current.currentSelection).toStrictEqual({ section: 0, start: 0, end: 3 });
});

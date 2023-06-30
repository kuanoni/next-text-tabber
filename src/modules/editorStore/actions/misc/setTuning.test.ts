import { act } from 'react-dom/test-utils';

import { expect, jest } from '@jest/globals';
import { cleanup, renderHook } from '@testing-library/react';

import { useEditorStore } from '../../useEditorStore';
import { resetStore } from '../resets/resetStore';
import { setTuning } from './setTuning';

beforeEach(() => {
	jest.clearAllMocks();
	cleanup();
	act(() => {
		resetStore();
	});
});

it('sets `tuning`.', () => {
	const { result } = renderHook(() => useEditorStore((state) => state.tuning));

	act(() => setTuning([0, 0, 0, 0, 0, 0]));

	expect(result.current).toStrictEqual([0, 0, 0, 0, 0, 0]);
});

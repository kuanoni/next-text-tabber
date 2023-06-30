import { act } from 'react-dom/test-utils';

import { expect, jest } from '@jest/globals';
import { cleanup, renderHook } from '@testing-library/react';

import { editorInitialState, electricBass } from '../../constants';
import { useEditorStore } from '../../useEditorStore';
import { resetStore } from '../resets/resetStore';
import { setInstrument } from './setInstrument';

beforeEach(() => {
	jest.clearAllMocks();
	cleanup();
	act(() => {
		resetStore();
	});
});

it('resets store and sets `instrument` and `tuning`.', () => {
	const { result } = renderHook(() => useEditorStore((state) => state));

	act(() => setInstrument(electricBass));

	expect(result.current).toStrictEqual({ ...editorInitialState, ...electricBass.createInitialState() });
});

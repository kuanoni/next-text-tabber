import { act } from 'react-dom/test-utils';

import { expect, jest } from '@jest/globals';
import { cleanup, renderHook } from '@testing-library/react';

import { useEditorStore } from '../../useEditorStore';
import { resetStore } from '../resets/resetStore';
import { createSection } from './createSection';

beforeEach(() => {
	jest.clearAllMocks();
	cleanup();
	act(() => {
		resetStore();
	});
});

it('creates and adds new section to tablature.', () => {
	const { result } = renderHook(() => useEditorStore((state) => state.tablature.sections));

	expect(result.current.length).toBe(1);

	act(() => {
		createSection('Test Section');
	});

	expect(result.current[1].name).toBe('Test Section');
	expect(result.current[1].columns.length).toBe(8);
});

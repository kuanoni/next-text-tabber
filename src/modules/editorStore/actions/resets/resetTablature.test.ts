import { act } from 'react-dom/test-utils';

import { expect, jest } from '@jest/globals';
import { cleanup, renderHook } from '@testing-library/react';

import { useEditorStore } from '../../useEditorStore';
import { resetStore } from './resetStore';
import { resetTablature } from './resetTablature';

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

it('resets {tablature}.', () => {
	const { result } = renderHook(() => useEditorStore((state) => state));

	act(() =>
		useEditorStore.setState((state) => {
			state.tablature.sections[0].columns = [...testColumns];
		})
	);

	expect(result.current.tablature.sections[0].columns).toStrictEqual(testColumns);

	act(() => resetTablature());

	expect(result.current.tablature).toStrictEqual(result.current.instrument.BLANK_TABLATURE);
});

import { act } from 'react-dom/test-utils';

import { expect, jest } from '@jest/globals';
import { cleanup, renderHook } from '@testing-library/react';

import { appendColumns } from '../';
import { useEditorStore } from '../../useEditorStore';
import { resetStore } from '../resets/resetStore';
import { setSelection } from '../selection/setSelection';

const testColumn = {
	id: 99,
	modifier: null,
	cells: [
		{ modifier: null, fret: 7 },
		{ modifier: null, fret: -1 },
		{ modifier: null, fret: -1 },
		{ modifier: null, fret: -1 },
		{ modifier: null, fret: -1 },
		{ modifier: null, fret: -1 },
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

it('appends columns after [0] when selection is {0, 0, 0}.', () => {
	const { result } = renderHook(() => useEditorStore((state) => state.tablature.sections[0].columns));

	act(() => {
		setSelection(0, 0, 0);
		appendColumns(...testColumns);
	});

	expect(result.current.map((c) => c.id)).toEqual([0, 99, 99, 99, 1, 2, 3, 4, 5, 6, 7]);
	expect(result.current.map((c) => c.cells.map((cel) => cel.fret))).toStrictEqual([
		[-1, -1, -1, -1, -1, -1],
		[7, -1, -1, -1, -1, -1],
		[7, -1, -1, -1, -1, -1],
		[7, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, -1],
	]);
});

it('appends columns after [7] when selection is {0, 7, 7}.', () => {
	const { result } = renderHook(() => useEditorStore((state) => state.tablature.sections[0].columns));

	act(() => {
		setSelection(0, 7, 7);
		appendColumns(...testColumns);
	});

	expect(result.current.map((c) => c.id)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 99, 99, 99]);
	expect(result.current.map((c) => c.cells.map((cel) => cel.fret))).toStrictEqual([
		[-1, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, -1],
		[7, -1, -1, -1, -1, -1],
		[7, -1, -1, -1, -1, -1],
		[7, -1, -1, -1, -1, -1],
	]);
});

it('replaces columns [3-6] when selection is {0, 3, 6}.', () => {
	const { result } = renderHook(() => useEditorStore((state) => state.tablature.sections[0].columns));

	act(() => {
		setSelection(0, 3, 6);
		appendColumns(...testColumns);
	});

	expect(result.current.map((c) => c.id)).toEqual([0, 1, 2, 3, 4, 5, 7]);
	expect(result.current.map((c) => c.cells.map((cel) => cel.fret))).toStrictEqual([
		[-1, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, -1],
		[7, -1, -1, -1, -1, -1],
		[7, -1, -1, -1, -1, -1],
		[7, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, -1],
	]);
});

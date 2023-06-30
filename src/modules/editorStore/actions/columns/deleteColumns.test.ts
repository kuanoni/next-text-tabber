import { act } from 'react-dom/test-utils';

import { expect, jest } from '@jest/globals';
import { cleanup, renderHook } from '@testing-library/react';

import { useEditorStore } from '../../useEditorStore';
import { resetStore } from '../resets/resetStore';
import { test_setSelection } from '../testUtils';
import { deleteColumns } from './deleteColumns';

beforeEach(() => {
	jest.clearAllMocks();
	cleanup();
	act(() => {
		resetStore();
	});
});

it('deletes column [0] when selection is {0, 0, 0}.', () => {
	const { result } = renderHook(() => useEditorStore((state) => state.tablature.sections[0].columns));

	act(() => {
		test_setSelection(0, 0, 0);
		deleteColumns();
	});

	expect(result.current.map((c) => c.id)).toEqual([1, 2, 3, 4, 5, 6, 7]);
	expect(result.current.map((c) => c.cells.map((cel) => cel.fret))).toStrictEqual([
		[-1, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, -1],
	]);
});

it('deletes column [7] when selection is {0, 7, 7}.', () => {
	const { result } = renderHook(() => useEditorStore((state) => state.tablature.sections[0].columns));

	act(() => {
		test_setSelection(0, 7, 7);
		deleteColumns();
	});

	expect(result.current.map((c) => c.id)).toEqual([0, 1, 2, 3, 4, 5, 6]);
	expect(result.current.map((c) => c.cells.map((cel) => cel.fret))).toStrictEqual([
		[-1, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, -1],
	]);
});

it('deletes columns [3-6] when selection is {0, 3, 6}.', () => {
	const { result } = renderHook(() => useEditorStore((state) => state.tablature.sections[0].columns));

	act(() => {
		test_setSelection(0, 3, 6);
		deleteColumns();
	});

	expect(result.current.map((c) => c.id)).toEqual([0, 1, 2, 7]);
	expect(result.current.map((c) => c.cells.map((cel) => cel.fret))).toStrictEqual([
		[-1, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, -1],
	]);
});

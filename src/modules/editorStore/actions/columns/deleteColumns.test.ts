import { act } from 'react-dom/test-utils';

import { expect, jest } from '@jest/globals';
import { cleanup, renderHook } from '@testing-library/react';

import { useEditorStore } from '../../useEditorStore';
import { resetStore } from '../resets/resetStore';
import { test_setSelection } from '../utils';
import { deleteColumns } from './deleteColumns';

beforeEach(() => {
	jest.clearAllMocks();
	cleanup();
	act(() => {
		resetStore();
	});
});

it('deletes column [0] when selection is {0, 0, 0}.', () => {
	const { result } = renderHook(() => useEditorStore((state) => state));

	act(() => {
		test_setSelection(0, 0, 0);
		deleteColumns();
	});

	expect(result.current.currentSelection).toStrictEqual({ section: 0, start: 0, end: 0 });
	expect(result.current.tablature.sections[0].columns.map((c) => c.id)).toEqual([1, 2, 3, 4, 5, 6, 7]);
	expect(result.current.tablature.sections[0].columns.map((c) => c.cells.map((cel) => cel.fret))).toStrictEqual([
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
	const { result } = renderHook(() => useEditorStore((state) => state));

	act(() => {
		test_setSelection(0, 7, 7);
		deleteColumns();
	});

	expect(result.current.currentSelection).toStrictEqual({ section: 0, start: 6, end: 6 });
	expect(result.current.tablature.sections[0].columns.map((c) => c.id)).toEqual([0, 1, 2, 3, 4, 5, 6]);
	expect(result.current.tablature.sections[0].columns.map((c) => c.cells.map((cel) => cel.fret))).toStrictEqual([
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
	const { result } = renderHook(() => useEditorStore((state) => state));

	act(() => {
		test_setSelection(0, 3, 6);
		deleteColumns();
	});

	expect(result.current.currentSelection).toStrictEqual({ section: 0, start: 3, end: 3 });
	expect(result.current.tablature.sections[0].columns.map((c) => c.id)).toEqual([0, 1, 2, 7]);
	expect(result.current.tablature.sections[0].columns.map((c) => c.cells.map((cel) => cel.fret))).toStrictEqual([
		[-1, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, -1],
	]);
});

it('prevents column amount from dropping to 0.', () => {
	const { result } = renderHook(() => useEditorStore((state) => state));

	act(() => {
		test_setSelection(0, 0, 7);
		deleteColumns();
	});

	expect(result.current.currentSelection).toStrictEqual({ section: 0, start: 0, end: 0 });
	expect(result.current.tablature.sections[0].columns.map((c) => c.id)).toEqual([8]);
	expect(result.current.tablature.sections[0].columns.map((c) => c.cells.map((cel) => cel.fret))).toStrictEqual([
		[-1, -1, -1, -1, -1, -1],
	]);
});

import { act } from 'react-dom/test-utils';

import { expect, jest } from '@jest/globals';
import { cleanup, renderHook } from '@testing-library/react';

import { useEditorStore } from '../../useEditorStore';
import { resetStore } from '../resets/resetStore';
import { test_setSelection } from '../utils';
import { toggleFret } from './toggleFret';

const expectColumnCellFrets = (columns: Column[], expectedColumns: number[][]) => {
	expect(columns.map((c) => c.id)).toEqual([0, 1, 2, 3, 4, 5, 6, 7]);
	expect(columns.map((c) => c.cells.map((cel) => cel.fret))).toStrictEqual(expectedColumns);
};

const expectBlankColumns = (columns: Column[]) => {
	expectColumnCellFrets(columns, [
		[-1, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, -1],
	]);
};

const setCellFretValues = (result: { current: Column[] }) => {
	act(() => {
		test_setSelection(0, 0, 0);
		toggleFret(0, 7);

		test_setSelection(0, 7, 7);
		toggleFret(5, 12);

		test_setSelection(0, 2, 4);
		toggleFret(3, 0);
	});

	expectColumnCellFrets(result.current, [
		[7, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, -1],
		[-1, -1, -1, 0, -1, -1],
		[-1, -1, -1, 0, -1, -1],
		[-1, -1, -1, 0, -1, -1],
		[-1, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, 12],
	]);
};

beforeEach(() => {
	jest.clearAllMocks();
	cleanup();
	act(() => {
		resetStore();
	});
});

it('sets cell frets of selected blank columns.', () => {
	const { result } = renderHook(() => useEditorStore((state) => state.tablature.sections[0].columns));

	expectBlankColumns(result.current);

	setCellFretValues(result);
});

it('sets cell frets of selected non-blank columns.', () => {
	const { result } = renderHook(() => useEditorStore((state) => state.tablature.sections[0].columns));

	setCellFretValues(result);

	act(() => {
		test_setSelection(0, 0, 3);
		toggleFret(0, 7);
	});

	expectColumnCellFrets(result.current, [
		[7, -1, -1, -1, -1, -1],
		[7, -1, -1, -1, -1, -1],
		[7, -1, -1, 0, -1, -1],
		[7, -1, -1, 0, -1, -1],
		[-1, -1, -1, 0, -1, -1],
		[-1, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, 12],
	]);

	act(() => {
		test_setSelection(0, 1, 5);
		toggleFret(3, 4);
	});

	expectColumnCellFrets(result.current, [
		[7, -1, -1, -1, -1, -1],
		[7, -1, -1, 4, -1, -1],
		[7, -1, -1, 4, -1, -1],
		[7, -1, -1, 4, -1, -1],
		[-1, -1, -1, 4, -1, -1],
		[-1, -1, -1, 4, -1, -1],
		[-1, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, 12],
	]);
});

it('blanks cell fret values of selected columns.', () => {
	const { result } = renderHook(() => useEditorStore((state) => state.tablature.sections[0].columns));

	setCellFretValues(result);

	// Blanks fret values (set them to the default -1)
	act(() => {
		test_setSelection(0, 0, 0);
		toggleFret(0, 7);

		test_setSelection(0, 7, 7);
		toggleFret(5, 12);

		test_setSelection(0, 2, 4);
		toggleFret(3, 0);
	});

	expectBlankColumns(result.current);
});

it('replaces cell fret values of selected columns.', () => {
	const { result } = renderHook(() => useEditorStore((state) => state.tablature.sections[0].columns));

	expectBlankColumns(result.current);

	setCellFretValues(result);

	// Replace frets values with different values
	act(() => {
		test_setSelection(0, 0, 0);
		toggleFret(0, 9);

		test_setSelection(0, 7, 7);
		toggleFret(5, 4);

		test_setSelection(0, 2, 4);
		toggleFret(3, 16);
	});

	expectColumnCellFrets(result.current, [
		[9, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, -1],
		[-1, -1, -1, 16, -1, -1],
		[-1, -1, -1, 16, -1, -1],
		[-1, -1, -1, 16, -1, -1],
		[-1, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, 4],
	]);
});

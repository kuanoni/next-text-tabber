import { act } from 'react-dom/test-utils';

import { expect, jest } from '@jest/globals';
import { cleanup, renderHook } from '@testing-library/react';

import { useEditorStore } from '../../useEditorStore';
import { resetStore } from '../resets/resetStore';
import { setSelection } from '../selection/setSelection';
import { toggleFret } from './toggleFret';

const expectColumns = (columns: Column[], expectedColumns: number[][]) => {
	expect(columns.map((c) => c.id)).toEqual([0, 1, 2, 3, 4, 5, 6, 7]);
	expect(columns.map((c) => c.cells.map((cel) => cel.fret))).toStrictEqual(expectedColumns);
};

const expectBlankColumns = (columns: Column[]) => {
	expectColumns(columns, [
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
		setSelection(0, 0, 0);
		toggleFret(0, 7);

		setSelection(0, 7, 7);
		toggleFret(5, 12);

		setSelection(0, 2, 4);
		toggleFret(3, 0);
	});

	expectColumns(result.current, [
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

it('sets cell frets of selected columns.', () => {
	const { result } = renderHook(() => useEditorStore((state) => state.tablature.sections[0].columns));

	expectBlankColumns(result.current);

	setCellFretValues(result);
});

it('unsets cell fret values of selected columns.', () => {
	const { result } = renderHook(() => useEditorStore((state) => state.tablature.sections[0].columns));

	setCellFretValues(result);

	// Unset fret values (set them to the default -1)
	act(() => {
		setSelection(0, 0, 0);
		toggleFret(0, 7);

		setSelection(0, 7, 7);
		toggleFret(5, 12);

		setSelection(0, 2, 4);
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
		setSelection(0, 0, 0);
		toggleFret(0, 9);

		setSelection(0, 7, 7);
		toggleFret(5, 4);

		setSelection(0, 2, 4);
		toggleFret(3, 16);
	});

	expectColumns(result.current, [
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

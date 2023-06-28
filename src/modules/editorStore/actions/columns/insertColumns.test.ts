import { act } from 'react-dom/test-utils';

import { expect, jest } from '@jest/globals';
import { useEditorStore } from '@modules/editorStore/useEditorStore';
import { cleanup, renderHook } from '@testing-library/react';

import { resetStore } from '../resets/resetStore';
import { setSelection } from '../selection/setSelection';
import { insertColumns } from './insertColumns';

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

it('inserts columns before [0] when selection is {0, 0, 0}.', () => {
	const { result } = renderHook(() => useEditorStore((state) => state.tablature.sections[0].columns));

	act(() => {
		setSelection(0, 0, 0);
		insertColumns(...testColumns);
	});

	expect(result.current.map((c) => c.id)).toEqual([99, 99, 99, 0, 1, 2, 3, 4, 5, 6, 7]);
	expect(result.current.map((c) => c.cells.map((cel) => cel.fret))).toStrictEqual([
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
		[-1, -1, -1, -1, -1, -1],
	]);
});

it('inserts columns before [7] when selection is {0, 7, 7}.', () => {
	const { result } = renderHook(() => useEditorStore((state) => state.tablature.sections[0].columns));

	const lastIndex = result.current.length - 1;
	const [start, end] = [lastIndex, lastIndex];

	act(() => {
		setSelection(0, start, end);
		insertColumns(...testColumns);
	});

	expect(result.current.map((c) => c.id)).toEqual([0, 1, 2, 3, 4, 5, 6, 99, 99, 99, 7]);
	expect(result.current.map((c) => c.cells.map((cel) => cel.fret))).toStrictEqual([
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
		[-1, -1, -1, -1, -1, -1],
	]);
});

it('replaces columns [2-5] when selection is {0, 2, 5}.', () => {
	const { result } = renderHook(() => useEditorStore((state) => state.tablature.sections[0].columns));

	act(() => {
		setSelection(0, 2, 5);
		insertColumns(...testColumns);
	});

	expect(result.current.map((c) => c.id)).toEqual([0, 1, 2, 3, 4, 6, 7]);
	expect(result.current.map((c) => c.cells.map((cel) => cel.fret))).toStrictEqual([
		[-1, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, -1],
		[7, -1, -1, -1, -1, -1],
		[7, -1, -1, -1, -1, -1],
		[7, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, -1],
	]);
});

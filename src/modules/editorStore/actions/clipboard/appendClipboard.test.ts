import { act } from 'react-dom/test-utils';

import { expect, jest } from '@jest/globals';
import { cleanup, renderHook } from '@testing-library/react';

import { useEditorStore } from '../../useEditorStore';
import { resetStore } from '../resets/resetStore';
import { test_setSelection } from '../utils';
import { appendClipboard } from './appendClipboard';

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

beforeEach(() => {
	jest.clearAllMocks();
	cleanup();
	act(() => {
		resetStore();
		useEditorStore.setState((state) => {
			state.clipboard = new Array(3).fill(testColumn);
		});
	});
});

it('appends clipboard columns after selection when selection size = 1.', () => {
	const { result } = renderHook(() => useEditorStore((state) => state.tablature.sections[0].columns));

	act(() => {
		test_setSelection(0, 0, 0);
		appendClipboard();
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

	act(() => {
		resetStore();
		useEditorStore.setState((state) => {
			state.clipboard = new Array(3).fill(testColumn);
		});
		test_setSelection(0, 7, 7);
		appendClipboard();
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

	act(() => {
		resetStore();
		useEditorStore.setState((state) => {
			state.clipboard = new Array(3).fill(testColumn);
		});
		test_setSelection(0, 4, 4);
		appendClipboard();
	});

	expect(result.current.map((c) => c.id)).toEqual([0, 1, 2, 3, 4, 99, 99, 99, 5, 6, 7]);
	expect(result.current.map((c) => c.cells.map((cel) => cel.fret))).toStrictEqual([
		[-1, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, -1],
		[7, -1, -1, -1, -1, -1],
		[7, -1, -1, -1, -1, -1],
		[7, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, -1],
	]);
});

it('replaces selected columns with clipboard columns when selection size > 1', () => {
	const { result } = renderHook(() => useEditorStore((state) => state.tablature.sections[0].columns));

	act(() => {
		test_setSelection(0, 3, 6);
		appendClipboard();
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

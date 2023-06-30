import { act } from 'react-dom/test-utils';

import { expect, jest } from '@jest/globals';
import { cleanup, renderHook } from '@testing-library/react';

import { useEditorStore } from '../../useEditorStore';
import { resetStore } from '../resets/resetStore';
import { test_setSelection } from '../utils';
import { clearColumns } from './clearColumns';

const expectUncleared = (result: { current: Column[] }) => {
	expect(result.current.map((c) => c.cells.map((cel) => cel.fret))).toStrictEqual([
		[12, -1, -1, -1, -1, -1],
		[12, -1, -1, -1, -1, -1],
		[12, -1, -1, -1, -1, -1],
		[12, -1, -1, -1, -1, -1],
		[12, -1, -1, -1, -1, -1],
		[12, -1, -1, -1, -1, -1],
		[12, -1, -1, -1, -1, -1],
		[12, -1, -1, -1, -1, -1],
	]);
};

beforeEach(() => {
	jest.clearAllMocks();
	cleanup();
	act(() => {
		resetStore();
		useEditorStore.setState((state) => {
			for (let i = 0; i < state.tablature.sections[0].columns.length; i++) {
				state.tablature.sections[0].columns[i].cells[0].fret = 12;
			}
		});
	});
});

it('clears column [0] when selection is {0, 0, 0}.', () => {
	const { result } = renderHook(() => useEditorStore((state) => state.tablature.sections[0].columns));

	expectUncleared(result);

	act(() => {
		test_setSelection(0, 0, 0);
		clearColumns();
	});

	expect(result.current.map((c) => c.cells.map((cel) => cel.fret))).toStrictEqual([
		[-1, -1, -1, -1, -1, -1],
		[12, -1, -1, -1, -1, -1],
		[12, -1, -1, -1, -1, -1],
		[12, -1, -1, -1, -1, -1],
		[12, -1, -1, -1, -1, -1],
		[12, -1, -1, -1, -1, -1],
		[12, -1, -1, -1, -1, -1],
		[12, -1, -1, -1, -1, -1],
	]);
});

it('clears column [7] when selection is {0, 7, 7}.', () => {
	const { result } = renderHook(() => useEditorStore((state) => state.tablature.sections[0].columns));

	expectUncleared(result);

	act(() => {
		test_setSelection(0, 7, 7);
		clearColumns();
	});

	expect(result.current.map((c) => c.cells.map((cel) => cel.fret))).toStrictEqual([
		[12, -1, -1, -1, -1, -1],
		[12, -1, -1, -1, -1, -1],
		[12, -1, -1, -1, -1, -1],
		[12, -1, -1, -1, -1, -1],
		[12, -1, -1, -1, -1, -1],
		[12, -1, -1, -1, -1, -1],
		[12, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, -1],
	]);
});

it('clears columns [1-3] when selection is {0, 1, 3}.', () => {
	const { result } = renderHook(() => useEditorStore((state) => state.tablature.sections[0].columns));

	expectUncleared(result);

	act(() => {
		test_setSelection(0, 1, 3);
		clearColumns();
	});

	expect(result.current.map((c) => c.cells.map((cel) => cel.fret))).toStrictEqual([
		[12, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, -1],
		[12, -1, -1, -1, -1, -1],
		[12, -1, -1, -1, -1, -1],
		[12, -1, -1, -1, -1, -1],
		[12, -1, -1, -1, -1, -1],
	]);
});

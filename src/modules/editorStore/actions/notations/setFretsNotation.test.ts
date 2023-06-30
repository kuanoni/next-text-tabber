import { act } from 'react-dom/test-utils';

import { expect, jest } from '@jest/globals';
import { cleanup, renderHook } from '@testing-library/react';

import { CELL_NOTATIONS } from '../../constants';
import { useEditorStore } from '../../useEditorStore';
import { resetStore } from '../resets/resetStore';
import { test_setSelection } from '../testUtils';
import { setFretsNotation } from './setFretsNotation';

const setupCellFrets = () => {
	act(() => {
		useEditorStore.setState((state) => {
			for (let i = 0; i < state.tablature.sections[0].columns.length; i++) {
				if (i === 4 || i === 5 || i === 6) continue;

				state.tablature.sections[0].columns[i].cells[0].fret = 3;
			}
		});
	});
};

beforeEach(() => {
	jest.clearAllMocks();
	cleanup();
	act(() => {
		resetStore();
	});
});

it('sets notation of cells with non-blank fret values in selected columns.', () => {
	const { result } = renderHook(() => useEditorStore((state) => state.tablature.sections[0].columns));

	setupCellFrets();

	act(() => {
		test_setSelection(0, 0, 0);
		setFretsNotation(CELL_NOTATIONS['Hammer-on']);

		test_setSelection(0, 7, 7);
		setFretsNotation(CELL_NOTATIONS['Pull-off']);

		test_setSelection(0, 1, 3);
		setFretsNotation(CELL_NOTATIONS['Bend']);
	});

	for (let i = 0; i < result.current[0].cells.length; i++) {
		// The cells at [0] should get notations because they have fret values...
		if (i === 0)
			expect(result.current.map((c) => c.cells[i].notation)).toStrictEqual([
				CELL_NOTATIONS['Hammer-on'],
				CELL_NOTATIONS['Bend'],
				CELL_NOTATIONS['Bend'],
				CELL_NOTATIONS['Bend'],
				null,
				null,
				null,
				CELL_NOTATIONS['Pull-off'],
			]);
		// ...the rest don't because they have no fret values (aka blank)
		else
			expect(result.current.map((c) => c.cells[i].notation)).toStrictEqual([
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
			]);
	}
});

it("doesn't set notation of cells with blank fret values in selected columns.", () => {
	const { result } = renderHook(() => useEditorStore((state) => state.tablature.sections[0].columns));

	act(() => {
		test_setSelection(0, 4, 6);
		setFretsNotation(CELL_NOTATIONS['Bend']);
	});

	// Since no fret values were set, there should be no notations set
	for (let i = 0; i < result.current[0].cells.length; i++) {
		expect(result.current.map((c) => c.cells[i].notation)).toStrictEqual([
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
		]);
	}
});

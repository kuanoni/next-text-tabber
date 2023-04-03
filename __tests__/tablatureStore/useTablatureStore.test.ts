import { describe, expect, jest } from '@jest/globals';
import { clearTablature } from '@modules/tablatureStore/actions/clearTablature';
import { insertBlankColumn } from '@modules/tablatureStore/actions/insertBlankColumn';
import { pushBlankColumn } from '@modules/tablatureStore/actions/pushBlankColumn';
import { pushBlankLine } from '@modules/tablatureStore/actions/pushBlankLine';
import { useTablatureStore } from '@modules/tablatureStore/useTablatureStore';
import { act, cleanup, renderHook } from '@testing-library/react';

describe('useTablatureStore', () => {
	afterEach(() => {
		jest.resetAllMocks();
		cleanup();
		clearTablature();
	});

	it('The clearTablature action function reverts the tablature to its original state.', () => {
		const { result } = renderHook(() => useTablatureStore((state) => state));

		const blankTablature = result.current.instrument.BLANK_TABLATURE;

		act(() => {
			clearTablature();
		});

		expect(result.current.tablature).toEqual(blankTablature);
	});

	it('The pushBlankLine action function correctly adds a blank line.', () => {
		const { result } = renderHook(() => useTablatureStore((state) => state));

		const currentTablature = result.current.tablature;
		const blankLine = result.current.instrument.BLANK_LINE;
		const expected: Tablature = { lines: [...currentTablature.lines, blankLine] };

		act(() => {
			pushBlankLine();
		});

		expect(result.current.tablature).toEqual(expected);
	});

	it('The pushBlankColumn action function correctly adds a blank column to the first line.', () => {
		const { result } = renderHook(() => useTablatureStore((state) => state));

		const currentTablature = result.current.tablature;
		const blankColumn = result.current.instrument.BLANK_COLUMN;

		act(() => {
			pushBlankColumn(0);
		});

		expect(result.current.tablature).toEqual({
			lines: [{ columns: [...currentTablature.lines[0].columns, blankColumn] }],
		});
	});

	it('The insertBlankColumn action function correctly inserts a blank column in the first line.', () => {
		const { result } = renderHook(() => useTablatureStore((state) => state));

		const currentTablature = result.current.tablature;
		const blankColumn = result.current.instrument.BLANK_COLUMN;

		act(() => {
			insertBlankColumn(0, 0);
		});

		expect(result.current.tablature).toEqual({
			lines: [{ columns: [blankColumn, ...currentTablature.lines[0].columns] }],
		});
	});
});

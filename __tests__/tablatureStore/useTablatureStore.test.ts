import { clearTablature } from '@common/store/actions/clearTablature';
import { insertBlankColumn } from '@common/store/actions/insertBlankColumn';
import { pushBlankColumn } from '@common/store/actions/pushBlankColumn';
import { pushBlankLine } from '@common/store/actions/pushBlankLine';
import { BLANK_COLUMN, BLANK_LINE, BLANK_TABLATURE } from '@common/store/constants';
import { useTablatureStore } from '@common/store/useTablatureStore';
import { describe, expect, jest } from '@jest/globals';
import { act, cleanup, renderHook } from '@testing-library/react';

describe('useTablatureStore', () => {
	afterEach(() => {
		jest.resetAllMocks();
		cleanup();
		clearTablature();
	});

	it('The clearTablature action function reverts the tablature to its original state.', () => {
		const { result } = renderHook(() => useTablatureStore((state) => state));

		act(() => {
			clearTablature();
		});

		expect(result.current.tablature).toEqual(BLANK_TABLATURE);
	});

	it('The pushBlankLine action function correctly adds a blank line.', () => {
		const { result } = renderHook(() => useTablatureStore((state) => state));

		const currentTablature = result.current.tablature;

		act(() => {
			pushBlankLine();
		});

		expect(result.current.tablature).toEqual([...currentTablature, BLANK_LINE]);
	});

	it('The pushBlankColumn action function correctly adds a blank column to the first line.', () => {
		const { result } = renderHook(() => useTablatureStore((state) => state));

		const currentTablature = result.current.tablature;

		act(() => {
			pushBlankColumn(0);
		});

		expect(result.current.tablature).toEqual([[...currentTablature[0], BLANK_COLUMN]]);
	});

	it('The insertBlankColumn action function correctly inserts a blank column in the first line.', () => {
		const { result } = renderHook(() => useTablatureStore((state) => state));

		const currentTablature = result.current.tablature;

		act(() => {
			insertBlankColumn(0, 0);
		});

		expect(result.current.tablature).toEqual([[BLANK_COLUMN, ...currentTablature[0]]]);
	});
});

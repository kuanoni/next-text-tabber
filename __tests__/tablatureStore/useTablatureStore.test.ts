import { clearTablature } from '@common/store/actions/clearTablature';
import { pushBlankColumn } from '@common/store/actions/pushBlankColumn';
import { BLANK_COLUMN, BLANK_TABLATURE } from '@common/store/constants';
import { useTablatureStore } from '@common/store/useTablatureStore';
import { describe, expect, jest } from '@jest/globals';
import { act, cleanup, renderHook } from '@testing-library/react';

describe('useTablatureStore', () => {
	afterEach(() => {
		jest.resetAllMocks();
		cleanup();
	});

	it('The clearTablature action function reverts the tablature to its original state.', () => {
		const { result } = renderHook(() => useTablatureStore((state) => state));

		act(() => {
			clearTablature();
		});

		expect(result.current.tablature).toEqual(BLANK_TABLATURE);
	});

	it('The pushBlankColumn action function correctly adds a blank column to the first line.', () => {
		const { result } = renderHook(() => useTablatureStore((state) => state));

		const currentTablature = result.current.tablature;

		act(() => {
			pushBlankColumn(0);
		});

		expect(result.current.tablature).toEqual([[...currentTablature[0], BLANK_COLUMN]]);
	});
});

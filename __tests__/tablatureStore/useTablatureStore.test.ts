import { addBlankColumn } from '@common/store/actions/addBlankColumn';
import { clearTablature } from '@common/store/actions/clearTablature';
import { BLANK_COLUMN, BLANK_TABLATURE } from '@common/store/constants';
import { useTablatureStore } from '@common/store/useTablatureStore';
import { describe, expect, jest } from '@jest/globals';
import { act, cleanup, renderHook } from '@testing-library/react';

describe('addBlankColumn', () => {
	afterEach(() => {
		// You can chose to set the store's state to a default value here.
		jest.resetAllMocks();
		cleanup();
	});

	it('The addBlankColumn action function correctly adds a blank column.', () => {
		const { result } = renderHook(() => useTablatureStore((state) => state));

		const currentColumns = result.current.columns;

		act(() => {
			addBlankColumn();
		});

		expect(result.current.columns).toEqual([...currentColumns, BLANK_COLUMN]);
	});
});

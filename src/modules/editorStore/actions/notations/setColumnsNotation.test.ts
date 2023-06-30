import { act } from 'react-dom/test-utils';

import { expect, jest } from '@jest/globals';
import { COLUMN_NOTATIONS } from '@modules/editorStore/constants';
import { cleanup, renderHook } from '@testing-library/react';

import { useEditorStore } from '../../useEditorStore';
import { resetStore } from '../resets/resetStore';
import { test_setSelection } from '../utils';
import { setColumnsNotation } from './setColumnsNotation';

beforeEach(() => {
	jest.clearAllMocks();
	cleanup();
	act(() => {
		resetStore();
	});
});

it('sets notation of selected columns.', () => {
	const { result } = renderHook(() => useEditorStore((state) => state.tablature.sections[0].columns));

	act(() => {
		test_setSelection(0, 0, 0);
		setColumnsNotation(COLUMN_NOTATIONS['Vibrato']);

		test_setSelection(0, 7, 7);
		setColumnsNotation(COLUMN_NOTATIONS['Vibrato']);

		test_setSelection(0, 3, 6);
		setColumnsNotation(COLUMN_NOTATIONS['Palm Mute']);
	});

	expect(result.current.map((c) => c.notation)).toStrictEqual([
		COLUMN_NOTATIONS['Vibrato'],
		null,
		null,
		COLUMN_NOTATIONS['Palm Mute'],
		COLUMN_NOTATIONS['Palm Mute'],
		COLUMN_NOTATIONS['Palm Mute'],
		COLUMN_NOTATIONS['Palm Mute'],
		COLUMN_NOTATIONS['Vibrato'],
	]);
});

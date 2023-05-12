import { describe, expect, jest } from '@jest/globals';
import { act, cleanup, renderHook } from '@testing-library/react';

import { resetEditor } from '../editorSlice/actions/resetEditor';
import { editorInitialState } from '../editorSlice/constants';
import { useTablatureEditorStore } from '../useTablatureEditorStore';

describe('Editor slice actions', () => {
	afterEach(() => {
		jest.resetAllMocks();
		cleanup();
	});

	it('[resetEditor] reset the entire state to the initial state.', () => {
		const { result } = renderHook(() => useTablatureEditorStore((state) => state));

		act(() => {
			resetEditor();
		});

		for (const key of Object.keys(editorInitialState))
			expect(result.current[key as keyof EditorSlice]).toEqual(editorInitialState[key as keyof EditorSlice]);
	});
});

import { describe, expect, jest } from '@jest/globals';
import { act, cleanup, renderHook } from '@testing-library/react';

import { resetEditor } from '../actions/resetEditor';
import { editorInitialState } from '../constants';
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
			expect(result.current[key as keyof EditorStore]).toEqual(editorInitialState[key as keyof EditorStore]);
	});
});

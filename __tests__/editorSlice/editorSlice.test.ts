import { describe, expect, jest } from '@jest/globals';
import { resetEditor } from '@modules/tablatureEditorStore/editorSlice/actions/resetEditor';
import { editorInitialState } from '@modules/tablatureEditorStore/editorSlice/constants';
import { useTablatureEditorStore } from '@modules/tablatureEditorStore/useTablatureEditorStore';
import { act, cleanup, renderHook } from '@testing-library/react';

describe('useTablatureEditorStore', () => {
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

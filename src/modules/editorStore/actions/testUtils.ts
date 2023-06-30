import { useEditorStore } from '../useEditorStore';

export const test_setSelection = (section: number, start: number, end: number) => {
	useEditorStore.setState((state) => {
		state.currentSelection = { section, start, end };
	});
};

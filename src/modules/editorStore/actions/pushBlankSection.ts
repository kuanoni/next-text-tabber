import { useEditorStore } from '../useEditorStore';

export const pushBlankSection = (name?: string) =>
	useEditorStore.setState((state) => {
		if (!name) name = `Section ${state.tablature.sections.length + 1}`;
		state.tablature.sections.push({ ...state.instrument.createBlankSection(), name });
	});

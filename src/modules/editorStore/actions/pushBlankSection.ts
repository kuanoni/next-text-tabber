import { useTablatureEditorStore } from '../useTablatureEditorStore';

export const pushBlankSection = (name?: string) =>
	useTablatureEditorStore.setState((state) => {
		if (!name) name = `Section ${state.tablature.sections.length + 1}`;
		state.tablature.sections.push({ ...state.instrument.BLANK_SECTION, name });
	});

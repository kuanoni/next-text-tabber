import { useTablatureEditorStore } from '../useTablatureEditorStore';

export const pushBlankSection = () =>
	useTablatureEditorStore.setState((state) => {
		state.tablature.sections.push(state.instrument.BLANK_SECTION);
	});

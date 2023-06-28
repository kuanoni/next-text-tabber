import { useEditorStore } from '@modules/editorStore/useEditorStore';

export const createSection = (name?: string) =>
	useEditorStore.setState((state) => {
		state.tablature.sections.push(state.instrument.createBlankSection(name));
	});

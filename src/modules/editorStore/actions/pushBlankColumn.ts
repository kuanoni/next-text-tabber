import { useEditorStore } from '../useEditorStore';

export const pushBlankColumn = (sectionIndex: number) =>
	useEditorStore.setState((state) => {
		if (!state.tablature.sections[sectionIndex])
			return console.error(`Tried to push column to non-existant section: ${sectionIndex}`);

		state.tablature.sections[sectionIndex].columns.push(state.instrument.createBlankColumn());
	});

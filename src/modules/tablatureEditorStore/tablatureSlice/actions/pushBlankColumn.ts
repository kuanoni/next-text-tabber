import { useTablatureEditorStore } from '../../useTablatureEditorStore';

export const pushBlankColumn = (lineIndex: number) =>
	useTablatureEditorStore.setState((state) => {
		if (!state.tablature.lines[lineIndex])
			return console.error(`Tried to push column to non-existant line: ${lineIndex}`);

		state.tablature.lines[lineIndex].columns.push(state.instrument.BLANK_COLUMN);
	});

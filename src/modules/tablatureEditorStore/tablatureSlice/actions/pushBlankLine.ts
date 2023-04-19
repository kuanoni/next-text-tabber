import { useTablatureEditorStore } from '../../useTablatureEditorStore';

export const pushBlankLine = () =>
	useTablatureEditorStore.setState((state) => {
		state.tablature.lines.push(state.instrument.BLANK_LINE);
	});

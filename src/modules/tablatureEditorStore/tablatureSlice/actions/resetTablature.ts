import { useTablatureEditorStore } from '../../useTablatureEditorStore';

export const resetTablature = () =>
	useTablatureEditorStore.setState((state) => {
		state.tablature = state.instrument.BLANK_TABLATURE;
	});

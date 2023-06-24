import { useEditorStore } from '../useEditorStore';

export const resetTablature = () =>
	useEditorStore.setState((state) => {
		state.tablature = state.instrument.BLANK_TABLATURE;
	});

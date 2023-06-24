import type { Instrument } from '@modules/editorStore/Instrument';
import { useEditorStore } from '../useEditorStore';

export const setTuning = (tuning: Instrument['defaultTuning']) =>
	useEditorStore.setState((state) => {
		if (tuning.length !== state.instrument.defaultTuning.length)
			throw new Error(
				`[changeTuning]: invalid length of tuning array (${tuning.length}). Should be ${state.instrument.defaultTuning.length}.`
			);
		state.tuning = tuning;
	});

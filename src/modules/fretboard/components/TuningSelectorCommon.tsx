import { ChangeEventHandler } from 'react';

import { setTuning } from '@modules/editorStore/actions/setTuning';
import { useTablatureEditorStore } from '@modules/editorStore/useTablatureEditorStore';

const instrumentSelector = (state: EditorStore) => state.instrument;

const TuningSelectorCommon = () => {
	const instrument = useTablatureEditorStore(instrumentSelector);

	const onCommonTuningChange: ChangeEventHandler<HTMLSelectElement> = (e) =>
		setTuning(instrument.commonTunings[e.target.value]);

	return (
		<select
			data-testid='tuning-selector-common'
			defaultValue={instrument.defaultTuningName}
			onChange={onCommonTuningChange}
		>
			{Object.keys(instrument.commonTunings).map((tuningName) => (
				<option key={tuningName} value={tuningName}>
					{tuningName === instrument.defaultTuningName ? `${tuningName} (Default)` : tuningName}
				</option>
			))}
		</select>
	);
};

export default TuningSelectorCommon;

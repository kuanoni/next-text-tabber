import { ChangeEventHandler } from 'react';

import { setTuning } from '@modules/editorStore/new_actions';
import { useEditorStore } from '@modules/editorStore/useEditorStore';

const instrumentSelector = (state: EditorStore) => state.instrument;

const TuningSelectorCommon = () => {
	const instrument = useEditorStore(instrumentSelector);

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

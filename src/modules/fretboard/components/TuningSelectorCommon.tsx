import { ChangeEventHandler } from 'react';

import { changeTuning } from '@modules/tablatureStore/actions/changeTuning';
import { useTablatureEditorStore } from '@modules/tablatureStore/useTablatureEditorStore';

const TuningSelectorCommon = () => {
	const instrument = useTablatureEditorStore((state) => state.instrument);

	const onCommonTuningChange: ChangeEventHandler<HTMLSelectElement> = (e) =>
		changeTuning(instrument.commonTunings[e.target.value]);

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

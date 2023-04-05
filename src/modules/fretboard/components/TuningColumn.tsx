import { ChangeEventHandler } from 'react';

import { changeTuning } from '@modules/tablatureStore/actions/changeTuning';
import { useTablatureStore } from '@modules/tablatureStore/useTablatureStore';

import styles from './Fretboard.module.scss';
import TuningSelector from './TuningSelector';

const TuningColumn = () => {
	const tuning = useTablatureStore().tuning;
	const instrument = useTablatureStore().instrument;

	const onCommonTuningChange: ChangeEventHandler<HTMLSelectElement> = (e) =>
		changeTuning(instrument.commonTunings[e.target.value]);

	const onTuningSelectorChange = (stringIndex: number, tuningValue: number) => {
		const newTuning = [...tuning];
		newTuning[stringIndex] = tuningValue;
		changeTuning(newTuning);
	};

	return (
		<div className={styles['tuning-column']}>
			<select defaultValue={instrument.defaultTuningName} onChange={onCommonTuningChange}>
				{Object.keys(instrument.commonTunings).map((tuningName) => (
					<option key={tuningName} value={tuningName}>
						{tuningName === instrument.defaultTuningName ? `${tuningName} (Default)` : tuningName}
					</option>
				))}
			</select>
			{tuning.map((tuningValue, stringIndex) => (
				<TuningSelector
					key={stringIndex}
					stringIndex={stringIndex}
					tuningValue={tuningValue}
					onSelectChange={onTuningSelectorChange}
				/>
			))}
		</div>
	);
};

export default TuningColumn;

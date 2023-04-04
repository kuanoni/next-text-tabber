import { changeTuning } from '@modules/tablatureStore/actions/changeTuning';
import { useTablatureStore } from '@modules/tablatureStore/useTablatureStore';

import { OCTAVE_NOTES } from '../constants';
import styles from './TuningColumn.module.scss';

const TuningColumn = () => {
	const tuning = useTablatureStore().tuning;

	const onSelectChange = (stringIndex: number, tuningValue: number) => {
		const newTuning = [...tuning];
		newTuning[stringIndex] = tuningValue;
		changeTuning(newTuning);
	};

	return (
		<div className={styles['tuning-column']}>
			{tuning.map((tuningValue, stringIndex) => {
				return (
					<select
						key={stringIndex}
						defaultValue={tuningValue}
						onChange={() => onSelectChange(stringIndex, tuningValue)}
					>
						{OCTAVE_NOTES.map((note, i) => (
							<option key={note} value={i}>
								{note}
							</option>
						))}
					</select>
				);
			})}
		</div>
	);
};

export default TuningColumn;

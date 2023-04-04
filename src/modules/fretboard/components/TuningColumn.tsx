import { changeTuning } from '@modules/tablatureStore/actions/changeTuning';
import { useTablatureStore } from '@modules/tablatureStore/useTablatureStore';

import styles from './Fretboard.module.scss';
import TuningSelector from './TuningSelector';

const TuningColumn = () => {
	const tuning = useTablatureStore().tuning;

	const onSelectChange = (stringIndex: number, tuningValue: number) => {
		const newTuning = [...tuning];
		newTuning[stringIndex] = tuningValue;
		changeTuning(newTuning);
	};

	return (
		<div className={styles['tuning-column']}>
			{tuning.map((tuningValue, stringIndex) => (
				<TuningSelector
					key={stringIndex}
					stringIndex={stringIndex}
					tuningValue={tuningValue}
					onSelectChange={onSelectChange}
				/>
			))}
		</div>
	);
};

export default TuningColumn;

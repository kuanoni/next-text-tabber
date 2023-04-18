import { changeTuning } from '@modules/tablatureStore/actions/changeTuning';
import { useTablatureEditorStore } from '@modules/tablatureStore/useTablatureEditorStore';

import styles from './Fretboard.module.scss';
import TuningSelector from './TuningSelector';
import TuningSelectorCommon from './TuningSelectorCommon';

const TuningColumn = () => {
	const tuning = useTablatureEditorStore((state) => state.tuning);

	const onTuningSelectorChange = (stringIndex: number, tuningValue: number) => {
		const newTuning = [...tuning];
		newTuning[stringIndex] = tuningValue;
		changeTuning(newTuning);
	};

	return (
		<div className={styles['tuning-column']} data-testid='tuning-column'>
			<TuningSelectorCommon />
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

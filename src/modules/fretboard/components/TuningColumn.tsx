import { setTuning } from '@modules/editorStore/actions/setTuning';
import { useTablatureEditorStore } from '@modules/editorStore/useTablatureEditorStore';

import styles from './Fretboard.module.scss';
import TuningSelector from './TuningSelector';
import TuningSelectorCommon from './TuningSelectorCommon';

const tuningSelector = (state: EditorStore) => state.tuning;

const TuningColumn = () => {
	const tuning = useTablatureEditorStore(tuningSelector);

	const onTuningSelectorChange = (stringIndex: number, tuningValue: number) => {
		const newTuning = [...tuning];
		newTuning[stringIndex] = tuningValue;
		setTuning(newTuning);
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

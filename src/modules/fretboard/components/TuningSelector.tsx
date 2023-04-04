import { OCTAVE_NOTES } from '../constants';
import styles from './Fretboard.module.scss';

interface Props {
	stringIndex: number;
	tuningValue: number;
	onSelectChange(stringIndex: number, tuningValue: number): void;
}

const TuningSelector = ({ stringIndex, tuningValue, onSelectChange }: Props) => {
	return (
		<select
			className={styles['tuning-selector']}
			defaultValue={tuningValue}
			onChange={(e) => onSelectChange(stringIndex, parseInt(e.target.value))}
		>
			{OCTAVE_NOTES.map((note, i) => (
				<option key={note} value={i}>
					{note}
				</option>
			))}
		</select>
	);
};

export default TuningSelector;

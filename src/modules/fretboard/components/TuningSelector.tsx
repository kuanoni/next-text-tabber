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
			data-testid={`tuning-selector-${stringIndex}`}
			className={styles['tuning-selector']}
			value={tuningValue}
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

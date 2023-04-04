import styles from './Fretboard.module.scss';
import TuningColumn from './TuningColumn';

interface Props {
	instrument: Instrument;
}

const Fretboard = ({ instrument }: Props) => {
	return (
		<div className={styles.fretboard}>
			<TuningColumn />
			<div className={styles.frets}></div>
		</div>
	);
};

export default Fretboard;

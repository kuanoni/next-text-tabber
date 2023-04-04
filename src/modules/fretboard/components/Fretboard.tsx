import styles from './Fretboard.module.scss';
import TuningColumn from './TuningColumn';

const Fretboard = () => {
	return (
		<div className={styles.fretboard}>
			<TuningColumn />
			<div className={styles.frets}></div>
		</div>
	);
};

export default Fretboard;

import { Instrument } from '@common/Instrument';

import styles from './Fretboard.module.scss';
import TuningSelector from './TuningSelector';

interface Props {
	instrument: Instrument;
}

const Fretboard = ({ instrument }: Props) => {
	return (
		<div className={styles.fretboard}>
			<TuningSelector defaultTuning={instrument.defaultTuning} />
			<div className={styles.frets}></div>
		</div>
	);
};

export default Fretboard;

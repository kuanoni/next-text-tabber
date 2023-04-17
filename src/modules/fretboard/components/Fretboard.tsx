import { useTablatureStore } from '@modules/tablatureStore/useTablatureStore';

import styles from './Fretboard.module.scss';
import FretColumn from './FretColumn';
import TuningColumn from './TuningColumn';

const Fretboard = () => {
	const instrument = useTablatureStore((state) => state.instrument);

	return (
		<div className={styles.fretboard}>
			<TuningColumn />
			<div className={styles['fret-columns-container']}>
				{[...Array(instrument.amountOfFrets + 1)].map((_, fretNumber) => (
					<FretColumn key={fretNumber} fretNumber={fretNumber} amountOfStrings={instrument.amountOfStrings} />
				))}
			</div>
		</div>
	);
};

export default Fretboard;

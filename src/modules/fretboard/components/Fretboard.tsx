import { useTablatureEditorStore } from '@modules/tablatureEditorStore/useTablatureEditorStore';

import styles from './Fretboard.module.scss';
import FretColumn from './FretColumn';
import TuningColumn from './TuningColumn';

const instrumentSelector = (state: TablatureEditorStore) => state.instrument;

const Fretboard = () => {
	const instrument = useTablatureEditorStore(instrumentSelector);

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

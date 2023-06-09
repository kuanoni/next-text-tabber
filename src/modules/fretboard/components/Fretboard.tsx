import { useEditorStore } from '@modules/editorStore/useEditorStore';

import styles from './Fretboard.module.scss';
import FretboardTuningColumn from './FretboardTuningColumn';
import FretColumn from './FretColumn';

const instrumentSelector = (state: EditorStore) => state.instrument;

const Fretboard = () => {
	const instrument = useEditorStore(instrumentSelector);

	return (
		<div className={styles.fretboard}>
			<FretboardTuningColumn />
			<div className={styles['fret-columns-container']}>
				{[...Array(instrument.amountOfFrets + 1)].map((_, fretNumber) => (
					<FretColumn key={fretNumber} fretNumber={fretNumber} amountOfStrings={instrument.amountOfStrings} />
				))}
			</div>
		</div>
	);
};

export default Fretboard;

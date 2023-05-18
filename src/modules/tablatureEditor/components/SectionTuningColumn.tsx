import { useTablatureEditorStore } from '@modules/editorStore/useTablatureEditorStore';
import { OCTAVE_NOTES } from '@modules/fretboard/constants';

import styles from './Tablature.module.scss';

const tuningSelector = (state: EditorStore) => state.tuning;

const SectionTuningColumn = () => {
	const tuning = useTablatureEditorStore(tuningSelector);

	return (
		<>
			<div className={`${styles.column} ${styles.tuning}`}>
				<div>&nbsp;</div>
				{tuning
					.map((tuningValue, stringIndex) => {
						return <div key={stringIndex}>{OCTAVE_NOTES[tuningValue].replace(/[0-9]/g, '')}</div>;
					})
					.reverse()}
			</div>
			<div className={`${styles.column} ${styles.tuning}`}>
				<div>&nbsp;</div>
				{new Array(tuning.length).fill('').map((_, i) => (
					<div key={i}>|</div>
				))}
			</div>
		</>
	);
};

export default SectionTuningColumn;

import { toggleFret } from '@modules/editorStore/new_actions';

import styles from './Fretboard.module.scss';

interface Props {
	stringNumber: number;
	fretNumber: number;
}

const Fret = ({ stringNumber, fretNumber }: Props) => {
	const onClick = () => {
		try {
			toggleFret(stringNumber, fretNumber);
		} catch (err) {
			console.warn(err);
		}
	};

	return <div data-testid={`fret ${fretNumber} ${stringNumber}`} className={styles.fret} onClick={onClick}></div>;
};

export default Fret;

import { setSelectedColumnsFret } from '@modules/tablatureEditorStore/tablatureSlice/actions/setSelectedColumnsFret';

import styles from './Fretboard.module.scss';

interface Props {
	stringNumber: number;
	fretNumber: number;
}

const Fret = ({ stringNumber, fretNumber }: Props) => {
	const onClick = () => {
		setSelectedColumnsFret(stringNumber, fretNumber);
	};

	return <div data-testid={`fret ${fretNumber} ${stringNumber}`} className={styles.fret} onClick={onClick}></div>;
};

export default Fret;

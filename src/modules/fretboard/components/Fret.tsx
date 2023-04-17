import { setColumnFret } from '@modules/tablatureStore/actions/setSelectedColumnsFret';

import styles from './Fretboard.module.scss';

interface Props {
	stringNumber: number;
	fretNumber: number;
}

const Fret = ({ stringNumber, fretNumber }: Props) => {
	const onClick = () => {
		setColumnFret(stringNumber, fretNumber);
	};

	return <div className={styles.fret} onClick={onClick}></div>;
};

export default Fret;

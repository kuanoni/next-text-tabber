import Fret from './Fret';
import styles from './Fretboard.module.scss';

interface Props {
	fretNumber: number;
	amountOfStrings: number;
}

const FretColumn = ({ fretNumber, amountOfStrings }: Props) => {
	return (
		<div className={styles['fret-column']}>
			<div className={styles['column-label']}>{fretNumber}</div>
			{[...Array(amountOfStrings)].map((_, stringNumber) => {
				return <Fret key={stringNumber} stringNumber={stringNumber} fretNumber={fretNumber} />;
			})}
		</div>
	);
};

export default FretColumn;

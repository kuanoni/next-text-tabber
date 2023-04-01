import Line from './Line';
import styles from './Tablature.module.scss';

interface Props {
	lines: Line[];
}

const Tablature = ({ lines }: Props) => {
	return (
		<div className={styles.tablature}>
			{lines.map((line, i) => (
				<Line key={i} columns={line} />
			))}
		</div>
	);
};

export default Tablature;

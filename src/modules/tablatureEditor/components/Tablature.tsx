import Line from './Line';
import styles from './Tablature.module.scss';

interface Props {
	tablature: Tablature;
}

const Tablature = ({ tablature }: Props) => {
	return (
		<div className={styles.tablature}>
			{tablature.lines.map((line, i) => (
				<Line key={i} index={i} line={line} />
			))}
		</div>
	);
};

export default Tablature;

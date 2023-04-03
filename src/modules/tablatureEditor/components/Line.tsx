import Column from './Column';
import styles from './Line.module.scss';

interface Props {
	line: Line;
}

const Line = ({ line }: Props) => {
	return (
		<div className={styles.line}>
			{line.columns.map((column, i) => (
				<Column key={i} column={column} />
			))}
		</div>
	);
};

export default Line;

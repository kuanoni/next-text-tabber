import Column from './Column';
import styles from './Line.module.scss';

interface Props {
	columns: Line;
}

const Line = ({ columns }: Props) => {
	return (
		<div className={styles.line}>
			{columns.map((column, i) => (
				<Column key={i} column={column} />
			))}
		</div>
	);
};

export default Line;

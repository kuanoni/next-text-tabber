import Cell from './Cell';
import styles from './Column.module.scss';

interface Props {
	column: Column;
}

const Column = ({ column }: Props) => {
	return (
		<div className={styles.column}>
			{column.cells.map((cell, i) => (
				<Cell key={i} cell={cell} />
			))}
		</div>
	);
};

export default Column;

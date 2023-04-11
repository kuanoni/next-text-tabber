import Cell from './Cell';
import styles from './Column.module.scss';

interface Props {
	index: number;
	column: Column;
	isSelected: boolean;
	onMouseUp(columnIndex: number): void;
	onMouseDown(columnIndex: number): void;
}

const Column = ({ index, column, isSelected, onMouseUp, onMouseDown }: Props) => {
	return (
		<div
			className={isSelected ? styles.column + ' ' + styles.selected : styles.column}
			data-col-idx={index}
			onMouseDown={() => onMouseDown(index)}
			onMouseUp={() => onMouseUp(index)}
		>
			{column.cells.map((cell, i) => (
				<Cell key={i} cell={cell} />
			))}
		</div>
	);
};

export default Column;

import styles from './Cell.module.scss';

interface Props {
	cell: Cell;
}

const Cell = ({ cell }: Props) => {
	return (
		<div data-testid='cell' className={styles.cell}>
			{cell.fret === -1 ? '-' : cell.fret}
		</div>
	);
};

export default Cell;

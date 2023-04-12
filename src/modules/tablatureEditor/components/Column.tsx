import { memo, MouseEventHandler } from 'react';

import { columnSelectionFinish } from '@modules/editorStore/actions/columnSelectionFinish';
import { columnSelectionStart } from '@modules/editorStore/actions/columnSelectionStart';

import Cell from './Cell';
import styles from './Column.module.scss';

interface Props {
	lineIndex: number;
	columnIndex: number;
	column: Column;
	isSelected: boolean;
}

const Column = memo<Props>(({ lineIndex, columnIndex, column, isSelected }) => {
	const onMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
		e.stopPropagation();
		columnSelectionStart(lineIndex, columnIndex);

		// if mouseup event is triggered anywhere ELSE in the window, finish the selection
		// window.addEventListener('mouseup', () => columnSelectionFinish(lineIndex, columnIndex), { once: true });
	};

	const onMouseUp: MouseEventHandler<HTMLDivElement> = (e) => {
		e.stopPropagation();
		columnSelectionFinish(lineIndex, columnIndex);
	};

	return (
		<div
			className={isSelected ? styles.column + ' ' + styles.selected : styles.column}
			data-col-idx={columnIndex}
			onMouseDown={onMouseDown}
			onMouseUp={onMouseUp}
		>
			{column.cells.map((cell, i) => (
				<Cell key={i} cell={cell} />
			))}
		</div>
	);
});

Column.displayName = 'Column';
export default Column;

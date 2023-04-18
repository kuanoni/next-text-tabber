import { memo, MouseEventHandler } from 'react';

import { columnSelectionFinish } from '@modules/editorStore/actions/columnSelectionFinish';
import { columnSelectionHover } from '@modules/editorStore/actions/columnSelectionHover';
import { columnSelectionStart } from '@modules/editorStore/actions/columnSelectionStart';
import { useEditorStore } from '@modules/editorStore/useEditorStore';

import Cell from './Cell';
import styles from './Column.module.scss';

interface Props {
	lineIndex: number;
	columnIndex: number;
	column: Column;
	isSelected: boolean;
}

const isSelectingSelector = (state: EditorSlice) => state.isSelecting;

const Column = memo<Props>(({ lineIndex, columnIndex, column, isSelected }) => {
	const isSelecting = useEditorStore(isSelectingSelector);

	const onMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
		e.stopPropagation();
		columnSelectionStart(lineIndex, columnIndex);
		document.addEventListener(
			'mouseup',
			(e) => {
				e.stopPropagation();
				columnSelectionFinish();
			},
			{ once: true }
		);
	};

	const onMouseOver: MouseEventHandler<HTMLDivElement> = () => {
		if (isSelecting) columnSelectionHover(lineIndex, columnIndex);
	};

	return (
		<div
			data-testid='column'
			data-selected={isSelected}
			className={styles.column}
			onMouseDown={onMouseDown}
			onMouseOver={onMouseOver}
		>
			{column.cells.map((cell, i) => (
				<Cell key={i} cell={cell} />
			))}
		</div>
	);
});

Column.displayName = 'Column';
export default Column;

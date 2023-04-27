import { memo, MouseEventHandler } from 'react';

import { columnSelectionFinish } from '@modules/tablatureEditorStore/editorSlice/actions/columnSelectionFinish';
import { columnSelectionHover } from '@modules/tablatureEditorStore/editorSlice/actions/columnSelectionHover';
import { columnSelectionStart } from '@modules/tablatureEditorStore/editorSlice/actions/columnSelectionStart';
import { useTablatureEditorStore } from '@modules/tablatureEditorStore/useTablatureEditorStore';

import Cell from './Cell';
import styles from './Column.module.scss';

interface Props {
	lineIndex: number;
	columnIndex: number;
	column: Column;
	isSelected: boolean;
	isGhostSelected: boolean;
}

const isSelectingSelector = (state: EditorSlice) => state.isSelecting;

const Column = memo<Props>(({ lineIndex, columnIndex, column, isSelected, isGhostSelected }) => {
	const isSelecting = useTablatureEditorStore(isSelectingSelector);

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
			data-ghost-selected={isGhostSelected}
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

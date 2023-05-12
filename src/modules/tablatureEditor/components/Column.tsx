import { memo, MouseEventHandler, useMemo } from 'react';

import { columnSelectionFinish } from '@modules/editorStore/actions/columnSelection/columnSelectionFinish';
import { columnSelectionHover } from '@modules/editorStore/actions/columnSelection/columnSelectionHover';
import { columnSelectionStart } from '@modules/editorStore/actions/columnSelection/columnSelectionStart';
import { BLANK_NOTE_CHAR } from '@modules/editorStore/constants';
import { useTablatureEditorStore } from '@modules/editorStore/useTablatureEditorStore';

import styles from './Tablature.module.scss';

interface Props {
	sectionIndex: number;
	columnIndex: number;
	column: Column;
	isSelected: boolean;
	isGhostSelected: boolean;
}

const getColumnFormattingInfo = (cells: Cell[]) => {
	// These are flags which will determine the type of end-padding the column gets
	let isColumnSnapping = false;
	let isColumnBlank = true;

	const columnWidth = cells.reduce((prevWidth, cell) => {
		// Get character length of cell fret minus the the negative sign (-)
		let curWidth = Math.abs(cell.fret).toString().length;

		// Trip column flags if necessary
		if (cell.modifier?.behavior === 'snap') isColumnSnapping = true;
		if (cell.fret !== -1) isColumnBlank = false;

		// If cell has a modifier, add its symbol character lengths
		if (cell.modifier) {
			curWidth += cell.modifier.symbolRight.length;
			if (cell.modifier.behavior === 'wrap') curWidth += cell.modifier.symbolLeft.length;
		}

		// Return the higher width between the current and previous cell
		return Math.max(prevWidth, curWidth);
	}, 0);

	const requiresPadding = !isColumnBlank && !isColumnSnapping;

	return { columnWidth, requiresPadding };
};

const formatInnerRows = (cells: Cell[]) => {
	const { columnWidth, requiresPadding } = getColumnFormattingInfo(cells);

	return cells.map((cell) => {
		let rowString = cell.fret.toString();

		// Replace '-1's with the proper blank cell character
		if (cell.fret === -1) rowString = BLANK_NOTE_CHAR;
		// Concatinates fret characters with modifier symbol characters
		else if (cell.modifier?.behavior === 'snap') rowString += cell.modifier.symbolRight;
		else if (cell.modifier?.behavior === 'wrap')
			rowString = cell.modifier.symbolLeft + rowString + cell.modifier.symbolRight;

		// Fill blank spaces with blank note characters (-)
		rowString = rowString.padStart(columnWidth, BLANK_NOTE_CHAR);

		// Apply end-padding if required
		if (requiresPadding) rowString += BLANK_NOTE_CHAR;

		return rowString;
	});
};

const isSelectingSelector = (state: EditorStore) => state.isSelecting;

const Column = memo<Props>(({ sectionIndex, columnIndex, column, isSelected, isGhostSelected }) => {
	const isSelecting = useTablatureEditorStore(isSelectingSelector);

	const onMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
		e.stopPropagation();
		columnSelectionStart(sectionIndex, columnIndex);
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
		if (isSelecting) columnSelectionHover(sectionIndex, columnIndex);
	};

	const innerRows = useMemo(() => formatInnerRows(column.cells), [column]);

	return (
		<div
			data-testid='column'
			data-selected={isSelected}
			data-ghost-selected={isGhostSelected}
			className={styles.column}
			onMouseDown={onMouseDown}
			onMouseOver={onMouseOver}
		>
			{innerRows.map((row, i) => (
				<div key={i}>{row}</div>
			))}
		</div>
	);
});

Column.displayName = 'Column';
export default Column;

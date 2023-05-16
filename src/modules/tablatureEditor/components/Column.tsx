import { memo, MouseEventHandler, useMemo } from 'react';

import numIsBetweenRange from '@common/utils/numBetweenRange';
import { columnSelectionFinish } from '@modules/editorStore/actions/columnSelection/columnSelectionFinish';
import { columnSelectionHover } from '@modules/editorStore/actions/columnSelection/columnSelectionHover';
import { columnSelectionStart } from '@modules/editorStore/actions/columnSelection/columnSelectionStart';
import { BLANK_NOTE_CHAR } from '@modules/editorStore/constants';
import { useTablatureEditorStore } from '@modules/editorStore/useTablatureEditorStore';

import styles from './Tablature.module.scss';

interface Props {
	sectionIndex: number;
	column: Column;
	columnIndex: number;
}

// Check adjacent columns to see if column with modifier is the start or end of the modified column group
const getColumnModifierPosition = (columnIndex: number, columns: Column[]): ColumnModifierPosition => {
	const column = columns[columnIndex];
	if (!column.modifier) return undefined;

	const prevColumn = columns[columnIndex - 1];
	const nextColumn = columns[columnIndex + 1];

	if (prevColumn?.modifier !== column.modifier && nextColumn?.modifier !== column.modifier) return 'solo';

	if (prevColumn?.modifier !== column.modifier) return 'start';
	else if (nextColumn?.modifier !== column.modifier) return 'end';
	else return 'middle';
};

const getColumnFormattingInfo = (column: Column) => {
	// These are flags which will determine the type of end-padding the column gets
	let isColumnSnapping = false;
	let isColumnBlank = true;

	const columnWidth = column.cells.reduce((prevWidth, cell) => {
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

const formatInnerRows = (column: Column, modifierPosition: ColumnModifierPosition) => {
	const { cells, modifier } = column;
	const { columnWidth, requiresPadding: _requiresPadding } = getColumnFormattingInfo(column);
	let requiresPadding = _requiresPadding;

	let modifierRow = '\u00A0';
	if (modifier) {
		const start = modifier.start || modifier.filler;
		const end = modifier.end || modifier.filler;

		switch (modifierPosition) {
			case 'start':
				modifierRow = start.padEnd(columnWidth + (requiresPadding ? 1 : 0), modifier.filler);
				break;
			case 'end':
				modifierRow = end.padStart(columnWidth, modifier.filler);
				break;
			case 'solo':
				modifierRow = start.padEnd(columnWidth, modifier.filler);
				break;
			default:
				modifierRow = modifier.filler.padEnd(columnWidth + (requiresPadding ? 1 : 0), modifier.filler);
				break;
		}

		if (modifierRow.length > columnWidth) requiresPadding = true;
	}

	const cellRows = cells.map((cell) => {
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

	return [modifierRow, ...cellRows];
};

const isColumnInSelection = (selection: ColumnSelection, columnIndex: number, sectionIndex: number) =>
	selection.start !== null &&
	selection.end !== null &&
	sectionIndex === selection.section &&
	numIsBetweenRange(columnIndex, selection.start, selection.end);

const Column = memo<Props>(({ sectionIndex, column, columnIndex }) => {
	const isSelecting = useTablatureEditorStore(
		(state) => state.isSelecting && state.ghostSelection.section === sectionIndex
	);
	const isSelected = useTablatureEditorStore((state) =>
		isColumnInSelection(state.currentSelection, columnIndex, sectionIndex)
	);
	const isGhostSelected = useTablatureEditorStore((state) =>
		isColumnInSelection(state.ghostSelection, columnIndex, sectionIndex)
	);
	const modifierPosition = useTablatureEditorStore((state) =>
		getColumnModifierPosition(columnIndex, state.tablature.sections[sectionIndex].columns)
	);

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

	const innerRows = useMemo(() => formatInnerRows(column, modifierPosition), [column, modifierPosition]);

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

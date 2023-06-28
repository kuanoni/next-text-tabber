import { memo, MouseEventHandler, useCallback, useMemo } from 'react';

import numIsBetweenRange from '@common/utils/numBetweenRange';
import { BLANK_COLUMN_NOTATION_CHAR, BLANK_NOTE_CHAR } from '@modules/editorStore/constants';
import { selectionFinish, selectionHover, selectionStart } from '@modules/editorStore/new_actions';
import { useEditorStore } from '@modules/editorStore/useEditorStore';

import styles from './Tablature.module.scss';

interface Props {
	sectionIndex: number;
	column: Column;
	columnIndex: number;
}

// Check adjacent columns to see if column with notation is the start or end of the modified column group
const getColumnNotationPosition = (columnIndex: number, columns: Column[]): ColumnNotationPosition => {
	const column = columns[columnIndex];
	if (!column.notation) return undefined;

	const prevColumn = columns[columnIndex - 1];
	const nextColumn = columns[columnIndex + 1];

	if (prevColumn?.notation !== column.notation && nextColumn?.notation !== column.notation) return 'solo';

	if (prevColumn?.notation !== column.notation) return 'start';
	else if (nextColumn?.notation !== column.notation) return 'end';
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
		if (cell.notation?.behavior === 'snap') isColumnSnapping = true;
		if (cell.fret !== -1) isColumnBlank = false;

		// If cell has a notation, add its symbol character lengths
		if (cell.notation) {
			curWidth += cell.notation.symbolRight.length;
			if (cell.notation.behavior === 'wrap') curWidth += cell.notation.symbolLeft.length;
		}

		// Return the higher width between the current and previous cell
		return Math.max(prevWidth, curWidth);
	}, 0);

	const requiresPadding = !isColumnBlank && !isColumnSnapping;

	return { columnWidth, requiresPadding };
};

const formatInnerRows = (column: Column, notationPosition: ColumnNotationPosition) => {
	const { cells, notation: notation } = column;
	const { columnWidth, requiresPadding: _requiresPadding } = getColumnFormattingInfo(column);
	let requiresPadding = _requiresPadding;

	let notationRow = BLANK_COLUMN_NOTATION_CHAR;
	if (notation) {
		const start = notation.start || notation.filler;
		const end = notation.end || notation.filler;

		switch (notationPosition) {
			case 'start':
				notationRow = start.padEnd(columnWidth + (requiresPadding ? 1 : 0), notation.filler);
				break;
			case 'end':
				notationRow = end.padStart(columnWidth, notation.filler);
				break;
			case 'solo':
				notationRow = start.padEnd(columnWidth, notation.filler);
				break;
			default:
				notationRow = notation.filler.padEnd(columnWidth + (requiresPadding ? 1 : 0), notation.filler);
				break;
		}

		if (notationRow.length > columnWidth) requiresPadding = true;
	}

	const cellRows = cells.map((cell) => {
		let rowString = cell.fret.toString();

		// Replace '-1's with the proper blank cell character
		if (cell.fret === -1) rowString = BLANK_NOTE_CHAR;
		// Concatinates fret characters with notation symbol characters
		else if (cell.notation?.behavior === 'snap') rowString += cell.notation.symbolRight;
		else if (cell.notation?.behavior === 'wrap')
			rowString = cell.notation.symbolLeft + rowString + cell.notation.symbolRight;

		// Fill blank spaces with blank note characters (-)
		rowString = rowString.padStart(columnWidth, BLANK_NOTE_CHAR);

		// Apply end-padding if required
		if (requiresPadding) rowString += BLANK_NOTE_CHAR;

		return rowString;
	});

	return [notationRow, ...cellRows];
};

const isColumnInSelection = (selection: ColumnSelection, columnIndex: number, sectionIndex: number) =>
	selection.start !== null &&
	selection.end !== null &&
	sectionIndex === selection.section &&
	numIsBetweenRange(columnIndex, selection.start, selection.end);

const Column = memo<Props>(({ sectionIndex, column, columnIndex }) => {
	const isSelecting = useEditorStore((state) => state.isSelecting && state.ghostSelection.section === sectionIndex);

	const selectedStatus = useEditorStore(
		useCallback(
			(state) => {
				if (isColumnInSelection(state.ghostSelection, columnIndex, sectionIndex)) {
					// make sure that the selection start < end
					const [adjustedStart, adjustedEnd] =
						state.ghostSelection.start !== null &&
						state.ghostSelection.end !== null &&
						state.ghostSelection.start <= state.ghostSelection.end
							? [state.ghostSelection.start, state.ghostSelection.end]
							: [state.ghostSelection.end, state.ghostSelection.start];

					if (columnIndex === adjustedStart && columnIndex === adjustedEnd) return 'ghost-selected-solo';
					else if (columnIndex === adjustedStart) return 'ghost-selected-start';
					else if (columnIndex === adjustedEnd) return 'ghost-selected-end';
					else return 'ghost-selected';
				}

				if (isColumnInSelection(state.currentSelection, columnIndex, sectionIndex)) {
					if (columnIndex === state.currentSelection.start && columnIndex === state.currentSelection.end)
						return 'selected-solo';
					if (columnIndex === state.currentSelection.start) return 'selected-start';
					else if (columnIndex === state.currentSelection.end) return 'selected-end';
					else return 'selected';
				}

				return '';
			},
			[columnIndex, sectionIndex]
		)
	);

	const notationPosition = useEditorStore((state) =>
		getColumnNotationPosition(columnIndex, state.tablature.sections[sectionIndex].columns)
	);

	const onMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
		e.stopPropagation();
		selectionStart(sectionIndex, columnIndex);
		document.addEventListener(
			'mouseup',
			(e) => {
				e.stopPropagation();
				selectionFinish();
			},
			{ once: true }
		);
	};

	const onMouseOver: MouseEventHandler<HTMLDivElement> = () => {
		if (isSelecting) selectionHover(sectionIndex, columnIndex);
	};

	const innerRows = useMemo(() => formatInnerRows(column, notationPosition), [column, notationPosition]);

	return (
		<div
			data-testid='column'
			data-selected-status={selectedStatus}
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

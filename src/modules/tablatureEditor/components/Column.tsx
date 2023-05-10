import { Fragment, memo, MouseEventHandler, useMemo } from 'react';

import { columnSelectionFinish } from '@modules/tablatureEditorStore/editorSlice/actions/columnSelectionFinish';
import { columnSelectionHover } from '@modules/tablatureEditorStore/editorSlice/actions/columnSelectionHover';
import { columnSelectionStart } from '@modules/tablatureEditorStore/editorSlice/actions/columnSelectionStart';
import { BLANK_NOTE_CHAR } from '@modules/tablatureEditorStore/tablatureSlice/constants';
import { useTablatureEditorStore } from '@modules/tablatureEditorStore/useTablatureEditorStore';

import styles from './Tablature.module.scss';

interface Props {
	sectionIndex: number;
	columnIndex: number;
	column: Column;
	isSelected: boolean;
	isGhostSelected: boolean;
}

const createFormattedColumnRows = (cells: Cell[]) => {
	// These are flags which will determine the type of padding the column gets
	let isSnapping = false;
	let isBlank = true;

	const maxLength = cells.reduce((prevCharLen, cell) => {
		let charLen = Math.max(cell.fret, 0).toString().length;
		if (cell.fret !== -1) isBlank = false;

		// Add modifier character lengths
		if (cell.modifier) {
			switch (cell.modifier.behavior) {
				case 'wrap':
					charLen += cell.modifier.symbolLeft.length + cell.modifier.symbolRight.length;
					break;
				case 'snap':
					isSnapping = true;
					charLen += cell.modifier.symbolRight.length;
					break;
			}
		}

		return Math.max(prevCharLen, charLen);
	}, 0);

	return cells.map((cell) => {
		let rowText = cell.fret.toString();

		// Combines fret characters with modifier characters
		if (cell.fret === -1) rowText = BLANK_NOTE_CHAR;
		else if (cell.modifier?.behavior === 'snap') rowText = cell.fret.toString() + cell.modifier.symbolRight;
		else if (cell.modifier?.behavior === 'wrap')
			rowText = cell.modifier.symbolLeft + cell.fret.toString() + cell.modifier.symbolRight;

		// Fill blank spaces with blank note characters (-)
		if (isSnapping || isBlank) return BLANK_NOTE_CHAR.repeat(maxLength - rowText.length) + rowText;
		else return BLANK_NOTE_CHAR.repeat(maxLength - rowText.length) + rowText + BLANK_NOTE_CHAR;
	});
};

const isSelectingSelector = (state: EditorSlice) => state.isSelecting;

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

	const innerRows = useMemo(() => createFormattedColumnRows(column.cells), [column]);

	return (
		<div
			data-testid='column'
			data-selected={isSelected}
			data-ghost-selected={isGhostSelected}
			className={styles.column}
			onMouseDown={onMouseDown}
			onMouseOver={onMouseOver}
		>
			{innerRows.map((row, i) => {
				return (
					<Fragment key={i}>
						{row}
						<br />
					</Fragment>
				);
			})}
		</div>
	);
});

Column.displayName = 'Column';
export default Column;

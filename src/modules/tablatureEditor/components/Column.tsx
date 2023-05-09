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

	const innerRows = useMemo(() => {
		// find the max character length of the cells in the column
		const maxLength = column.cells.reduce((prevCharLen, cell) => {
			let charLen = Math.max(cell.fret, 0).toString().length;

			// Add modifier character lengths
			if (cell.modifier) {
				switch (cell.modifier.behavior) {
					case 'wrap':
						charLen += cell.modifier.symbolLeft.length + cell.modifier.symbolRight.length;
					case 'snap':
						charLen += cell.modifier.symbolRight.length;
				}
			}

			return Math.max(prevCharLen, charLen);
		}, 0);

		return column.cells.map((cell) => {
			// Combines fret characters with modifier characters
			const getRawText = () => {
				if (cell.fret === -1) return BLANK_NOTE_CHAR.repeat(maxLength);
				if (cell.modifier?.behavior === 'snap') return cell.fret.toString() + cell.modifier.symbolRight;
				if (cell.modifier?.behavior === 'wrap')
					return cell.modifier.symbolLeft + cell.fret.toString() + cell.modifier.symbolRight;
				return cell.fret.toString();
			};

			const text = getRawText();

			// Fill blank spaces with blank note characters (-)
			return BLANK_NOTE_CHAR.repeat(maxLength - text.length) + text;
		});
	}, [column]);

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

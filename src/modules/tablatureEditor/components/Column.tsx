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

	// vertical columns built from splitting the fret characters
	const innerColumns = useMemo(() => {
		const outputArray = [];

		// find character length of largest fret in the column
		const maxLength = column.cells.reduce((acc, obj) => Math.max(acc, String(Math.max(obj.fret, 0)).length), 0);

		for (let i = 0; i < maxLength; i++) {
			const innerColumn = [];
			for (let j = 0; j < column.cells.length; j++) {
				if (column.cells[j].fret === -1) innerColumn.push(BLANK_NOTE_CHAR);
				else innerColumn.push(String(column.cells[j].fret)[i] || BLANK_NOTE_CHAR);
			}
			outputArray.push(innerColumn.join(''));
		}

		return outputArray;
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
			{innerColumns.map((subcolumn, i) => {
				return (
					<Fragment key={i}>
						{subcolumn}
						<br />
					</Fragment>
				);
			})}
		</div>
	);
});

Column.displayName = 'Column';
export default Column;

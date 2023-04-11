import { useState } from 'react';

import { selectColumns } from '@modules/editorStore/actions/selectColumns';
import { useEditorStore } from '@modules/editorStore/useEditorStore';

import Column from './Column';
import styles from './Line.module.scss';

interface Props {
	index: number;
	line: Line;
}

const Line = ({ index, line }: Props) => {
	const [selectionStart, setSelectionStart] = useState<number | null>(null);
	const selectedColumns = useEditorStore().selectedColumns;

	const onColumnMouseDown = (columnIndex: number) => setSelectionStart(columnIndex);

	const onColumnMouseUp = (columnIndex: number) => {
		if (selectionStart !== null) selectColumns(index, selectionStart, columnIndex);
		setSelectionStart(null);
	};

	return (
		<div className={styles.line}>
			{line.columns.map((column, i) => {
				const isSelected =
					index === selectedColumns.line && i >= selectedColumns.start && i <= selectedColumns.end;
				return (
					<Column
						key={i}
						index={i}
						column={column}
						isSelected={isSelected}
						onMouseUp={onColumnMouseUp}
						onMouseDown={onColumnMouseDown}
					/>
				);
			})}
		</div>
	);
};

export default Line;

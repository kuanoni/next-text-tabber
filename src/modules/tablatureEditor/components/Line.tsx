import { useEditorStore } from '@modules/editorStore/useEditorStore';

import Column from './Column';
import styles from './Line.module.scss';

interface Props {
	index: number;
	line: Line;
}

const Line = ({ index, line }: Props) => {
	const selectedColumns = useEditorStore().selectedColumns;

	return (
		<div className={styles.line}>
			{line.columns.map((column, columnIndex) => {
				const isSelected =
					index === selectedColumns.line &&
					columnIndex >= selectedColumns.start &&
					columnIndex <= selectedColumns.end;

				return (
					<Column
						key={columnIndex}
						lineIndex={index}
						columnIndex={columnIndex}
						column={column}
						isSelected={isSelected}
					/>
				);
			})}
		</div>
	);
};

export default Line;

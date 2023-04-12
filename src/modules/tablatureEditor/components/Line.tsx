import { useEditorStore } from '@modules/editorStore/useEditorStore';

import Column from './Column';
import styles from './Line.module.scss';

// checks if 'num' is between 'a' and 'b'
const between = (num: number, a: number, b: number) => {
	const min = Math.min.apply(Math, [a, b]),
		max = Math.max.apply(Math, [a, b]);
	return num >= min && num <= max;
};

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
					index === selectedColumns.line && between(columnIndex, selectedColumns.start, selectedColumns.end);

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

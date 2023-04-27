import { useTablatureEditorStore } from '@modules/tablatureEditorStore/useTablatureEditorStore';

import Column from './Column';
import styles from './Line.module.scss';

// checks if 'num' is between 'a' and 'b'
const between = (num: number, a: number, b: number) => {
	const min = Math.min.apply(Math, [a, b]),
		max = Math.max.apply(Math, [a, b]);
	return num >= min && num <= max;
};

interface Props {
	lineIndex: number;
	line: Line;
}

const Line = ({ lineIndex, line }: Props) => {
	const selectedColumns = useTablatureEditorStore((state) => state.currentSelection);
	const ghostSelectedColumns = useTablatureEditorStore((state) => state.ghostSelection);

	return (
		<div className={styles.line} data-testid='line'>
			{line.columns.map((column, columnIndex) => {
				const isSelected =
					selectedColumns.start !== null &&
					selectedColumns.end !== null &&
					lineIndex === selectedColumns.line &&
					between(columnIndex, selectedColumns.start, selectedColumns.end);

				const isGhostSelected =
					ghostSelectedColumns.start !== null &&
					ghostSelectedColumns.end !== null &&
					lineIndex === ghostSelectedColumns.line &&
					between(columnIndex, ghostSelectedColumns.start, ghostSelectedColumns.end);

				return (
					<Column
						key={columnIndex}
						column={column}
						lineIndex={lineIndex}
						columnIndex={columnIndex}
						isSelected={isSelected}
						isGhostSelected={isGhostSelected}
					/>
				);
			})}
		</div>
	);
};

export default Line;

import numIsBetweenRange from '@common/utils/numBetweenRange';
import { useTablatureEditorStore } from '@modules/tablatureEditorStore/useTablatureEditorStore';

import Column from './Column';
import styles from './Line.module.scss';

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
					numIsBetweenRange(columnIndex, selectedColumns.start, selectedColumns.end);

				const isGhostSelected =
					ghostSelectedColumns.start !== null &&
					ghostSelectedColumns.end !== null &&
					lineIndex === ghostSelectedColumns.line &&
					numIsBetweenRange(columnIndex, ghostSelectedColumns.start, ghostSelectedColumns.end);

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

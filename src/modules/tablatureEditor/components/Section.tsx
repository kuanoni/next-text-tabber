import numIsBetweenRange from '@common/utils/numBetweenRange';
import { useTablatureEditorStore } from '@modules/tablatureEditorStore/useTablatureEditorStore';

import Column from './Column';
import styles from './Tablature.module.scss';

interface Props {
	sectionIndex: number;
	section: Section;
}

const currentSelectionSelector = (state: EditorStore) => state.currentSelection;
const ghostSelectionSelector = (state: EditorStore) => state.ghostSelection;

const Section = ({ sectionIndex, section }: Props) => {
	const selectedColumns = useTablatureEditorStore(currentSelectionSelector);
	const ghostSelectedColumns = useTablatureEditorStore(ghostSelectionSelector);

	return (
		<div className={styles.section} data-testid='section'>
			{section.columns.map((column, columnIndex) => {
				const isSelected =
					selectedColumns.start !== null &&
					selectedColumns.end !== null &&
					sectionIndex === selectedColumns.section &&
					numIsBetweenRange(columnIndex, selectedColumns.start, selectedColumns.end);

				const isGhostSelected =
					ghostSelectedColumns.start !== null &&
					ghostSelectedColumns.end !== null &&
					sectionIndex === ghostSelectedColumns.section &&
					numIsBetweenRange(columnIndex, ghostSelectedColumns.start, ghostSelectedColumns.end);

				return (
					<Column
						key={columnIndex}
						column={column}
						sectionIndex={sectionIndex}
						columnIndex={columnIndex}
						isSelected={isSelected}
						isGhostSelected={isGhostSelected}
					/>
				);
			})}
		</div>
	);
};

export default Section;

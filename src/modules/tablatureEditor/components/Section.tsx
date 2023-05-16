import numIsBetweenRange from '@common/utils/numBetweenRange';
import { useTablatureEditorStore } from '@modules/editorStore/useTablatureEditorStore';

import Column from './Column';
import styles from './Tablature.module.scss';

interface Props {
	sectionIndex: number;
	section: Section;
}

const currentSelectionSelector = (state: EditorStore) => state.currentSelection;
const ghostSelectionSelector = (state: EditorStore) => state.ghostSelection;

const isColumnInSelection = (selection: ColumnSelection, columnIndex: number, sectionIndex: number) =>
	selection.start !== null &&
	selection.end !== null &&
	sectionIndex === selection.section &&
	numIsBetweenRange(columnIndex, selection.start, selection.end);

// Check adjacent columns to see if column with modifier is the start or end of the modified column group
const getColumnModifierPosition = (columnIndex: number, columns: Column[]): ColumnModifierPosition => {
	const column = columns[columnIndex];
	if (!column.modifier) return undefined;

	const prevColumn = columns[columnIndex - 1];
	const nextColumn = columns[columnIndex + 1];

	if (prevColumn?.modifier !== column.modifier && nextColumn?.modifier !== column.modifier) return 'solo';

	if (prevColumn?.modifier !== column.modifier) return 'start';
	else if (nextColumn?.modifier !== column.modifier) return 'end';
	else return 'middle';
};

const Section = ({ sectionIndex, section }: Props) => {
	const currentSelection = useTablatureEditorStore(currentSelectionSelector);
	const ghostSelection = useTablatureEditorStore(ghostSelectionSelector);

	return (
		<div className={styles.section} data-testid='section'>
			{section.columns.map((column, columnIndex) => {
				const isSelected = isColumnInSelection(currentSelection, columnIndex, sectionIndex);
				const isGhostSelected = isColumnInSelection(ghostSelection, columnIndex, sectionIndex);
				const modifierPosition = getColumnModifierPosition(columnIndex, section.columns);

				return (
					<Column
						key={columnIndex}
						column={column}
						sectionIndex={sectionIndex}
						columnIndex={columnIndex}
						isSelected={isSelected}
						isGhostSelected={isGhostSelected}
						modifierPosition={modifierPosition}
					/>
				);
			})}
		</div>
	);
};

export default Section;

import { SelectionError, SelectionErrorCode, SelectionErrorCulprit } from '../errors/SelectionError';

export const validateSelection = (selection: ColumnSelection, tablature: Tablature): NonBlankColumnSelection => {
	const { section, start, end } = selection;

	if (section === null && start === null && end === null)
		throw new SelectionError(SelectionErrorCode.SELECTION_BLANK, SelectionErrorCulprit.ALL);

	if (section === null) throw new SelectionError(SelectionErrorCode.SELECTION_INVALID, SelectionErrorCulprit.SECTION);

	if (start === null) throw new SelectionError(SelectionErrorCode.SELECTION_INVALID, SelectionErrorCulprit.START);

	if (end === null) throw new SelectionError(SelectionErrorCode.SELECTION_INVALID, SelectionErrorCulprit.END);

	if (section < 0 || section > tablature.sections.length - 1)
		throw new SelectionError(
			SelectionErrorCode.SELECTION_OUT_OF_BOUNDS,
			SelectionErrorCulprit.SECTION,
			section,
			tablature.sections.length - 1
		);

	const tablatureSection = tablature.sections[section];

	if (start < 0 || start > tablatureSection.columns.length - 1)
		throw new SelectionError(
			SelectionErrorCode.SELECTION_OUT_OF_BOUNDS,
			SelectionErrorCulprit.START,
			start,
			tablatureSection.columns.length - 1
		);

	if (end < 0 || end > tablatureSection.columns.length - 1)
		throw new SelectionError(
			SelectionErrorCode.SELECTION_OUT_OF_BOUNDS,
			SelectionErrorCulprit.END,
			end,
			tablatureSection.columns.length - 1
		);

	return selection;
};

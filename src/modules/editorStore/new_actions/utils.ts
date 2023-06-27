export const validateSelection = (selection: ColumnSelection, tablature: Tablature): NonBlankColumnSelection => {
	const { section: sectionIndex, start, end } = selection;

	if (sectionIndex === null) throw new Error(`Selected section is null.`);
	if (start === null) throw new Error(`Selected start is null.`);
	if (end === null) throw new Error(`Selected end is null.`);

	if (sectionIndex < 0 || sectionIndex > tablature.sections.length - 1)
		throw new Error(
			`Selected section index ${sectionIndex} is out of bounds. Max ${tablature.sections.length - 1}`
		);

	const section = tablature.sections[sectionIndex];

	if (!section) throw new Error(`Selected section at index ${sectionIndex} is non-existant: ${section}`);

	if (start < 0 || start > section.columns.length - 1)
		throw new Error(`Selected start index ${start} is out of bounds [0, ${section.columns.length - 1}]`);

	if (end < 0 || end > section.columns.length - 1)
		throw new Error(`Selected end index ${end} is out of bounds [0, ${section.columns.length - 1}]`);

	return selection;
};

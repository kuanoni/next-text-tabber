export const validateSelection = (selection: ColumnSelection, tablature: Tablature): NonBlankColumnSelection => {
	const { section, start, end } = selection;

	if (section === null && start === null && end === null) throw new Error('Selection is blank.');

	if (section === null) throw new Error(`Selected section is null.`);
	if (start === null) throw new Error(`Selected start is null.`);
	if (end === null) throw new Error(`Selected end is null.`);

	if (section < 0 || section > tablature.sections.length - 1)
		throw new Error(`Selected section index ${section} is out of bounds. Max ${tablature.sections.length - 1}`);

	const tablatureSection = tablature.sections[section];

	if (!tablatureSection) throw new Error(`Selected section at index ${section} is non-existant: ${section}`);

	if (start < 0 || start > tablatureSection.columns.length - 1)
		throw new Error(`Selected start index ${start} is out of bounds [0, ${tablatureSection.columns.length - 1}]`);

	if (end < 0 || end > tablatureSection.columns.length - 1)
		throw new Error(`Selected end index ${end} is out of bounds [0, ${tablatureSection.columns.length - 1}]`);

	return selection;
};

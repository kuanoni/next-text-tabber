export const insertColumns = (
	state: TablatureEditorStore,
	sectionIndex: number,
	insertIndex: number,
	columnsToInsert: Column[]
) => {
	const preInserted = state.tablature.sections[sectionIndex].columns.slice(0, insertIndex + 1);
	const postInserted = state.tablature.sections[sectionIndex].columns.slice(insertIndex + 1);

	state.tablature.sections[sectionIndex].columns = [...preInserted, ...columnsToInsert, ...postInserted];
};

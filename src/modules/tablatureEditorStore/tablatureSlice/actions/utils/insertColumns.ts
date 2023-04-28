export const insertColumns = (
	state: TablatureEditorStore,
	lineIndex: number,
	insertIndex: number,
	columnsToInsert: Column[]
) => {
	const preInserted = state.tablature.lines[lineIndex].columns.slice(0, insertIndex + 1);
	const postInserted = state.tablature.lines[lineIndex].columns.slice(insertIndex + 1);

	state.tablature.lines[lineIndex].columns = [...preInserted, ...columnsToInsert, ...postInserted];
};

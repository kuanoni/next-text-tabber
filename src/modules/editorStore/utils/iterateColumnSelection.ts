import { useTablatureEditorStore } from '@modules/tablatureEditorStore/useTablatureEditorStore';

type DeepNonNullable<T> = {
	[P in keyof T]-?: NonNullable<T[P]>;
};

export const iterateColumnSelection = (cb: (i: number, currentSelection: DeepNonNullable<ColumnSelection>) => void) => {
	const currentSelection = useTablatureEditorStore.getState().currentSelection;
	const { section, start, end } = currentSelection;

	if (section === null || start === null || end === null)
		throw new Error(
			`Attempted to iterate over a selection with a null value, section=${section} start=${start}, end=${end}`
		);

	for (let i = start; i < end + 1; i++) cb(i, currentSelection as DeepNonNullable<ColumnSelection>);
};

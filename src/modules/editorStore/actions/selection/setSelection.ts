import { useEditorStore } from '../../useEditorStore';
import { validateSelection } from '../utils';

export const setSelection = (section: number, start: number, end: number) =>
	useEditorStore.setState((state) => {
		const validSelection = validateSelection({ section, start, end }, state.tablature);

		state.currentSelection = validSelection;
	});

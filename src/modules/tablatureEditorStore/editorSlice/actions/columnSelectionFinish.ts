import { useTablatureEditorStore } from '../../useTablatureEditorStore';

export const columnSelectionFinish = () => {
	useTablatureEditorStore.setState((state) => {
		state.isSelecting = false;
	});
};

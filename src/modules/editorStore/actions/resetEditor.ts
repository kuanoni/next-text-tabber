import { initialState } from '../constants';
import { editorStoreBase } from '../useEditorStore';

export const resetEditor = () => editorStoreBase.setState(() => initialState);

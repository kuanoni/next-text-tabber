import { resetColumnSelection } from '@modules/editorStore/actions/resetColumnSelection';
import { useTablatureEditorStore } from '@modules/editorStore/useTablatureEditorStore';

import Section from './Section';
import styles from './Tablature.module.scss';

const tablatureSelector = (state: EditorStore) => state.tablature;

const Tablature = () => {
	const tablature = useTablatureEditorStore(tablatureSelector);

	return (
		<div
			data-testid='tablature'
			className={styles.tablature}
			// remove selection on mouse down
			onMouseDown={() => resetColumnSelection()}
		>
			{tablature.sections.map((section, i) => (
				<Section key={i} sectionIndex={i} section={section} />
			))}
		</div>
	);
};

export default Tablature;

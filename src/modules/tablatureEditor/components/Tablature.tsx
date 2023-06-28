import { resetSelection } from '@modules/editorStore/new_actions';
import { useEditorStore } from '@modules/editorStore/useEditorStore';

import Section from './Section';
import styles from './Tablature.module.scss';

const tablatureSelector = (state: EditorStore) => state.tablature;

const Tablature = () => {
	const tablature = useEditorStore(tablatureSelector);

	return (
		<div
			data-testid='tablature'
			className={styles.tablature}
			// remove selection on mouse down
			onMouseDown={() => resetSelection()}
		>
			{tablature.sections.map((section, i) => (
				<Section key={i} sectionIndex={i} section={section} />
			))}
		</div>
	);
};

export default Tablature;

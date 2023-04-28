import { resetColumnSelection } from '@modules/tablatureEditorStore/editorSlice/actions/resetColumnSelection';
import { useTablatureEditorStore } from '@modules/tablatureEditorStore/useTablatureEditorStore';

import Section from './Section';
import styles from './Tablature.module.scss';

const Tablature = () => {
	const tablature = useTablatureEditorStore((state) => state.tablature);

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

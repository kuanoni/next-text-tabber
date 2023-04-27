import { resetColumnSelection } from '@modules/tablatureEditorStore/editorSlice/actions/resetColumnSelection';
import { useTablatureEditorStore } from '@modules/tablatureEditorStore/useTablatureEditorStore';

import Line from './Line';
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
			{tablature.lines.map((line, i) => (
				<Line key={i} lineIndex={i} line={line} />
			))}
		</div>
	);
};

export default Tablature;

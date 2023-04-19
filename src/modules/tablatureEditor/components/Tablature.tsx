import { setColumnSelection } from '@modules/tablatureEditorStore/editorSlice/actions/setColumnSelection';
import { useTablatureEditorStore } from '@modules/tablatureEditorStore/useTablatureEditorStore';

import Line from './Line';
import styles from './Tablature.module.scss';

const Tablature = () => {
	const tablature = useTablatureEditorStore((state) => state.tablature);

	return (
		<div
			data-testid='tablature'
			className={styles.tablature}
			onMouseDown={() => {
				// remove selection on mouse down
				setColumnSelection(-1, -1, -1);
			}}
		>
			{tablature.lines.map((line, i) => (
				<Line key={i} lineIndex={i} line={line} />
			))}
		</div>
	);
};

export default Tablature;

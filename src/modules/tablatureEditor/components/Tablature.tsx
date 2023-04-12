import { setColumnSelection } from '@modules/editorStore/actions/setColumnSelection';
import { useTablatureStore } from '@modules/tablatureStore/useTablatureStore';

import Line from './Line';
import styles from './Tablature.module.scss';

const Tablature = () => {
	const tablature = useTablatureStore().tablature;

	return (
		<div
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

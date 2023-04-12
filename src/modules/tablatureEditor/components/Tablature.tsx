import { setColumnSelection } from '@modules/editorStore/actions/setColumnSelection';

import Line from './Line';
import styles from './Tablature.module.scss';

interface Props {
	tablature: Tablature;
}

const Tablature = ({ tablature }: Props) => {
	return (
		<div
			className={styles.tablature}
			onMouseDown={() => {
				// remove selection on mouse down
				setColumnSelection(-1, -1, -1);
			}}
		>
			{tablature.lines.map((line, i) => (
				<Line key={i} index={i} line={line} />
			))}
		</div>
	);
};

export default Tablature;

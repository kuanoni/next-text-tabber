import { changeInstrument } from '@modules/tablatureStore/actions/changeInstrument';
import { clearTablature } from '@modules/tablatureStore/actions/clearTablature';
import { insertBlankColumn } from '@modules/tablatureStore/actions/insertBlankColumn';
import { pushBlankColumn } from '@modules/tablatureStore/actions/pushBlankColumn';
import { pushBlankLine } from '@modules/tablatureStore/actions/pushBlankLine';
import { electricBass, electricGuitar } from '@modules/tablatureStore/constants';

import styles from './TablatureControls.module.scss';

const TablatureControls = () => {
	return (
		<div className={styles['tablature-controls']}>
			<button onClick={() => pushBlankColumn(0)}>pushBlankColumn</button>
			<button onClick={() => insertBlankColumn(0, 0)}>insertBlankColumn</button>
			<button onClick={() => pushBlankLine()}>pushBlankLine</button>
			<button onClick={() => clearTablature()}>clearTablature</button>
			<button onClick={() => clearTablature()}>clearTablature</button>
			<button onClick={() => changeInstrument(electricGuitar)}>changeInstrument electricGuitar</button>
			<button onClick={() => changeInstrument(electricBass)}>changeInstrument electricBass</button>
		</div>
	);
};

export default TablatureControls;

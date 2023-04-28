import { changeInstrument } from '@modules/tablatureEditorStore/tablatureSlice/actions/changeInstrument';
import { clearSelectedColumns } from '@modules/tablatureEditorStore/tablatureSlice/actions/clearSelectedColumns';
import { insertColumnsAtSelection } from '@modules/tablatureEditorStore/tablatureSlice/actions/insertColumnsAtSelection';
import { pushBlankColumn } from '@modules/tablatureEditorStore/tablatureSlice/actions/pushBlankColumn';
import { pushBlankLine } from '@modules/tablatureEditorStore/tablatureSlice/actions/pushBlankLine';
import { resetTablature } from '@modules/tablatureEditorStore/tablatureSlice/actions/resetTablature';
import { electricBass, electricGuitar } from '@modules/tablatureEditorStore/tablatureSlice/constants';

import styles from './TablatureControls.module.scss';

const TablatureControls = () => {
	return (
		<div className={styles['tablature-controls']}>
			<button data-testid='pushBlankColumn' onClick={() => pushBlankColumn(0)}>
				pushBlankColumn
			</button>
			<button data-testid='insertColumnAtSelection' onClick={() => insertColumnsAtSelection()}>
				insertColumnAtSelection
			</button>
			<button data-testid='clearSelectedColumns' onClick={() => clearSelectedColumns()}>
				clearSelectedColumns
			</button>
			<button data-testid='pushBlankLine' onClick={() => pushBlankLine()}>
				pushBlankLine
			</button>
			<button data-testid='resetTablature' onClick={() => resetTablature()}>
				resetTablature
			</button>
			<button data-testid='changeInstrument guitar' onClick={() => changeInstrument(electricGuitar)}>
				changeInstrument electricGuitar
			</button>
			<button data-testid='changeInstrument bass' onClick={() => changeInstrument(electricBass)}>
				changeInstrument electricBass
			</button>
		</div>
	);
};

export default TablatureControls;

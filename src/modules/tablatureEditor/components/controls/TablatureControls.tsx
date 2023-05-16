import { clearSelectedColumns } from '@modules/editorStore/actions/clearSelectedColumns';
import { copySelectedColumns } from '@modules/editorStore/actions/clipboard/copySelectedColumns';
import { pasteClipboard } from '@modules/editorStore/actions/clipboard/pasteClipboard';
import { duplicateSelectedColumns } from '@modules/editorStore/actions/duplicateSelectedColumns';
import { insertColumnsAtSelection } from '@modules/editorStore/actions/insertColumnsAtSelection';
import { pushBlankColumn } from '@modules/editorStore/actions/pushBlankColumn';
import { pushBlankSection } from '@modules/editorStore/actions/pushBlankSection';
import { resetTablature } from '@modules/editorStore/actions/resetTablature';
import { setInstrument } from '@modules/editorStore/actions/setInstrument';
import { setSelectedColumnsCellModifiers } from '@modules/editorStore/actions/setSelectedColumnsCellModifiers';
import { setSelectedColumnsColumnModifiers } from '@modules/editorStore/actions/setSelectedColumnsColumnsModifiers';
import { CELL_MODIFIERS, COLUMN_MODIFIERS, electricBass, electricGuitar } from '@modules/editorStore/constants';
import { useTablatureHistoryStore } from '@modules/editorStore/useTablatureHistoryStore';

import styles from './TablatureControls.module.scss';

const TablatureControls = () => {
	const { undo, redo } = useTablatureHistoryStore((state) => state);
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
			<button data-testid='duplicateSelectedColumns' onClick={() => duplicateSelectedColumns()}>
				duplicateSelectedColumns
			</button>
			<button data-testid='copySelectedColumns' onClick={() => copySelectedColumns()}>
				copySelectedColumns
			</button>
			<button data-testid='pasteClipboard' onClick={() => pasteClipboard()}>
				pasteClipboard
			</button>
			<button data-testid='pushBlankSection' onClick={() => pushBlankSection()}>
				pushBlankSection
			</button>
			<button data-testid='resetTablature' onClick={() => resetTablature()}>
				resetTablature
			</button>
			<button data-testid='setInstrument guitar' onClick={() => setInstrument(electricGuitar)}>
				setInstrument electricGuitar
			</button>
			<button data-testid='setInstrument bass' onClick={() => setInstrument(electricBass)}>
				setInstrument electricBass
			</button>
			<button data-testid='undo' onClick={() => undo()}>
				undo
			</button>
			<button data-testid='redo' onClick={() => redo()}>
				redo
			</button>
			<div className={styles['button-group']}>
				<button
					data-testid='set-cell-modifier Hammer-on'
					onClick={() => setSelectedColumnsCellModifiers(CELL_MODIFIERS['Hammer-on'])}
				>
					h
				</button>
				<button
					data-testid='set-cell-modifier Pull-off'
					onClick={() => setSelectedColumnsCellModifiers(CELL_MODIFIERS['Pull-off'])}
				>
					p
				</button>
				<button
					data-testid='set-cell-modifier Bend'
					onClick={() => setSelectedColumnsCellModifiers(CELL_MODIFIERS['Bend'])}
				>
					b
				</button>
				<button
					data-testid='set-cell-modifier Slide up'
					onClick={() => setSelectedColumnsCellModifiers(CELL_MODIFIERS['Slide up'])}
				>
					/
				</button>
				<button
					data-testid='set-cell-modifier Slide down'
					onClick={() => setSelectedColumnsCellModifiers(CELL_MODIFIERS['Slide down'])}
				>
					\
				</button>
				<button
					data-testid='set-cell-modifier Ghost note'
					onClick={() => setSelectedColumnsCellModifiers(CELL_MODIFIERS['Ghost note'])}
				>
					( )
				</button>
				<button
					data-testid='set-cell-modifier Natural harmonic'
					onClick={() => setSelectedColumnsCellModifiers(CELL_MODIFIERS['Natural harmonic'])}
				>
					{'< >'}
				</button>
			</div>
			<div className={styles['button-group']}>
				<button
					data-testid='set-column-modifier Palm mute'
					onClick={() => setSelectedColumnsColumnModifiers(COLUMN_MODIFIERS['Palm mute'])}
				>
					PM
				</button>
				<button
					data-testid='set-column-modifier Vibrato'
					onClick={() => setSelectedColumnsColumnModifiers(COLUMN_MODIFIERS['Vibrato'])}
				>
					~
				</button>
			</div>
		</div>
	);
};

export default TablatureControls;

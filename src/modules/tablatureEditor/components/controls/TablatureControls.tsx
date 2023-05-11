import { copySelectedColumns } from '@modules/tablatureEditorStore/editorSlice/actions/copySelectedColumns';
import { insertClipboard } from '@modules/tablatureEditorStore/editorSlice/actions/insertClipboard';
import { pasteClipboard } from '@modules/tablatureEditorStore/editorSlice/actions/pasteClipboard';
import { changeInstrument } from '@modules/tablatureEditorStore/tablatureSlice/actions/changeInstrument';
import { clearSelectedColumns } from '@modules/tablatureEditorStore/tablatureSlice/actions/clearSelectedColumns';
import { duplicateSelectedColumns } from '@modules/tablatureEditorStore/tablatureSlice/actions/duplicateSelectedColumns';
import { insertColumnsAtSelection } from '@modules/tablatureEditorStore/tablatureSlice/actions/insertColumnsAtSelection';
import { pushBlankColumn } from '@modules/tablatureEditorStore/tablatureSlice/actions/pushBlankColumn';
import { pushBlankSection } from '@modules/tablatureEditorStore/tablatureSlice/actions/pushBlankSection';
import { resetTablature } from '@modules/tablatureEditorStore/tablatureSlice/actions/resetTablature';
import { setSelectedColumnsCellModifiers } from '@modules/tablatureEditorStore/tablatureSlice/actions/setSelectedColumnsCellModifiers';
import { CELL_MODIFIERS, electricBass, electricGuitar } from '@modules/tablatureEditorStore/tablatureSlice/constants';
import { useTablatureHistoryStore } from '@modules/tablatureEditorStore/useTablatureHistoryStore';

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
			<button data-testid='insertClipboard' onClick={() => insertClipboard()}>
				insertClipboard
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
			<button data-testid='changeInstrument guitar' onClick={() => changeInstrument(electricGuitar)}>
				changeInstrument electricGuitar
			</button>
			<button data-testid='changeInstrument bass' onClick={() => changeInstrument(electricBass)}>
				changeInstrument electricBass
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
		</div>
	);
};

export default TablatureControls;

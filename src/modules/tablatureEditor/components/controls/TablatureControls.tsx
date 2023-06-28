import {
	clearColumns,
	copyColumns,
	deleteColumns,
	pasteClipboard,
	resetTablature,
	setColumnsNotation,
	setFretsNotation,
	setInstrument,
} from '@modules/editorStore/actions';
import { CELL_NOTATIONS, COLUMN_NOTATIONS, electricBass, electricGuitar } from '@modules/editorStore/constants';
import { useEditorHistoryStore } from '@modules/editorStore/useEditorHistoryStore';

import styles from './TablatureControls.module.scss';

const TablatureControls = () => {
	const { undo, redo } = useEditorHistoryStore((state) => state);
	return (
		<div className={styles['tablature-controls']}>
			<button data-testid='clearSelectedColumns' onClick={() => clearColumns()}>
				clearSelectedColumns
			</button>
			<button data-testid='deleteSelectedColumns' onClick={() => deleteColumns()}>
				deleteSelectedColumns
			</button>
			<button data-testid='copySelectedColumns' onClick={() => copyColumns()}>
				copySelectedColumns
			</button>
			<button data-testid='pasteClipboard' onClick={() => pasteClipboard()}>
				pasteClipboard
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
					data-testid='set-cell-notation Hammer-on'
					onClick={() => setFretsNotation(CELL_NOTATIONS['Hammer-on'])}
				>
					h
				</button>
				<button
					data-testid='set-cell-notation Pull-off'
					onClick={() => setFretsNotation(CELL_NOTATIONS['Pull-off'])}
				>
					p
				</button>
				<button data-testid='set-cell-notation Bend' onClick={() => setFretsNotation(CELL_NOTATIONS['Bend'])}>
					b
				</button>
				<button
					data-testid='set-cell-notation Slide up'
					onClick={() => setFretsNotation(CELL_NOTATIONS['Slide up'])}
				>
					/
				</button>
				<button
					data-testid='set-cell-notation Slide down'
					onClick={() => setFretsNotation(CELL_NOTATIONS['Slide down'])}
				>
					\
				</button>
				<button
					data-testid='set-cell-notation Ghost note'
					onClick={() => setFretsNotation(CELL_NOTATIONS['Ghost note'])}
				>
					( )
				</button>
				<button
					data-testid='set-cell-notation Natural harmonic'
					onClick={() => setFretsNotation(CELL_NOTATIONS['Natural harmonic'])}
				>
					{'< >'}
				</button>
			</div>
			<div className={styles['button-group']}>
				<button
					data-testid='set-column-notation Palm mute'
					onClick={() => setColumnsNotation(COLUMN_NOTATIONS['Palm mute'])}
				>
					PM
				</button>
				<button
					data-testid='set-column-notation Vibrato'
					onClick={() => setColumnsNotation(COLUMN_NOTATIONS['Vibrato'])}
				>
					~
				</button>
			</div>
			<button data-testid='clearSelectedColumnsNotation' onClick={() => setColumnsNotation(null)}>
				clearSelectedColumnsNotation
			</button>
		</div>
	);
};

export default TablatureControls;

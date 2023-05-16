import { Instrument } from '@modules/editorStore/Instrument';

export const BLANK_NOTE_CHAR = '-';
export const BLANK_SELECTION: ColumnSelection = { section: null, start: null, end: null };

export const CELL_MODIFIERS: { [i: string]: CellModifier } = {
	'Ghost note': { behavior: 'wrap', symbolLeft: '(', symbolRight: ')' },
	'Natural harmonic': { behavior: 'wrap', symbolLeft: '<', symbolRight: '>' },
	'Hammer-on': { behavior: 'snap', symbolRight: 'h' },
	'Pull-off': { behavior: 'snap', symbolRight: 'p' },
	Bend: { behavior: 'snap', symbolRight: 'b' },
	'Slide up': { behavior: 'snap', symbolRight: '/' },
	'Slide down': { behavior: 'snap', symbolRight: '\\' },
};

export const COLUMN_MODIFIERS: { [i: string]: ColumnModifier } = {
	'Palm mute': { start: 'PM', end: '|', filler: '-' },
	Vibrato: { start: 'V', filler: '~' },
};

const SIX_STRING_TUNINGS = {
	'Drop D': [26, 33, 38, 43, 47, 52],
};

export const electricGuitar = new Instrument(
	'Electric Guitar',
	6,
	24,
	'E Standard',
	[28, 33, 38, 43, 47, 52],
	SIX_STRING_TUNINGS
);
export const electricBass = new Instrument('Electric Bass', 4, 24, 'E Standard', [16, 21, 26, 31], {
	'E Standard': [16, 21, 26, 31],
});

export const editorInitialState: EditorStore = {
	...electricGuitar.createInitialState(),
	isSelecting: false,
	ghostSelection: BLANK_SELECTION,
	currentSelection: BLANK_SELECTION,
	clipboard: [],
};

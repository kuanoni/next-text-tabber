import { Instrument } from '@common/Instrument';

export const BLANK_NOTE_CHAR = '-';

export const NOTE_MODIFIERS: { [i: string]: NoteModifier } = {
	Ghost: { behavior: 'wrap', symbolLeft: '(', symbolRight: ')' },
	'Hammer on': { behavior: 'snap', symbolRight: 'h' },
};

export const COLUMN_MODIFIERS: { [i: string]: ColumnModifier } = {
	'Palm mute': { start: 'PM', end: '-|', filler: '-' },
	Vibrato: { filler: '~' },
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

export const tablatureInitialState = electricGuitar.createInitialState();

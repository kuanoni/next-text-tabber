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

export const electricGuitar = new Instrument('Electric Guitar', 6, 24, [], [[]]);
export const electricBass = new Instrument('Electric Bass', 4, 24, [], [[]]);

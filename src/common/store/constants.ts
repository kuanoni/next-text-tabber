export const BLANK_NOTE_CHAR = '-';
export const BLANK_CELL: Cell = { modifier: null, fret: -1 };
// TODO: replace '6' with some dynamic variable to represent instrument strings
export const BLANK_COLUMN: Column = { modifier: null, cells: new Array(6).fill(BLANK_CELL) };
export const BLANK_TABLATURE = [BLANK_COLUMN];

export const NOTE_MODIFIERS: { [i: string]: NoteModifier } = {
	Ghost: { behavior: 'wrap', symbolLeft: '(', symbolRight: ')' },
	'Hammer on': { behavior: 'snap', symbolRight: 'h' },
};

export const COLUMN_MODIFIERS: { [i: string]: ColumnModifier } = {
	'Palm mute': { start: 'PM', end: '-|', filler: '-' },
	Vibrato: { filler: '~' },
};

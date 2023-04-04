export const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export const OCTAVE_NOTES = (() => {
	const notes: string[] = [];
	for (let i = 0; i < 10; i++) {
		NOTES.forEach((note) => {
			notes.push(note + i);
		});
	}
	return notes;
})();

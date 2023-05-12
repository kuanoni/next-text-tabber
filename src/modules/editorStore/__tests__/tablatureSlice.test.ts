import numIsBetweenRange from '@common/utils/numBetweenRange';
import { describe, expect, jest } from '@jest/globals';
import { act, cleanup, renderHook } from '@testing-library/react';

import { changeTuning } from '../actions/changeTuning';
import { clearSelectedColumns } from '../actions/clearSelectedColumns';
import { setColumnSelection } from '../actions/columnSelection/setColumnSelection';
import { duplicateSelectedColumns } from '../actions/duplicateSelectedColumns';
import { insertColumnsAtSelection } from '../actions/insertColumnsAtSelection';
import { pushBlankSection } from '../actions/pushBlankSection';
import { resetStore } from '../actions/resetStore';
import { resetTablature } from '../actions/resetTablature';
import { setInstrument } from '../actions/setInstrument';
import { setSelectedColumnsCellModifiers } from '../actions/setSelectedColumnsCellModifiers';
import { setSelectedColumnsFret } from '../actions/setSelectedColumnsFret';
import { CELL_MODIFIERS, electricBass } from '../constants';
import { useTablatureEditorStore } from '../useTablatureEditorStore';

const createLtrSelection = () => ({
	section: 0,
	start: 4,
	end: 7,
});

const createRtlSelection = () => ({
	section: 0,
	start: 6,
	end: 3,
});

describe('Tablature slice actions', () => {
	afterEach(() => {
		jest.resetAllMocks();
		cleanup();
		resetStore();
	});

	it('[resetTablature] set the tablature to its default state.', () => {
		const { result } = renderHook(() => useTablatureEditorStore((state) => state));

		const blankTablature = result.current.instrument.BLANK_TABLATURE;

		act(() => {
			resetTablature();
		});

		expect(result.current.tablature).toEqual(blankTablature);
	});

	it("[setInstrument] sets the tablature, instrument, and tuning to the instrument's defaults", () => {
		const { result } = renderHook(() => useTablatureEditorStore((state) => state));

		const instrumentInitialState = electricBass.createInitialState();

		act(() => {
			setInstrument(electricBass);
		});

		for (const key of Object.keys(instrumentInitialState))
			expect(result.current[key as keyof InstrumentState]).toEqual(
				instrumentInitialState[key as keyof InstrumentState]
			);
	});

	describe('[changeTuning]', () => {
		it('sets tuning to passed array.', () => {
			const { result } = renderHook(() => useTablatureEditorStore((state) => state));

			const newTuning: number[] = [27, 32, 45, 99, 0, 11];

			act(() => {
				changeTuning(newTuning);
			});

			expect(result.current.tuning).toEqual(newTuning);
		});

		it('throws an error when passed an array of invalid length.', () => {
			const changeTuningInvalidLength = () => changeTuning([27]);

			expect(changeTuningInvalidLength).toThrow('invalid length');
		});
	});

	it('[pushBlankSection] append a blank section to the tablature.', () => {
		const { result } = renderHook(() => useTablatureEditorStore((state) => state));

		const currentTablature = result.current.tablature;
		const blankSection = result.current.instrument.BLANK_SECTION;
		const expected: Tablature = { sections: [...currentTablature.sections, blankSection] };

		act(() => {
			pushBlankSection();
		});

		expect(result.current.tablature).toEqual(expected);
	});

	it('[clearSelectedColumns] sets selected columns blank.', () => {
		const { result } = renderHook(() => useTablatureEditorStore((state) => state));

		const { section, start, end } = createLtrSelection();
		const stringNumber = 3;
		const fretNumber = 5;

		act(() => {
			setColumnSelection(section, start, end);
			setSelectedColumnsFret(stringNumber, fretNumber);
			clearSelectedColumns();
		});

		result.current.tablature.sections[section].columns.forEach((column, i) => {
			if (i >= end && i <= start) expect(column).toEqual(result.current.instrument.BLANK_COLUMN);
		});
	});

	it('[insertColumnsAtSelection] insert a blank column after selection.', () => {
		const { result } = renderHook(() => useTablatureEditorStore((state) => state));

		const currentTablature = result.current.tablature;
		const blankColumn = result.current.instrument.BLANK_COLUMN;

		act(() => {
			setColumnSelection(0, 0, 0);
			insertColumnsAtSelection();
		});

		expect(result.current.tablature).toEqual({
			sections: [{ columns: [blankColumn, ...currentTablature.sections[0].columns] }],
		});
	});

	describe('[setSelectedColumnFrets] sets specific frets of selected columns.', () => {
		const stringNumber = 3;
		const fretNumber = 5;

		it('Left-to-right selection.', () => {
			const { result } = renderHook(() => useTablatureEditorStore((state) => state));

			const { section, start, end } = createLtrSelection();

			act(() => {
				setColumnSelection(section, start, end);
				setSelectedColumnsFret(stringNumber, fretNumber);
			});

			result.current.tablature.sections[section].columns.forEach((column, i) => {
				if (numIsBetweenRange(i, start, end)) expect(column.cells[stringNumber].fret).toEqual(fretNumber);
				else expect(column).toEqual(result.current.instrument.BLANK_COLUMN);
			});
		});

		it('Right-to-left selection.', () => {
			const { result } = renderHook(() => useTablatureEditorStore((state) => state));

			const { section, start, end } = createRtlSelection();

			act(() => {
				setColumnSelection(section, start, end);
				setSelectedColumnsFret(stringNumber, fretNumber);
			});

			result.current.tablature.sections[section].columns.forEach((column, i) => {
				if (numIsBetweenRange(i, start, end)) expect(column.cells[stringNumber].fret).toEqual(fretNumber);
				else expect(column).toEqual(result.current.instrument.BLANK_COLUMN);
			});
		});
	});

	it('[duplicateSelectedColumns] duplicates selected columns and inserts them after the selection end.', () => {
		const { result } = renderHook(() => useTablatureEditorStore((state) => state));

		const { section, start, end } = createLtrSelection();
		const selectionSize = end - start + 1;
		const stringNumber = 3;
		const fretNumber = 5;

		act(() => {
			setColumnSelection(section, start, end);
			setSelectedColumnsFret(stringNumber, fretNumber);
			duplicateSelectedColumns();
		});

		result.current.tablature.sections[section].columns.forEach((column, i) => {
			if (numIsBetweenRange(i, start, end + selectionSize))
				expect(column.cells[stringNumber].fret).toEqual(fretNumber);
			else expect(column).toEqual(result.current.instrument.BLANK_COLUMN);
		});
	});

	it('[insertColumnsAtSelection] inserts columns after selection end.', () => {
		const { result } = renderHook(() => useTablatureEditorStore((state) => state));

		const column: Column = result.current.instrument.createColumnFromText('--2---');

		act(() => {
			setColumnSelection(0, 0, 0);
			insertColumnsAtSelection([column]);
		});

		expect(result.current.tablature.sections[0].columns[1]).toEqual(column);
	});

	it('[setSelectedColumnsCellModifiers] sets modifiers of cells with non-blank frets in selected columns.', () => {
		const { result } = renderHook(() => useTablatureEditorStore((state) => state));

		const modifier = CELL_MODIFIERS['Hammer-on'];
		const cellIndex = 3;

		act(() => {
			setColumnSelection(0, 0, 0);
			setSelectedColumnsFret(cellIndex, 5);
			setSelectedColumnsCellModifiers(modifier);
		});

		expect(result.current.tablature.sections[0].columns[0].cells[cellIndex].modifier).toEqual(modifier);
		expect(result.current.tablature.sections[0].columns[0].cells[cellIndex + 1].modifier).toEqual(null);
	});
});

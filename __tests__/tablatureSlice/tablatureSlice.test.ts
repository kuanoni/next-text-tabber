import numIsBetweenRange from '@common/utils/numBetweenRange';
import { describe, expect, jest } from '@jest/globals';
import { resetEditor } from '@modules/tablatureEditorStore/editorSlice/actions/resetEditor';
import { setColumnSelection } from '@modules/tablatureEditorStore/editorSlice/actions/setColumnSelection';
import { changeInstrument } from '@modules/tablatureEditorStore/tablatureSlice/actions/changeInstrument';
import { changeTuning } from '@modules/tablatureEditorStore/tablatureSlice/actions/changeTuning';
import { clearSelectedColumns } from '@modules/tablatureEditorStore/tablatureSlice/actions/clearSelectedColumns';
import { insertColumnsAtSelection } from '@modules/tablatureEditorStore/tablatureSlice/actions/insertColumnsAtSelection';
import { pushBlankColumn } from '@modules/tablatureEditorStore/tablatureSlice/actions/pushBlankColumn';
import { pushBlankSection } from '@modules/tablatureEditorStore/tablatureSlice/actions/pushBlankSection';
import { resetTablature } from '@modules/tablatureEditorStore/tablatureSlice/actions/resetTablature';
import { setSelectedColumnsCellModifiers } from '@modules/tablatureEditorStore/tablatureSlice/actions/setSelectedColumnsCellModifiers';
import { setSelectedColumnsFret } from '@modules/tablatureEditorStore/tablatureSlice/actions/setSelectedColumnsFret';
import { CELL_MODIFIERS, electricBass, electricGuitar } from '@modules/tablatureEditorStore/tablatureSlice/constants';
import { useTablatureEditorStore } from '@modules/tablatureEditorStore/useTablatureEditorStore';
import { act, cleanup, renderHook } from '@testing-library/react';

const createForwardSelection = () => ({
	section: 0,
	start: 4,
	end: 7,
});

const createBackwardSelection = () => ({
	section: 0,
	start: 6,
	end: 3,
});

describe('useTablatureEditorStore', () => {
	afterEach(() => {
		jest.resetAllMocks();
		cleanup();
		changeInstrument(electricGuitar);
		resetEditor();
	});

	it('[resetTablature] revert the tablature to its default state.', () => {
		const { result } = renderHook(() => useTablatureEditorStore((state) => state));

		const blankTablature = result.current.instrument.BLANK_TABLATURE;

		act(() => {
			resetTablature();
		});

		expect(result.current.tablature).toEqual(blankTablature);
	});

	it("[changeInstrument] reset the entire state to the instrument's initial state.", () => {
		const { result } = renderHook(() => useTablatureEditorStore((state) => state));

		const instrumentInitialState = electricBass.createInitialState();

		act(() => {
			changeInstrument(electricBass);
		});

		for (const key of Object.keys(instrumentInitialState))
			expect(result.current[key as keyof TablatureSlice]).toEqual(
				instrumentInitialState[key as keyof TablatureSlice]
			);
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

	it('[pushBlankColumn] append a blank column to the first section.', () => {
		const { result } = renderHook(() => useTablatureEditorStore((state) => state));

		const currentTablature = result.current.tablature;
		const blankColumn = result.current.instrument.BLANK_COLUMN;

		act(() => {
			pushBlankColumn(0);
		});

		expect(result.current.tablature).toEqual({
			sections: [{ columns: [...currentTablature.sections[0].columns, blankColumn] }],
		});
	});

	it('[insertBlankColumn] insert a blank column in the first section.', () => {
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

	it('[changeTuning] change the state tuning to a new correctly sized array.', () => {
		const { result } = renderHook(() => useTablatureEditorStore((state) => state));

		const newTuning: number[] = [27, 32, 45, 99, 0, 11];

		act(() => {
			changeTuning(newTuning);
		});

		expect(result.current.tuning).toEqual(newTuning);
	});

	it('[changeTuning] throw an error when passed an array of invalid length.', () => {
		const changeTuningInvalidLength = () => changeTuning([27]);

		expect(changeTuningInvalidLength).toThrow('invalid length');
	});

	describe('[setSelectedColumnFrets] set frets of selected columns.', () => {
		const stringNumber = 3;
		const fretNumber = 5;

		it('Left-to-right selection.', () => {
			const { result } = renderHook(() => useTablatureEditorStore((state) => state));

			const { section, start, end } = createForwardSelection();

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

			const { section, start, end } = createBackwardSelection();

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

	it('[clearSelectedColumns] reset selected columns.', () => {
		const { result } = renderHook(() => useTablatureEditorStore((state) => state));

		const { section, start, end } = createForwardSelection();
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

	it('[insertColumnsAtSelection] inserts column after selection end.', () => {
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

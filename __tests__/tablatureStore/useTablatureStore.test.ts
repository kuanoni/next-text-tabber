import { describe, expect, jest } from '@jest/globals';
import { changeInstrument } from '@modules/tablatureEditorStore/tablatureSlice/actions/changeInstrument';
import { changeTuning } from '@modules/tablatureEditorStore/tablatureSlice/actions/changeTuning';
import { insertBlankColumn } from '@modules/tablatureEditorStore/tablatureSlice/actions/insertBlankColumn';
import { pushBlankColumn } from '@modules/tablatureEditorStore/tablatureSlice/actions/pushBlankColumn';
import { pushBlankLine } from '@modules/tablatureEditorStore/tablatureSlice/actions/pushBlankLine';
import { resetTablature } from '@modules/tablatureEditorStore/tablatureSlice/actions/resetTablature';
import { electricBass, electricGuitar } from '@modules/tablatureEditorStore/tablatureSlice/constants';
import { useTablatureEditorStore } from '@modules/tablatureEditorStore/useTablatureEditorStore';
import { act, cleanup, renderHook } from '@testing-library/react';

describe('useTablatureEditorStore', () => {
	afterEach(() => {
		jest.resetAllMocks();
		cleanup();
		changeInstrument(electricGuitar);
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

	it('[pushBlankLine] append a blank line to the tablature.', () => {
		const { result } = renderHook(() => useTablatureEditorStore((state) => state));

		const currentTablature = result.current.tablature;
		const blankLine = result.current.instrument.BLANK_LINE;
		const expected: Tablature = { lines: [...currentTablature.lines, blankLine] };

		act(() => {
			pushBlankLine();
		});

		expect(result.current.tablature).toEqual(expected);
	});

	it('[pushBlankColumn] append a blank column to the first line.', () => {
		const { result } = renderHook(() => useTablatureEditorStore((state) => state));

		const currentTablature = result.current.tablature;
		const blankColumn = result.current.instrument.BLANK_COLUMN;

		act(() => {
			pushBlankColumn(0);
		});

		expect(result.current.tablature).toEqual({
			lines: [{ columns: [...currentTablature.lines[0].columns, blankColumn] }],
		});
	});

	it('[insertBlankColumn] insert a blank column in the first line.', () => {
		const { result } = renderHook(() => useTablatureEditorStore((state) => state));

		const currentTablature = result.current.tablature;
		const blankColumn = result.current.instrument.BLANK_COLUMN;

		act(() => {
			insertBlankColumn(0, 0);
		});

		expect(result.current.tablature).toEqual({
			lines: [{ columns: [blankColumn, ...currentTablature.lines[0].columns] }],
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
});

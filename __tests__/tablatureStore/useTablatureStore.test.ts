import { describe, expect, jest } from '@jest/globals';
import { changeInstrument } from '@modules/tablatureStore/actions/changeInstrument';
import { changeTuning } from '@modules/tablatureStore/actions/changeTuning';
import { insertBlankColumn } from '@modules/tablatureStore/actions/insertBlankColumn';
import { pushBlankColumn } from '@modules/tablatureStore/actions/pushBlankColumn';
import { pushBlankLine } from '@modules/tablatureStore/actions/pushBlankLine';
import { resetTablature } from '@modules/tablatureStore/actions/resetTablature';
import { electricBass, electricGuitar } from '@modules/tablatureStore/constants';
import { useTablatureStore } from '@modules/tablatureStore/useTablatureStore';
import { act, cleanup, renderHook } from '@testing-library/react';

describe('useTablatureStore', () => {
	afterEach(() => {
		jest.resetAllMocks();
		cleanup();
		changeInstrument(electricGuitar);
	});

	it("[changeInstrument] reset the entire state to the instrument's initial state.", () => {
		const { result } = renderHook(() => useTablatureStore((state) => state));

		act(() => {
			changeInstrument(electricBass);
		});

		expect(result.current).toEqual(electricBass.createInitialState());
	});

	it('[resetTablature] revert the tablature to its default state.', () => {
		const { result } = renderHook(() => useTablatureStore((state) => state));

		const blankTablature = result.current.instrument.BLANK_TABLATURE;

		act(() => {
			resetTablature();
		});

		expect(result.current.tablature).toEqual(blankTablature);
	});

	it('[pushBlankLine] append a blank line to the tablature.', () => {
		const { result } = renderHook(() => useTablatureStore((state) => state));

		const currentTablature = result.current.tablature;
		const blankLine = result.current.instrument.BLANK_LINE;
		const expected: Tablature = { lines: [...currentTablature.lines, blankLine] };

		act(() => {
			pushBlankLine();
		});

		expect(result.current.tablature).toEqual(expected);
	});

	it('[pushBlankColumn] append a blank column to the first line.', () => {
		const { result } = renderHook(() => useTablatureStore((state) => state));

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
		const { result } = renderHook(() => useTablatureStore((state) => state));

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
		const { result } = renderHook(() => useTablatureStore((state) => state));

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

import { expect, jest } from '@jest/globals';
import { cleanup, renderHook } from '@testing-library/react';

import { useEditorStore } from '../useEditorStore';
import { validateSelection } from './utils';

beforeEach(() => {
	jest.clearAllMocks();
	cleanup();
});

it('validates selections.', () => {
	const { result } = renderHook(() => useEditorStore((state) => state.tablature));
	const tablature = result.current;

	const validSelections = [
		{ section: 0, start: 0, end: 0 },
		{ section: 0, start: 7, end: 7 },
		{ section: 0, start: 1, end: 3 },
		{ section: 0, start: 2, end: 6 },
		{ section: 0, start: 5, end: 7 },
		{ section: 0, start: 0, end: 1 },
	];

	for (const selection of validSelections) expect(validateSelection(selection, tablature)).toStrictEqual(selection);
});

describe('Throws error for:', () => {
	const { result } = renderHook(() => useEditorStore((state) => state.tablature));
	const tablature = result.current;

	it('blank selection.', () => {
		expect(() =>
			validateSelection({ section: null, start: null, end: null }, tablature)
		).toThrowErrorMatchingInlineSnapshot(`"Selection is blank."`);
	});

	it('out-of-bounds {section}.', () => {
		expect(() => validateSelection({ section: 1, start: 0, end: 0 }, tablature)).toThrowErrorMatchingInlineSnapshot(
			`"Selection "section" index 1 is out of bounds [0-0]."`
		);

		expect(() =>
			validateSelection({ section: -1, start: 0, end: 0 }, tablature)
		).toThrowErrorMatchingInlineSnapshot(`"Selection "section" index -1 is out of bounds [0-0]."`);
	});

	it('out-of-bounds {start}.', () => {
		expect(() =>
			validateSelection({ section: 0, start: -1, end: 0 }, tablature)
		).toThrowErrorMatchingInlineSnapshot(`"Selection "start" index -1 is out of bounds [0-7]."`);

		expect(() =>
			validateSelection({ section: 0, start: 99, end: 0 }, tablature)
		).toThrowErrorMatchingInlineSnapshot(`"Selection "start" index 99 is out of bounds [0-7]."`);
	});

	it('out-of-bounds {end}.', () => {
		expect(() =>
			validateSelection({ section: 0, start: 0, end: -1 }, tablature)
		).toThrowErrorMatchingInlineSnapshot(`"Selection "end" index -1 is out of bounds [0-7]."`);

		expect(() =>
			validateSelection({ section: 0, start: 0, end: 99 }, tablature)
		).toThrowErrorMatchingInlineSnapshot(`"Selection "end" index 99 is out of bounds [0-7]."`);
	});
});

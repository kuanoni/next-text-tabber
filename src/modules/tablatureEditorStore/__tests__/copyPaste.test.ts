import { expect, jest } from '@jest/globals';
import { act, cleanup, renderHook } from '@testing-library/react';

import { resetStore } from '../actions/resetStore';
import { copySelectedColumns } from '../editorSlice/actions/copySelectedColumns';
import { pasteClipboard } from '../editorSlice/actions/pasteClipboard';
import { setClipboard } from '../editorSlice/actions/setClipboard';
import { setColumnSelection } from '../editorSlice/actions/setColumnSelection';
import { setSelectedColumnsFret } from '../tablatureSlice/actions/setSelectedColumnsFret';
import { useTablatureEditorStore } from '../useTablatureEditorStore';
import { validateColumnSelection } from '../utils/validateColumnSelection';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const printSectionColumns = (section: Section) =>
	console.info(section.columns.map((column) => column.cells.map((cell) => cell.fret)));

describe('Copy and paste clipboard actions', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		cleanup();
		act(() => {
			resetStore();
		});
	});

	it('[setClipboard] sets the clipboard.', () => {
		const { result } = renderHook(() => useTablatureEditorStore((state) => state));

		const clipboardColumns = new Array(5).fill(result.current.instrument.createColumnFromText('----53'));

		act(() => {
			setClipboard(clipboardColumns);
		});

		// Verifies that the clipboard matches the array of columns
		expect(result.current.clipboard).toStrictEqual(clipboardColumns);
	});

	it('[copySelectedColumns] copies selected columns.', () => {
		const { result } = renderHook(() => useTablatureEditorStore((state) => state));

		act(() => {
			setColumnSelection(0, 1, 3);
			setSelectedColumnsFret(0, 8);
			copySelectedColumns();
		});

		// Verifies that the clipboard matches the selected columns
		const { section, start, end } = validateColumnSelection(
			result.current.currentSelection,
			result.current.tablature
		);
		const selectedColumns = result.current.tablature.sections[section].columns.slice(start, end + 1);
		expect(selectedColumns).toStrictEqual(result.current.clipboard);
	});

	it('[pasteClipboard] inserts clipboard columns when selection size == 1.', () => {
		const { result } = renderHook(() => useTablatureEditorStore((state) => state));

		const clipboardColumns = new Array(5).fill(result.current.instrument.createColumnFromText('---755'));

		const section = 0;
		const start = 1;
		const end = 1;

		const startingColumnCount = result.current.tablature.sections[section].columns.length;

		act(() => {
			setClipboard(clipboardColumns);
			setColumnSelection(section, start, end);
			pasteClipboard();
		});

		// Verifies that the selection reflects the inserted columns
		const pastedColumnsStart = start + 1;
		const pastedColumnsEnd = pastedColumnsStart + clipboardColumns.length;
		const selectedColumns = result.current.tablature.sections[0].columns.slice(
			pastedColumnsStart,
			pastedColumnsEnd
		);
		expect(selectedColumns).toStrictEqual(result.current.clipboard);

		// Verifies the amount of columns in the section
		expect(result.current.tablature.sections[section].columns.length).toBe(
			startingColumnCount + clipboardColumns.length
		);
	});

	it('[pasteClipboard] replaces selected columns with clipboard columns when selection size > 1.', () => {
		const { result } = renderHook(() => useTablatureEditorStore((state) => state));

		const clipboardColumns = new Array(7).fill(result.current.instrument.createColumnFromText('---755'));

		const section = 0;
		const start = 1;
		const end = 3;

		const startingColumnCount = result.current.tablature.sections[section].columns.length;

		act(() => {
			setClipboard(clipboardColumns);
			setColumnSelection(section, start, end);
			pasteClipboard();
		});

		// Verifies that the selection reflects the replaced columns
		const pastedColumnsStart = start;
		const pastedColumnsEnd = pastedColumnsStart + clipboardColumns.length;
		const selectedColumns = result.current.tablature.sections[0].columns.slice(
			pastedColumnsStart,
			pastedColumnsEnd
		);
		expect(selectedColumns).toStrictEqual(result.current.clipboard);

		// Verifies the amount of columns in the section
		expect(result.current.tablature.sections[section].columns.length).toBe(
			startingColumnCount - (end - start) + clipboardColumns.length - 1
		);
	});
});

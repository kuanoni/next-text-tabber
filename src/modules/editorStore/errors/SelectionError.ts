type MessageArgs = (string | number)[];

export enum SelectionErrorCode {
	SELECTION_BLANK,
	SELECTION_INVALID,
	SELECTION_OUT_OF_BOUNDS,
}

export enum SelectionErrorCulprit {
	ALL,
	SECTION,
	START,
	END,
}

interface SelectionErrorCause {
	code: SelectionErrorCode;
	culprit: SelectionErrorCulprit;
}

export class SelectionError extends Error {
	public cause: SelectionErrorCause;

	constructor(code: SelectionErrorCode, culprit: SelectionErrorCulprit, ...msgArgs: MessageArgs) {
		super();
		this.cause = { code, culprit };

		switch (code) {
			case SelectionErrorCode.SELECTION_BLANK:
				this.handleCodeBlank();
				break;
			case SelectionErrorCode.SELECTION_INVALID:
				this.handleCodeInvalid(culprit);
				break;
			case SelectionErrorCode.SELECTION_OUT_OF_BOUNDS:
				this.handleCodeOutOfBounds(culprit, msgArgs);
				break;
			default:
				this.message = 'Unexpected error with selection.';
		}
	}

	handleCodeBlank() {
		this.message = `Selection is blank.`;
	}

	handleCodeInvalid(culprit: SelectionErrorCulprit) {
		switch (culprit) {
			case SelectionErrorCulprit.SECTION:
				this.message = 'Selection "section" is missing.';
				break;
			case SelectionErrorCulprit.START:
				this.message = 'Selection "start" is missing.';
				break;
			case SelectionErrorCulprit.END:
				this.message = 'Selection "end" is missing.';
				break;
			default:
				this.message = 'Unexpected "invalid" error.';
		}
	}

	handleCodeOutOfBounds(culprit: SelectionErrorCulprit, msgArgs: MessageArgs) {
		switch (culprit) {
			case SelectionErrorCulprit.SECTION:
				this.message = `Selection "section" index ${msgArgs[0]} is out of bounds [0-${msgArgs[1]}].`;
				break;
			case SelectionErrorCulprit.START:
				this.message = `Selection "start" index ${msgArgs[0]} is out of bounds [0-${msgArgs[1]}].`;
				break;
			case SelectionErrorCulprit.END:
				this.message = `Selection "end" index ${msgArgs[0]} is out of bounds [0-${msgArgs[1]}].`;
				break;
			default:
				this.message = `Unexpected "out-of-bounds" error.`;
		}
	}
}

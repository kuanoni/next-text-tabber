import { ChangeEventHandler, useEffect, useState } from 'react';

import { Instrument } from '@common/Instrument';

import { OCTAVE_NOTES } from '../constants';
import styles from './TuningSelector.module.scss';

interface Props {
	defaultTuning: Instrument['defaultTuning'];
}

const TuningSelector = ({ defaultTuning }: Props) => {
	const [tuning, setTuning] = useState(defaultTuning);

	useEffect(() => {
		setTuning(defaultTuning);
	}, [defaultTuning]);

	const onSelectChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
		console.log(e.target.value);
	};

	return (
		<div className={styles['tuning-selector']}>
			{tuning.map((stringTuning, i) => {
				return (
					<select key={i} defaultValue={stringTuning} onChange={onSelectChange}>
						{OCTAVE_NOTES.map((note, i) => (
							<option key={note} value={i}>
								{note}
							</option>
						))}
					</select>
				);
			})}
		</div>
	);
};

export default TuningSelector;
